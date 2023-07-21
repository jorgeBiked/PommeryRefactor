import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, StyleProp } from 'react-native';

import {
  NavigationScreenProp,
  NavigationRoute,
  withNavigation
} from 'react-navigation';

import { colors, fonts} from '../../styles';
import { Icon } from 'native-base';

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

class ButtonComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        let title
        if (this.props.title) {
            title = <Text style={styles.text}>{this.props.title.toUpperCase()}</Text>
        }

        return (

            <TouchableOpacity style={[styles.buttonView, this.props.style]} onPress={this._goTo.bind(this)}>
     
                {title}

                <Icon style={[styles.arrow, this.props.arrowStyle]} name="ios-arrow-round-forward"/>
            </TouchableOpacity>
        );
    }

    _goTo() {
        this.props.navigation.navigate(this.props.screen, {object: this.props.object})
    }
    
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
