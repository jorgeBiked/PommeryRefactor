import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle, Image, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';

import {
  NavigationScreenProp,
  NavigationRoute
} from 'react-navigation';

import {View } from 'native-base';

import { colors, fontSizes, fonts } from '../../styles';

import MenuComponent from '../common/Menu.Component';
import ParsedText from 'react-native-parsed-text';
import Video, { Container } from 'react-native-af-video-player'
import { videoUrl, tastingPage } from '../../utilities/Constants';
// import VideoPlayers from 'react-native-video-players';

var Orientation = require('react-native-orientation');

import { bootle1, bootle2, bootle3, bootle4, bootle5 } from './resources/tasting';
import { Bootle } from '../../model/Bootle';
import Images from '../../images/images';
import { locale } from '../../utilities/Strings';
import {LinearGradient} from 'expo-linear-gradient';

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
  console.log('+++ TastingComponent navigation', navigation)
  return (
      <View>
          <Text>TastingComponent</Text>
      </View> 
  )
}

// class TastingComponent extends React.Component<Props, State> {

//   player: Video

//   constructor(props: Props) {
//     super(props)
//     this._goTo = this._goTo.bind(this);
//     this.state = {
//       paused: true,
//       showThumbnail: true
//     }
//   }
  
//   _renderText(matchingString: string) {
//     let html = matchingString.replace(/<bold>/g, "");
//     html = html.replace(/<\/bold>/g, "");
//     return html
//   }

//   render() {

//     return (

//       <View style={styles.container as ViewStyle} >
        
//         <ScrollView showsVerticalScrollIndicator={false}>
//           <View style={styles.bgBlue}>
//             <View style={styles.bgWhite}></View>
//             <Image source={Images('bg_blue')} resizeMode="contain" style={styles.bgImage}/>
//           </View>
//           <Image style={styles.greenFlower} resizeMethod="resize" resizeMode="contain" source={Images('green1')} />

//           <ParsedText style={styles.title}
//           parse={
//             [
//               {pattern: /<bold>[\w\W]*?<\/bold>/, style: styles.bold, renderText: this._renderText}
//             ]
//           }
//           >
//           {locale('tasting1')}
//           </ParsedText>
//           <Text style={styles.subtitle}>{locale('tasting2')}</Text>

//           <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
//             <View style={styles.bootlesView}>
              
//               <TouchableWithoutFeedback onPress={() => this._goTo(bootle1)}>
//                 <View style={styles.bootleView}>
//                   <Image style={styles.bootleImage} resizeMode="contain" source={Images(bootle1.thumbnail)} />
//                   <Text style={styles.bootleTitle}>{bootle1.title}</Text>
//                 </View>
//               </TouchableWithoutFeedback>
//               <TouchableWithoutFeedback onPress={() => this._goTo(bootle2)}>
//                 <View style={styles.bootleView}>
//                   <Image style={styles.bootleImage} resizeMode="contain" source={Images(bootle2.thumbnail)} />
//                   <Text style={styles.bootleTitle}>{bootle2.title}</Text>
//                 </View>
//               </TouchableWithoutFeedback>
//               <TouchableWithoutFeedback onPress={() => this._goTo(bootle3)}>
//                 <View style={styles.bootleView}>
//                   <Image style={styles.bootleImage} resizeMode="contain" source={Images(bootle3.thumbnail)} />
//                   <Text style={styles.bootleTitle}>{bootle3.title}</Text>
//                 </View>
//               </TouchableWithoutFeedback>
//               <TouchableWithoutFeedback onPress={() => this._goTo(bootle4)}>
//                 <View style={styles.bootleView}>
//                   <Image style={styles.bootleImage} resizeMode="contain" source={Images(bootle4.thumbnail)} />
//                   <Text style={styles.bootleTitle}>{bootle4.title}</Text>
//                 </View>
//               </TouchableWithoutFeedback>
//               <TouchableWithoutFeedback onPress={() => this._goTo(bootle5)}>
//                 <View style={styles.bootleView}>
//                   <Image style={styles.bootleImage} resizeMode="contain" source={Images(bootle5.thumbnail)} />
//                   <Text style={styles.bootleTitle}>{bootle5.title}</Text>
//                 </View>
//               </TouchableWithoutFeedback>

//             </View>
//           </ScrollView>

//           <Text style={styles.text}>{locale('tasting3')}</Text>

//           <TouchableWithoutFeedback onPress={this._playVideo} >
          
//             <View style={styles.videoThumbnailView}>
            
//               <Image style={[styles.thumbnail, {display: this.state.showThumbnail ? 'flex' : 'none'}]} resizeMode="contain" source={Images('video_bg')} />
//             </View>

//           </TouchableWithoutFeedback>
          
//         </ScrollView>
        
//         <MenuComponent active={tastingPage} expanded={true} tutorial={false} navigation={this.props.navigation}></MenuComponent>
        
//         <View style={[ {display: this.state.paused ? 'none' : 'flex'}]}>
//             {/* <Video 
//                 ref={(ref: any) => {
//                   this.player = ref
//                 }} 
//                 style={styles.videoView}
//                 url={videoUrl} 
//                 logo={'https://'}
//                 fullScreenOnly
//                 onMorePress={() => this._onMorePress()}
//                 lockPortraitOnFsExit={true}
//                 onFullScreen={(status: boolean) => this._onFullScreen(status)}
//                 onEnd={() => this._onEnd()}
//                 onPlay={(status: boolean) => this._onPlayPause(status)}
//               /> */}
//               {/* <VideoPlayers
//                 source={{
//                   uri: videoUrl,
//                 }}
//                 title={'Video title'}
//                 // paused={paused}
//                 resizeMode={'contain'}
//                 playInBackground={true}
//                 playWhenInactive={true}
//                 controlTimeout={2000}
//               /> */}
//         </View>
        
//       </View>
    
//     )

//   }

//   _goTo(bootle: Bootle) {
//       this.props.navigation.navigate("BootleDetail", {object: bootle})
//   }
//   _playVideo = () => {
//     this.player.play()
//     Orientation.lockToLandscape()
//     this.setState({
//       showThumbnail: false,
//       paused: false
//     })
//   }

//   _onFullScreen(status: boolean) {

//      if (!status) {
//       this._dismissVideo()
//      }
  
//   }

//   _onPlayPause = (status: boolean) => {
//     if (!status) {
//       this._dismissVideo()
//     }
//   }

//   _onEnd = () => {
//     this._dismissVideo()
//   }

//   _onMorePress() {
//     this._dismissVideo()
//   }

//   _dismissVideo() {
//     Orientation?.lockToPortrait()
//     this.setState({
//       showThumbnail: true,
//       paused: true
//     })
//   }
// }

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
  videoView: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    flex: 1,
  },
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
