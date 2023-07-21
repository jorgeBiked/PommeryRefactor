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

class CustomStatusBar extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
            <View style={[styles.statusBar, {backgroundColor: this.props?.backgroundColor}]}>
                <StatusBar hidden={false} translucent={true} barStyle={this?.props?.barStyle} backgroundColor={this?.props?.backgroundColor} />
            </View>
        )
    }
    
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
