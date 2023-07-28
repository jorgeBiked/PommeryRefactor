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
const PoiComponent = ({ navigation, poi }) => {
    const _goTo = () => navigation.navigate("ContentDetail", {object: poi})
    if (!poi) return null;
    return (
        <TouchableOpacity onPress={_goTo}>
            <View style={styles.poiView} >
                <Image style={styles.image} resizeMode="contain" source={Images(poi.thumbnail)} />
                <Text numberOfLines={2} style={styles.text}>{poi?.header?.title}</Text>
                <ButtonComponent navigation={navigation} screen="ContentDetail" object={poi} />
            </View>
        </TouchableOpacity>
    )
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
        fontFamily: fonts?.pommery_bold,
        height: 60
    },
    image: {
        width: 120,
        height: 120
    }
})

export default withNavigation(PoiComponent)
