import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle, Image, TouchableOpacity } from 'react-native';

import {
  NavigationScreenProp,
  NavigationRoute,
  withNavigation
} from 'react-navigation';

import { colors, fonts } from '../../styles';
import ButtonComponent from '../common/Button.Component';
import { View } from 'native-base';
import { POI } from '../../model/POI';
import Images from '../../images/images';

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>
  poi: POI
}

interface Style {
    poiView: ViewStyle
    text: TextStyle
    image: ViewStyle
}

class PoiComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        if (this.props.poi) {

            return (
                <TouchableOpacity onPress={this._goTo.bind(this)}>
                    <View style={styles.poiView} >
                        <Image style={styles.image} resizeMode="contain" source={Images(this.props.poi.thumbnail)} />
                        
                        <Text numberOfLines={2} style={styles.text}>{this.props.poi.header.title}</Text>
                        <ButtonComponent navigation={this.props.navigation} screen="ContentDetail" object={this.props.poi}></ButtonComponent>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return null
        }
    }
    
    _goTo() {
        this.props.navigation.navigate("ContentDetail", {object: this.props.poi})
    }
}

const styles = StyleSheet.create<Style>({
    poiView: {
        width: 150,
        marginTop: 0,
        padding: 10,
        flexDirection: 'column',
        alignContent:'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        flex: 1,
        textAlign: 'center',
        color: colors.primaryColor,
        padding: 5,
        paddingBottom: 0,
        paddingTop: 15,
        fontSize: 17,
        fontFamily: fonts.pommery_bold,
        height: 60
    },
    image: {
        width: 120,
        height: 120
    }
})

export default withNavigation(PoiComponent)
