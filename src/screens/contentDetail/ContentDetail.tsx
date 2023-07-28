// @ts-nocheck	
import React, { useEffect, useState } from 'react';
import { 
    Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, 
    View, Animated, Platform, BackHandler, Image, ImageBackground,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {
  NavigationScreenProp,
  NavigationRoute
} from 'react-navigation';
import { globalStyles, colors, fontSizes, fonts } from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import { POI } from '../../model/POI';
import AudioFr from '../../audio/audio_fr';
import AudioEn from '../../audio/audio_en';
import AudioNl from '../../audio/audio_nl';
import { language } from '../../utilities/Constants';
import SectionComponent from '../common/SectionComponent';
import Images from '../../images/images';
import CustomStatusBar from '../common/StatusBar';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Audio } from 'expo-av';
import { AVPlaybackSource } from 'expo-av/build/AV';

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>,
}
interface State {
    poi: POI
    scrollY: any
    isPlaying: boolean
    playbackInstancePosition: number,
    playbackInstanceDuration: number,
    shouldPlay: boolean,
    isBuffering: boolean
}

interface Style {
    fill: ViewStyle
    header: ViewStyle
    bar: ViewStyle
    barSubtitle: ViewStyle,
    audioPlayer: ViewStyle,
    playPauseButton: ViewStyle,
    playbackSlider: ViewStyle,
    backgroundImage: ViewStyle
    scrollViewContent: ViewStyle
    title: TextStyle
    subTitle: TextStyle
    closeButtonView: ViewStyle
}

const HEADER_MAX_HEIGHT = 490
const HEADER_SCROLL_DISTANCE = Platform.OS === 'ios' ? isIphoneX() ? 370 : 390 : 390

const ContentDetail = ({ route, navigation }) => {
    const { object } = route.params;
    const poi: POI = object;
    const scrollYAux = new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0);
    let playbackInstance = null;
    let isSeeking = false;

    const [state, setState] = useState({
        poi: poi,
        scrollY: new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0),
        isPlaying: false,
        playbackInstancePosition: 0,
        playbackInstanceDuration: 0,
        shouldPlay: false,
        isBuffering: false,
    });

    const close = async () => {
        if (playbackInstance) {
            await playbackInstance.unloadAsync();
            playbackInstance = null;
        }
        // navigation.pop()
    }

    const handleBackButton = () => close()

    const playPause = () => {
        if (playbackInstance) {
            if (state.isPlaying) {
              playbackInstance.pauseAsync();
            } else {
              playbackInstance.playAsync();
            }
        }
    }

    const audioSource = () => {
        let auxAudio = poi?.header?.audio;
        if(auxAudio) {
            let audio: AVPlaybackSource;
            if (language === 'fr') audio = AudioFr(auxAudio);
            else if (language === 'nl') audio = AudioNl(auxAudio);
            else audio = AudioEn(auxAudio);
            return audio;
        }
        return null;
    }

    const _loadNewPlaybackInstance = async () => {
        const audio = audioSource();
        if(audio) {
            try {
                const { sound, status } = await Audio.Sound.createAsync(
                    audio,
                    { shouldPlay: false },
                    _onPlaybackStatusUpdate
                );
                playbackInstance = sound;
                console.log("Your sound is playing!");
            } catch (error) {
                console.log("error while loading sound", error);
            }
        }
    }

    const _onPlaybackStatusUpdate = (status: any) => {
        if (status.isLoaded) {
            if (status.didJustFinish === true && playbackInstance) {
                playbackInstance.stopAsync();
            }
            setState({
                playbackInstancePosition: status.positionMillis,
                playbackInstanceDuration: status.durationMillis,
                shouldPlay: status.shouldPlay,
                isPlaying: status.isPlaying,
                isBuffering: status.isBuffering,
            });
        } else {
          if (status.error) {
            console.log(`FATAL PLAYER ERROR: ${status.error}`);
          }
        }
    }

    const _getSeekSliderPosition = () => {
        if (playbackInstance && state.playbackInstanceDuration > 0) {
            return ( state.playbackInstancePosition / state.playbackInstanceDuration );
        }
        return 0;
    }

    const _onSeekSliderValueChange = (value: any) => {
        if (playbackInstance && !isSeeking) {
            isSeeking = true;
            playbackInstance.pauseAsync();
        }
    }
    
    const _onSeekSliderSlidingComplete = async (value: any) => {
        if (playbackInstance) {
            isSeeking = false;
            const seekPosition = value * state.playbackInstanceDuration;
            playbackInstance.playFromPositionAsync(seekPosition);
        }
    }

    const _getMMSSFromMillis = (millis: number) => {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);
    
        const padWithZero = (number: number) => {
          const string = number.toString();
          if (number < 10) {
            return "0" + string;
          }
          return string;
        };
        return padWithZero(minutes) + ":" + padWithZero(seconds);
    }

    const scrollY = Animated.add(
        scrollYAux,
        Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    )

    const headerTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -HEADER_SCROLL_DISTANCE],
        extrapolate: 'clamp',
    })

    const imageOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0.3],
        extrapolate: 'clamp',
    })
    const textOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2 + 140, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
    })
    const subtextOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2 + 140, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
    })
    const imageTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 50],
        extrapolate: 'clamp',
    })

    const playPauseButtonTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 45],
        extrapolate: 'clamp',
    })
    
    const titleScale = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0.5],
        extrapolate: 'clamp',
    })
    
    const titleTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 0, -180],
        extrapolate: 'clamp',
    })

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton)
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false
        });
        _loadNewPlaybackInstance()
        return () => BackHandler.addEventListener('hardwareBackPress', handleBackButton)
    },[]);

    const AnimatedBackgroundImage = Animated.createAnimatedComponent(ImageBackground)
    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
    let playPauseButton = null;
    let audioPlayer = null;

    if (audioSource()) {
        playPauseButton = 
        <AnimatedTouchableOpacity style={[ styles.playPauseButton, 
            {transform: [{translateY: playPauseButtonTranslate}]}]} onPress={ playPause }>
            <Image resizeMethod="resize" resizeMode="cover" source={ state.isPlaying === false ? Images('play_button') : Images('pause_button') } />
        </AnimatedTouchableOpacity>

        audioPlayer =
        <View style={styles.audioPlayer}>
            <Slider style={styles.playbackSlider}
                minimumTrackTintColor={colors.yellow}
                maximumTrackTintColor={colors.anotherGray}
                thumbTintColor={colors.yellow}
                value={_getSeekSliderPosition()}
                onValueChange={_onSeekSliderValueChange}
                onSlidingComplete={_onSeekSliderSlidingComplete} 
            />
        </View>
    }

    if (poi) {
        return (
            <View style={styles.fill}>

                <Animated.ScrollView style={styles.fill} 
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([{ 
                        nativeEvent: { contentOffset: { y: scrollYAux } } }], { useNativeDriver: true })}
                    contentInset={{ top: HEADER_MAX_HEIGHT }}
                    contentOffset={{ y: -HEADER_MAX_HEIGHT }}
                >
                    <View style={styles.scrollViewContent}>
                    { poi?.sections?.map(section => <SectionComponent key={section?.thumbnail} section={section} /> )}
                    </View>
                </Animated.ScrollView>

                <Animated.View
                    style={[
                        styles.header,
                        { transform: [{ translateY: headerTranslate }] },
                    ]}>
                        <AnimatedBackgroundImage
                            resizeMode="cover"
                            style={[
                                styles.backgroundImage,
                                {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
                            ]}
                            source={Images(poi.header.image)}
                            defaultSource={Images(poi.header.image)}>
                            { audioPlayer }
                        </AnimatedBackgroundImage>
                        { playPauseButton }
                </Animated.View>

                <Animated.View style={[styles.bar, { opacity: textOpacity, 
                    transform: [{ scale: titleScale }, { translateY: titleTranslate }]}]}>
                        <Text style={[globalStyles.heading, styles.title]}>{poi.header.title}</Text>
                </Animated.View>

                <Animated.View style={[styles.barSubtitle, {
                    opacity: subtextOpacity}]}>
                        <Text numberOfLines={2} style={[styles.subTitle]}>{poi.header.title}</Text>
                </Animated.View>

                <TouchableOpacity style={styles.closeButtonView} onPress={close}>      
                    {/* <Icon style={[globalStyles.shadow, {color: colors.white, fontSize: 50}]} name="ios-close"/> */}
                    <AntDesign name="close" size={24} color={colors.white} />
                </TouchableOpacity>
              
                <CustomStatusBar barStyle={"light-content"} backgroundColor={'rgba(0, 0, 0, 0.6)'}/>

            </View>
        )   
    } else {
        return (
            <Text style={[globalStyles.title, styles.title]}>No info</Text>
        )
    }
}

