// @ts-nocheck	
import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, View, Animated, Platform, BackHandler, Image, ImageBackground } from 'react-native';
import Slider from '@react-native-community/slider';

import {
  NavigationScreenProp,
  NavigationRoute
} from 'react-navigation';

import {  globalStyles, colors, fontSizes, fonts } from '../../styles';

import { Icon } from 'native-base';
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

class ContentDetail extends React.Component<Props, State> {
    playbackInstance: Audio.Sound | null;
    isSeeking = false;

    constructor(props: Props) {
        super(props)

        const poi: POI = this.props.navigation.getParam('object')

        this.playbackInstance = null;

        this.state = {
            poi: poi,
            scrollY: new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0),
            isPlaying: false,
            playbackInstancePosition: 0,
            playbackInstanceDuration: 0,
            shouldPlay: false,
            isBuffering: false
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)

        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false
        });

        this._loadNewPlaybackInstance()
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
    }

    handleBackButton = () => {
        this._close()
        return true
    }

    render() {
        let i: number = 0

        const scrollY = Animated.add(
            this.state.scrollY,
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

        var AnimatedBackgroundImage = Animated.createAnimatedComponent(ImageBackground)
        var AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

        let playPauseButton;
        let audioPlayer;

        if(this._audioSource() != null) {
            playPauseButton = 
            <AnimatedTouchableOpacity style={[
                    styles.playPauseButton,
                    {transform: [{translateY: playPauseButtonTranslate}]},
                ]}
                onPress={this._playPause.bind(this)}>
                <Image resizeMethod="resize" resizeMode="cover" source={ this.state.isPlaying === false ? Images('play_button') : Images('pause_button') } />
            </AnimatedTouchableOpacity>

            audioPlayer =
            <View style={styles.audioPlayer}>
                <Slider style={styles.playbackSlider}
                    minimumTrackTintColor={colors.yellow}
                    maximumTrackTintColor={colors.anotherGray}
                    thumbTintColor={colors.yellow}
                    value={this._getSeekSliderPosition()}
                    onValueChange={this._onSeekSliderValueChange}
                    onSlidingComplete={this._onSeekSliderSlidingComplete} 
                />
            </View>
        }

        if (this.state.poi) {
            return (
                <View style={styles.fill}>

                    <Animated.ScrollView style={styles.fill} 
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        { useNativeDriver: true },
                    )}
                    contentInset={{
                        top: HEADER_MAX_HEIGHT,
                      }}
                      contentOffset={{
                        y: -HEADER_MAX_HEIGHT,
                      }}
                    >
                        <View style={styles.scrollViewContent}>
                            {this.state.poi.sections.map(section => 
                                
                                <SectionComponent key={i += 1} section={section}></SectionComponent>
                        
                            )}
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
                            source={Images(this.state.poi.header.image)}
                            defaultSource={Images(this.state.poi.header.image)}>

                            {audioPlayer}
                        </AnimatedBackgroundImage>

                        {playPauseButton}
                    </Animated.View>

                    <Animated.View style={[styles.bar, {
                            opacity: textOpacity,
                            transform: [
                            { scale: titleScale },
                            { translateY: titleTranslate }]
                        }]}>
                            <Text style={[globalStyles.heading, styles.title]}>{this.state.poi.header.title}</Text>
                    </Animated.View>

                    <Animated.View style={[styles.barSubtitle, {
                        opacity: subtextOpacity}]}>
                            <Text numberOfLines={2} style={[styles.subTitle]}>{this.state.poi.header.title}</Text>
                    </Animated.View>

                    <TouchableOpacity style={styles.closeButtonView} onPress={this._close.bind(this)}>      
                        <Icon style={[globalStyles.shadow, {color: colors.white, fontSize: 50}]} name="ios-close"/>
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
    
    async _close() {
        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync();
            this.playbackInstance = null;
        }

        this.props.navigation.pop()
    }

    _playPause() {
        if (this.playbackInstance != null) {
            if (this.state.isPlaying) {
              this.playbackInstance.pauseAsync();
            } else {
              this.playbackInstance.playAsync();
            }
        }
    }

    _audioSource() {
        if(this.state.poi.header.audio != null) {
            var audio: AVPlaybackSource;
            if (language === 'fr') {
                audio = AudioFr(this.state.poi.header.audio);
            }
            else if (language === 'nl') {
                audio = AudioNl(this.state.poi.header.audio);
            }
            else {
                audio = AudioEn(this.state.poi.header.audio);
            }

            return audio;
        }
        return null;
    }

    async _loadNewPlaybackInstance() {
        const audio = this._audioSource();
        if(audio != null) {
            try {
                const { sound, status } = await Audio.Sound.createAsync(
                audio,
                { shouldPlay: false },
                this._onPlaybackStatusUpdate
                );

                this.playbackInstance = sound;

                console.log("Your sound is playing!");
            } catch (error) {
                console.log("error while loading sound", error);
            }
        }
    }

    _onPlaybackStatusUpdate = (status: any) => {
        if (status.isLoaded) {
            if (status.didJustFinish === true && this.playbackInstance != null) {
                this.playbackInstance.stopAsync();
            }
            this.setState({
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

    _getSeekSliderPosition() {
        if (this.playbackInstance != null && this.state.playbackInstanceDuration > 0) {
            return ( this.state.playbackInstancePosition / this.state.playbackInstanceDuration );
        }
        return 0;
    }

    _onSeekSliderValueChange = (value: any) => {
        if (this.playbackInstance != null && !this.isSeeking) {
            this.isSeeking = true;
            this.playbackInstance.pauseAsync();
        }
    }
    
    _onSeekSliderSlidingComplete = async (value: any) => {
        if (this.playbackInstance != null) {
            this.isSeeking = false;
            const seekPosition = value * this.state.playbackInstanceDuration;
            this.playbackInstance.playFromPositionAsync(seekPosition);
        }
    }

    _getMMSSFromMillis(millis: number) {
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
    
    _getTimestamp() {
        if (
            this.playbackInstance != null &&
            this.state.playbackInstanceDuration > 0
        ) {
            return `${this._getMMSSFromMillis(this.state.playbackInstancePosition)} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
        }
        return "";
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
