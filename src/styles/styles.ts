import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import fontSizes from './fontSizes';
import colors from './colors';
import fonts from './fonts';

const styles = StyleSheet.create({
  heading: {
    alignSelf: 'center',
    fontSize: fontSizes.heading,
    fontFamily: fonts.pommery_bold,
    color: colors.white,
    padding: 0,
    margin: 20
  },
  
  title: {
    fontSize: fontSizes.mediumxBig,
    textAlign: 'center',
    fontFamily: fonts.pommery_bold,
    lineHeight: Platform.OS === 'ios'? 26: 31,
    color: colors.primaryColor,
    padding: 5
  },
  centeredImage: {
    alignSelf: 'center',
    margin: 15,
  },
  shadow: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  index: {
    fontFamily: fonts.primary_bold,
    fontSize: 16,
    color: colors.gray,
    lineHeight: 25,
    marginLeft: 10
  },
  paragraph: {
    fontFamily: fonts.primary,
    fontSize: 16,
    color: colors.gray,
    margin: 20,
    marginRight: 40,
    marginLeft: 40,
    lineHeight: 25
  },
  bold: {
      fontWeight: 'bold'
  },
  footerText: {
    fontFamily: fonts.primary_italic,
    fontSize: 16,
    color: colors.gray,
    margin: 20,
    marginRight: 40,
    marginLeft: 40,
    lineHeight: 25
  },
  quote: {
    fontFamily: fonts.pommery_italic,
    fontSize: 19,
    color: colors.primaryColor,
    lineHeight: 25,
    margin: 20,
    marginRight: 40,
    marginLeft: 40,
  },
  quote_author: {
    fontFamily: fonts.primary,
    fontWeight: '300',
    fontSize: 13,
    color: colors.gray,
    opacity: 0.5,
    margin: 40,
    marginTop: 0
  }
});

export default styles;
