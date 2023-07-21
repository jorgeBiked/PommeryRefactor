import React from 'react';
import { Text, StyleSheet, View, ViewStyle, TextStyle, ScrollView, Image, Platform, StatusBar } from 'react-native';

import {
  NavigationScreenProp,
  NavigationRoute
} from 'react-navigation';

import { Container } from 'native-base';

import { colors, fontSizes, fonts, globalStyles } from '../../styles';

import MenuComponent from '../common/Menu.Component';
import ButtonComponent from '../common/Button.Component';
import PlacesComponent from './Places.Component';
import { poi1, poi2, poi3, poi4, poi5, poi6, poi7, poi8, poi9 } from './resources/intro';
import ParsedText from 'react-native-parsed-text';
import Images from '../../images/images'

import { introPage } from '../../utilities/Constants';
import { locale } from '../../utilities/Strings';
import CustomStatusBar from '../common/StatusBar';

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>
}

interface Style {
  centerImage: ViewStyle
  bgImage: ViewStyle
  container: ViewStyle
  separator: ViewStyle
  blueFlower: ViewStyle
  greenFlower: ViewStyle
  blueFlower2: ViewStyle
  greenFlower2: ViewStyle
  bluePaint: ViewStyle
  bluePaint2: ViewStyle
  heading: TextStyle
  subHeading: TextStyle
  bold: TextStyle
  subHeadingItalic: TextStyle
  subTitle: TextStyle
  subTitleCapital: TextStyle
  subTitleSmall: TextStyle
  subTitleWhite: TextStyle
  author: TextStyle
  quote: ViewStyle
  footerView: ViewStyle
  quoteImage: ViewStyle
}

const IntroComponent = ({ navigation }) => {
  console.log('+++ IntroComponent navigation', navigation)
  return (
      <View>
          <Text>IntroComponent</Text>
      </View> 
  )
}

// class IntroComponent extends React.Component<Props> {
  
//   constructor(props: Props) {
//     super(props)
//   }

//   _renderBoldText(matchingString: string) {
//     let match = matchingString.replace(/<bold>/g, "")
//     match = match.replace(/<\/bold>/g, "")

//     return match
//   }

//   render() {   

//     return (
//       <Container style={styles.container as ViewStyle}>

//         <ScrollView showsVerticalScrollIndicator={false}>

//           <Image style={styles.blueFlower} resizeMethod="resize" resizeMode="contain" source={Images('blue1')} />
//           <Image style={styles.greenFlower} resizeMethod="resize" resizeMode="contain" source={Images('green1')} />
//           <Image style={styles.blueFlower2} resizeMethod="resize" resizeMode="contain" source={Images('blue2')} />
//           <Image style={styles.greenFlower2} resizeMethod="resize" resizeMode="contain" source={Images('gold')} />
//           <Image style={styles.bluePaint} resizeMethod="resize" resizeMode="contain" source={Images('blue_paint1')} />
//           <Image style={styles.bluePaint2} resizeMethod="resize" resizeMode="contain" source={Images('blue_paint2')} />

//           <Image style={styles.bgImage} source={Images('bg_blue')} resizeMode="cover"/>

//           <Text style={styles.heading}>{locale('title0')}</Text>
//           <Text style={styles.subHeading}>{locale('title1')}</Text>
//           <Text style={styles.subHeadingItalic}>{locale('title2')}</Text>

//           <View style={[styles.separator, {height: 100}]}></View>

//           <Text style={styles.subTitleCapital}>{locale('text0').toUpperCase()}</Text>

//           <Image style={[globalStyles.centeredImage, styles.centerImage]} resizeMethod="resize" resizeMode="contain" source={Images(poi1.thumbnail)} />

//           <Text style={styles.subTitle}>{locale('text1')}</Text>

//           <ButtonComponent navigation={this.props.navigation} title={locale('text2')} screen="ContentDetail" object={poi1}></ButtonComponent>

//           <View style={[styles.separator, {height: 52}]}></View>

//           <View style={styles.quote}>
//             <Image style={styles.quoteImage} resizeMethod="resize" resizeMode="contain" source={Images('quotes')} />
//             <Image style={[globalStyles.centeredImage, styles.centerImage]} resizeMethod="resize" resizeMode="contain" source={Images('intro21')} />
//             <Image style={[styles.quoteImage, {opacity: 0}]} resizeMethod="resize" resizeMode="contain" source={Images('quotes')} />
//           </View>

//           <Text style={styles.subTitle}>{locale('text3')}</Text>
//           <Text style={styles.author}>{locale('text4')}</Text>


//           <View style={[styles.separator, {height: 22}]}></View>
//           <PlacesComponent navigation={this.props.navigation} title={locale('text5')} pois={[poi2, poi3, poi4, poi5]} ></PlacesComponent>
          
//           <View style={[styles.separator, {height: 22}]}></View>

