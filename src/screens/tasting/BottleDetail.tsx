// @ts-nocheck	
import React, { useEffect } from 'react';
import { 
    Text, StyleSheet, ViewStyle, TextStyle, Image, ScrollView, TouchableOpacity, View, BackHandler, 
} from 'react-native';

import { globalStyles, colors, fontSizes, fonts } from '../../styles';
import SectionComponent from '../common/SectionComponent';
import { Bootle } from '../../model/Bootle';
import SliderComponent from './Slider.Component';
import Images from '../../images/images';
import ParsedText from 'react-native-parsed-text';
import { AntDesign } from '@expo/vector-icons';
const pattern = /<bold>[\w\W]*?<\/bold>/;

interface Style {
    bg: ViewStyle
    bgWhite: ViewStyle
    bgImage: ViewStyle
    bootleView: ViewStyle
    title: TextStyle
    selector: ViewStyle
    button: TextStyle
    active: TextStyle
    closeButtonView: ViewStyle
    bold: TextStyle
}

const BottleDetail = ({ navigation, route }) => {
    const { object } = route.params;
    const bootle: Bootle = object;

    const close = () => navigation.goBack();
    const handleBackButton = () => close();
    const renderBoldText = (matchingString: string) => {
        let match = matchingString.replace(/<bold>/g, "")
        match = match.replace(/<\/bold>/g, "")
        return match
    }
    useEffect(() => {
        // Detects hardware button presses for back navigation
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    },[]);

    if (bootle) {
        return (
            <View style={styles.bg}>
                <View style={styles.bgWhite}></View>
                <Image source={Images('bg_blue')} resizeMode="contain" style={styles.bgImage}/>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.bootleView}>
                    <SliderComponent images={bootle.images}></SliderComponent>
                    <Text style={[globalStyles.title, styles.title]}>{bootle.title}</Text>
                    <ParsedText 
                        style={[globalStyles.paragraph]}
                        parse={[{pattern, style: styles.bold, renderText: renderBoldText}]}
                    >
                        {bootle.text}
                    </ParsedText>
                    { bootle?.sections?.map(section => <SectionComponent key={section.thumbnail} section={section} /> )}
                    <TouchableOpacity style={styles.closeButtonView} onPress={close}>
                        <AntDesign name="close" size={30} color={colors.secondaryColor} />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    } else {
        return <Text style={[globalStyles.title, styles.title]}>No info</Text>
    }
}

const styles = StyleSheet.create<Style>({
    bg: {
        flex: 1,
        backgroundColor: colors.primaryBg,
        paddingTop: 60,
    },
    bgWhite: {
        backgroundColor: colors.white,
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        height: 500
    },
    bgImage: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        height: 500
    },
    bootleView: {
        backgroundColor: colors.white,
        margin: 15,
        marginTop: 0,
        marginBottom: 0,
        paddingBottom: 40
    },
    title: {
        marginTop: 40,
        fontSize: fontSizes.big
    },
    selector: {
        margin: 20,
        marginBottom: 40,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        alignContent: 'center',
        flex: 1,
        height: 38,
        fontFamily: fonts.primary,
        color: colors.gray,
        fontSize: fontSizes.small,
        borderRadius:19,
        borderColor: colors.secondaryColor,
        borderWidth: 0.5,
        padding: 10
    },
    active: {
        fontFamily: fonts.primary_bold,
        color: 'black'
    },
    closeButtonView: {
        position: 'absolute',
        right: 0,
        top: 10,
        width: 50,
        height: 50,
    },
    bold: {
        fontFamily: fonts.primary_bold
    }
});

export default BottleDetail