const styles = StyleSheet.create<Style>({
    fill: {
        backgroundColor: colors.white,
        flex: 1
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.black,
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    bar: {
        backgroundColor: 'transparent',
        marginTop: 40,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    barSubtitle: {
        backgroundColor: 'transparent',
        height: Platform.OS === 'ios' ? 70 : 70,
        position: 'absolute',
        top: Platform.OS === 'ios' ? isIphoneX() ? 42 : 28 : 23,
        left: 40,
        right: 40,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    audioPlayer: {
        backgroundColor: colors.darkerGray,
        top: 0,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'column'
    },
    playPauseButton: {
        position: 'absolute',
        alignSelf: 'flex-end',
        left: 20,
        bottom: 60,
        width: 50,
        height: 50
    },
    playbackSlider: {
        flexGrow: 1,
        height: 40
    },
    backgroundImage: {
        width: '100%',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_MAX_HEIGHT,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    scrollViewContent: {
        backgroundColor: colors.white,
        paddingTop: Platform.OS === 'ios' ? 30 : HEADER_MAX_HEIGHT + 30,
        paddingBottom: 30,
        minHeight: 400
    },
    title: {
        position: 'absolute',
        textAlign: 'center',
        top: 140
    },
    subTitle: {
        textAlign: 'center',
        alignSelf: 'center',
        textAlignVertical: 'center',
        justifyContent: 'center',
        fontFamily: fonts.pommery,
        color: colors.white,
        lineHeight: Platform.OS === 'ios' ? 25: 30,
        fontSize: fontSizes.mediumBig,
    },
    closeButtonView: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: -15,
        top: Platform.OS === 'ios' ? isIphoneX() ? 48 : 35 : 35,
        width: 50,
        height: 50
    }
});

export default ContentDetail