//           <PlacesComponent navigation={this.props.navigation} title={locale('text6').toUpperCase()} pois={[poi6, poi7, poi8, poi9]} ></PlacesComponent>
          
//           <View style={[styles.separator, {height: 52}]}></View>

//           <Text style={styles.subTitleCapital}>{locale('text7').toUpperCase()}</Text>
//           <Image style={globalStyles.centeredImage} resizeMethod="resize" resizeMode="contain" source={Images('intro20')} />
//           <Text style={styles.subTitleSmall}>{locale('text8')}</Text>

//           <View style={[styles.separator, {height: 52}]}></View>
//           <ParsedText style={styles.subTitleSmall}
//             parse={
//               [
//                 {pattern: /<bold>[\w\W]*?<\/bold>/, style: styles.bold, renderText: this._renderBoldText}
//               ]
//             }>
//               {locale('text9')}
//             </ParsedText>

//           <View style={[styles.separator, {height: 130}]}></View>
           
//           <View style={styles.footerView}>
//             <Text style={styles.subTitleWhite}>{locale('text10')}</Text>
//             <Text style={styles.subTitleWhite}>{locale('text11')}</Text>
//           </View>

//           <MenuComponent active={introPage} expanded={true} tutorial={true} navigation={this.props.navigation}></MenuComponent>
         
//         </ScrollView>

//         <CustomStatusBar barStyle={"dark-content"} backgroundColor={'rgba(255, 255, 255, 0.6)'} />
//       </Container>
//     );
//   }

// }

const styles = StyleSheet.create<Style>({
  centerImage: {
    width: 125,
    height: 125
  },
  quote: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  },
  quoteImage: {
    marginLeft: 40,
    marginBottom: 15,
    alignSelf: 'flex-end'
  },
  footerView: {
    marginTop: 20,
    marginBottom: 170
  },
  bgImage: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '100%',
    height: 470
  },
  container: {
      backgroundColor: colors.white,
  },
  blueFlower: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 67,
    height: 69,
  },
  greenFlower: {
    position: 'absolute',
    top: 450,
    left: 0,
    width: 70,
    height: 92,
  },
  blueFlower2: {
    position: 'absolute',
    top: 680,
    right: 0,
    width: 42,
    height: 71,
  },
  greenFlower2: {
    position: 'absolute',
    top: 1000,
    left: 0,
    width: 52,
    height: 83,
  },
  bluePaint: {
    position: 'absolute',
    top: 2900,
    left: 0,
    width: 64,
    height: 125,
  },
  bluePaint2: {
    position: 'absolute',
    top: 2400,
    right: 0,
    width: 39,
    height: 127,
  },
  heading: {
    fontSize: fontSizes.heading,
    textAlign: 'center',
    fontFamily: fonts.pommery_bold,
    color: colors.primaryColor,
    padding: 5,
    marginTop: 120
  },
  subHeading: {
    fontSize: fontSizes.xbig,
    textAlign: 'center',
    fontFamily: fonts.pommery,
    color: colors.primaryColor,
    lineHeight: 42,
    padding: 10
  },
  subHeadingItalic: {
    fontSize: fontSizes.mediumBig,
    textAlign: 'center',
    fontFamily: fonts.pommery_italic,
    color: colors.lightGray,
    paddingTop: 30,
    paddingBottom: 30,
  },
  bold: {
    fontWeight: 'bold'
  },
  subTitle: {
    alignSelf: 'center',
    fontSize: fontSizes.big,
    textAlign: 'center',
    fontFamily: fonts.pommery_bold,
    color: colors.primaryColor,
    lineHeight: Platform.OS === "ios" ? 25 : 30,
    padding: 10,
    paddingTop: 15,
    width: '85%'

  },
  subTitleSmall: {
    fontSize: fontSizes.mediumxBig,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: fonts.pommery,
    color: colors.primaryColor,
    lineHeight: Platform.OS === "ios" ? 27 : 34,
    padding: 10,
    width: '75%'
  },
  subTitleWhite: {
    fontSize: fontSizes.mediumxBig,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: fonts.pommery,
    color: colors.white,
    lineHeight: 30,
    padding: 10,
    width: '75%'
  },
  subTitleCapital: {
    fontSize: fontSizes.medium,
    textAlign: 'center',
    fontFamily: fonts.pommery,
    color: colors.secondaryColor,
    lineHeight: 25,
    padding: 5,
    paddingTop: 20,
    paddingBottom: 20
    
  },
  author: {
    alignSelf: 'center',
    fontSize: 13,
    color: colors.darkGray,
    fontWeight: '300',
    opacity: 0.5
  },
  separator: {
    alignSelf: 'center',
    backgroundColor: colors.secondaryColor,
    width: 1,
    marginTop: 40,
    marginBottom: 40,
    opacity: 0.6
  }
})

export default IntroComponent
