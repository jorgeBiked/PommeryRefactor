import React from 'react';
import { StyleSheet, ViewStyle, StatusBar, Platform, StatusBarStyle, Text } from 'react-native';
import { View } from 'native-base';
import { isIphoneX } from 'react-native-iphone-x-helper'

interface Props {
    barStyle: StatusBarStyle
    backgroundColor: string
}

interface Style {
    statusBar: ViewStyle
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? isIphoneX() ? 44 : 20 : 0

const CustomStatusBar = ({ backgroundColor, barStyle }) => {
    return (
        <View style={[styles.statusBar, { backgroundColor }]}>
            <StatusBar hidden={false} translucent={true} barStyle={barStyle} backgroundColor={backgroundColor} />
        </View>
    )
}

const styles = StyleSheet.create<Style>({
    statusBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: STATUSBAR_HEIGHT, 
        opacity: 0.8
    }
})

export default CustomStatusBar
