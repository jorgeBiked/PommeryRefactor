import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, StyleProp } from 'react-native';

import {
  NavigationScreenProp,
  NavigationRoute,
  withNavigation
} from 'react-navigation';

import { colors, fonts} from '../../styles';
import { AntDesign } from '@expo/vector-icons';
interface Props {
  navigation: NavigationScreenProp<NavigationRoute>
  title?: string
  screen: string
  object?: any,
  style?: StyleProp<ViewStyle>,
  arrowStyle?: StyleProp<TextStyle>
}

interface Style {
    buttonView: ViewStyle
    text: TextStyle
    arrow: TextStyle
}

const ButtonComponent = ({ navigation, title, screen, object, style, arrowStyle }:Props) => {
    let newTitle = null;
    const _goTo = () => navigation.navigate(screen, { object })
    if (title) newTitle = <Text style={styles.text}>{title.toUpperCase()}</Text>
    return (
        <TouchableOpacity style={[styles.buttonView, style]} onPress={_goTo}>
            { newTitle }
            <AntDesign name="arrowright" size={24} color={colors.secondaryColor} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create<Style>({
    buttonView: {
        alignSelf: 'center',
        margin:10,
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
    text: {
        flex: 0,
        paddingLeft: 5,
        paddingRight: 15,
        fontFamily: fonts.primary,
        fontSize: 14,
        color: colors.secondaryColor
    },
    arrow: {
        color: colors.secondaryColor,
        flex: 0,
        fontSize: 46,
        height: 46,
        paddingLeft: 5,
        paddingRight: 5,
    }
});

export default withNavigation(ButtonComponent);
