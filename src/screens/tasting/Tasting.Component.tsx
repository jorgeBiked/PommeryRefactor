// @ts-nocheck	
import React, { useRef, useState, useEffect } from 'react';
import { 
  Text, StyleSheet, ViewStyle, TextStyle, Image, TouchableWithoutFeedback, 
  View, ScrollView, Dimensions, TouchableOpacity,
} from 'react-native';

import {
  NavigationScreenProp,
  NavigationRoute
} from 'react-navigation';

import { colors, fontSizes, fonts } from '../../styles';
import MenuComponent from '../common/Menu.Component';
import ParsedText from 'react-native-parsed-text';
import { tastingPage } from '../../utilities/Constants';
import { Video, ResizeMode } from 'expo-av';
import { bootle1, bootle2, bootle3, bootle4, bootle5 } from './resources/tasting';
import { Bootle } from '../../model/Bootle';
import Images from '../../images/images';
import { locale } from '../../utilities/Strings';
import * as ScreenOrientation from 'expo-screen-orientation';
const videoURL = '../../videos/tasting.mp4';

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>
}

interface State {
  paused: boolean
  showThumbnail: boolean
}

interface Style {
  container: ViewStyle
  bgWhite: ViewStyle
  bgBlue: ViewStyle
  bgImage: ViewStyle
  thumbnail: ViewStyle
  videoThumbnailView: ViewStyle
  videoView: ViewStyle
  greenFlower: ViewStyle
  title: TextStyle
  bold: TextStyle
  subtitle: TextStyle
  text: TextStyle
  bootleImage: ViewStyle
  bootleView: ViewStyle
  bootlesView: ViewStyle
  bootleTitle: TextStyle
}

const TastingComponent = ({ navigation }) => {

  const videoRef = useRef(null);
  const [fullVideo, setFullVideo] = useState(false);
  const renderText = (matchingString: string) => {
    let html = matchingString.replace(/<bold>/g, "");
    html = html.replace(/<\/bold>/g, "");
    return html
  }
  const goTo = (bootle: Bootle) => {
    navigation.navigate("BottleDetail", { object: bootle })
  }

  const playVideo = async () => {
    setFullVideo(true);
  }

  useEffect(() => {
    fullVideo && videoRef?.current?.presentFullscreenPlayer();
  },[fullVideo]);

  const setOrientation = () => {
    if (Dimensions.get('window').height > Dimensions.get('window').width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      videoRef?.current?.pauseAsync();
      setFullVideo(false);
    }
  }
    
  return (
    <View style={styles.container as ViewStyle} >
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bgBlue}>
          <View style={styles.bgWhite}></View>
          <Image source={Images('bg_blue')} resizeMode="contain" style={styles.bgImage}/>
        </View>
        <Image style={styles.greenFlower} resizeMethod="resize" resizeMode="contain" source={Images('green1')} />

        <ParsedText style={styles.title}
        parse={
          [
            {pattern: /<bold>[\w\W]*?<\/bold>/, style: styles.bold, renderText: renderText}
          ]
        }
        >
        { locale('tasting1') }
        </ParsedText>
        <Text style={styles.subtitle}>{locale('tasting2')}</Text>

        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <View style={styles.bootlesView}>
            
            <TouchableWithoutFeedback onPress={() => goTo(bootle1)}>
              <View style={styles.bootleView}>
                <Image style={styles.bootleImage} resizeMode="contain" source={Images(bootle1.thumbnail)} />
                <Text style={styles.bootleTitle}>{bootle1.title}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => goTo(bootle2)}>
              <View style={styles.bootleView}>
                <Image style={styles.bootleImage} resizeMode="contain" source={Images(bootle2.thumbnail)} />
                <Text style={styles.bootleTitle}>{bootle2.title}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => goTo(bootle3)}>
              <View style={styles.bootleView}>
                <Image style={styles.bootleImage} resizeMode="contain" source={Images(bootle3.thumbnail)} />
                <Text style={styles.bootleTitle}>{bootle3.title}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => goTo(bootle4)}>
              <View style={styles.bootleView}>
                <Image style={styles.bootleImage} resizeMode="contain" source={Images(bootle4.thumbnail)} />
                <Text style={styles.bootleTitle}>{bootle4.title}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => goTo(bootle5)}>
              <View style={styles.bootleView}>
                <Image style={styles.bootleImage} resizeMode="contain" source={Images(bootle5.thumbnail)} />
                <Text style={styles.bootleTitle}>{bootle5.title}</Text>
              </View>
            </TouchableWithoutFeedback>

          </View>
        </ScrollView>

        <Text style={styles.text}>{locale('tasting3')}</Text>

        {/* Image that represents the video before starting */}
        <TouchableOpacity onPress={playVideo}>
          <View style={styles.videoThumbnailView}>
            <Image style={[styles.thumbnail, { display: 'flex' }]} resizeMode="contain" source={Images('video_bg')} />
          </View>
        </TouchableOpacity>
        
      </ScrollView>
      
      <MenuComponent active={tastingPage} expanded={true} tutorial={false} navigation={navigation} />
            
      <Video
        ref={videoRef}
        source={require(videoURL)}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        shouldPlay
        style={ !fullVideo ? { width: 0, height: 0 } : {} }
        onFullscreenUpdate={setOrientation}
      />

    </View>
  )
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBg
  },
  bgBlue: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    height: 780
  },
  bgWhite: {
    backgroundColor: colors.white,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    height: 350
  },
  
  bgImage: {
    position: 'absolute',
    right: 0,
    top: 280,
    width: '100%',
    height: 500
  },
  videoThumbnailView: {
    backgroundColor: 'black',
    alignSelf: 'center',
    aspectRatio: 1.8,
    width: '80%',
    marginBottom: 100
  },
  thumbnail: {
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  videoView: {},
  greenFlower: {
    position: 'absolute',
    top: 0,
    left: -12,
    width: 80,
    height: 80,
  },
  title: {
    fontSize: fontSizes.xxbig,
    textAlign: 'center',
    fontFamily: fonts.pommery,
    color: colors.primaryColor,
    padding: 5,
    marginTop: 50,
    lineHeight: 46
  },
  bold: {
    fontFamily: fonts.pommery_bold
  },
  subtitle: {
    fontSize: fontSizes.mediumBig,
    textAlign: 'center',
    fontFamily: fonts.pommery,
    color: colors.secondaryColor,
    paddingTop: 20,
    paddingBottom: 5,
  },
  bootlesView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bootleView: {
    backgroundColor: colors.white,
    padding: 0,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    margin: 10,
    marginTop: 20,
    width: 160,
    minHeight: 430,
    justifyContent: 'flex-end',
  },
  bootleImage: {
    alignSelf: 'center',
    marginBottom: 20
  },
  bootleTitle: {
    fontFamily: fonts.pommery_bold,
    fontSize: 18,
    color: colors.primaryColor,
    lineHeight: 25,
    textAlign: 'center',
    minHeight: 80,
  },
  text: {
    fontSize: fontSizes.mediumBig,
    textAlign: 'center',
    fontFamily: fonts.pommery,
    color: colors.white,
    lineHeight: 25,
    padding: 5,
    margin: 40,
    marginBottom: 30
  }
})

export default TastingComponent
