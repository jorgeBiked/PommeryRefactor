// @ts-nocheck	
import React, { useEffect } from 'react';
import { 
    Text, StyleSheet, View, ViewStyle, TextStyle, ScrollView,
    TouchableOpacity, BackHandler, Image,
} from 'react-native';

import {
  NavigationScreenProp,
  NavigationRoute
} from 'react-navigation';

import { colors, fontSizes, fonts } from '../../styles';
import Images from '../../images/images'
import { locale } from '../../utilities/Strings';
import CustomStatusBar from '../common/StatusBar';

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>
}

interface Style {
    splash: ViewStyle
    scrollContent: ViewStyle
    container: ViewStyle
    heading: TextStyle
    paragraph: TextStyle
    li: TextStyle
    liText: TextStyle
    bullet: TextStyle
    bulletText: TextStyle
    buttonView: ViewStyle
    buttonText: TextStyle
    bold: TextStyle
}

const BulletView = ({ text }) => {
    return (
        <View style={styles.li}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={styles.liText}>{locale(text)}</Text>
        </View>
    )
}

const TitleText =  ({ text }) => {
    return <Text style={[styles.paragraph, styles.bold]}>{text}</Text>
}

const TermsComponent = ({ navigation }) => {

    const indexList1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const indexList2 = [10, 11, 12];
    const handleBackButton = () => BackHandler.exitApp()
    const _acceptConditions = () => navigation.navigate('IntroComponent')

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton)
        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
    },[]);

    return (
        <View style={styles.container as ViewStyle}>
            <Text>{'Teeeerms91'}</Text>
            <Image style={styles.splash} resizeMethod="resize" resizeMode="contain" source={Images('splashscreen')} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.heading}>{locale('terms0')}</Text>
                <View style={styles.scrollContent}>
                    <TitleText text={locale('terms1')} />
                    { indexList1.map(item => <BulletView key={item} text={`terms_bullets${item}`} />) }
                    <TitleText text={locale('terms2')} />
                    { indexList2.map(item => <BulletView key={item} text={`terms_bullets${item}`} />) }
                    <TouchableOpacity style={[styles.buttonView]} onPress={_acceptConditions}>
                        <Text style={[styles.buttonText]}>{locale('terms_accept').toUpperCase()}</Text>
                    </TouchableOpacity>
                </View>   
            </ScrollView>
            <CustomStatusBar barStyle={"light-content"} backgroundColor={'rgba(0, 0, 0, 0.6)'}/>
        </View>
    )

}

const styles = StyleSheet.create<Style>({
    splash: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        opacity: 0.3
    },
    container: {
        backgroundColor: colors.primaryBg,
    },
    scrollContent: {
        backgroundColor: colors.white,
        margin: 20,
        marginBottom: 25
    },

    heading: {
        fontSize: fontSizes.mediumxBig,
        textAlign: 'center',
        fontFamily: fonts.pommery_bold,
        color: colors.white,
        padding: 5,
        marginTop: 45
    },
    paragraph: {
        padding: 30,
        paddingBottom: 10,
        fontFamily: fonts.primary_bold,
        color: colors.gray,
        fontSize: fontSizes.medium
    },
    li: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row'
    },
    liText: {
        fontFamily: fonts.primary,
        color: colors.gray,
        fontSize: fontSizes.medium
    },
    bullet: {
        color: colors.secondaryColor,
        fontSize: fontSizes.medium,
        marginRight: 7
    },
    buttonView: {
        alignSelf: 'center',
        margin:10,
        marginBottom: 30,
        marginTop: 30,
        padding: 10,
        height: 54,
        backgroundColor: colors.white,
        borderColor: colors.secondaryColor,
        borderWidth: 1.5,
        flex: 0,
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
    },
    buttonText: {
        flex: 0,
        paddingLeft: 5,
        paddingRight: 15,
        fontFamily: fonts.primary,
        fontSize: 14,
        color: colors.secondaryColor
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
        lineHeight: 25,
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
        lineHeight: 28,
        padding: 10,
        width: '75%'
    },
    subTitleWhite: {
        fontSize: fontSizes.mediumxBig,
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: fonts.pommery,
        color: colors.white,
        lineHeight: 33,
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

export default TermsComponent
