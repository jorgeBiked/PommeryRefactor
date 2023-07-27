// @ts-nocheck
import React from 'react';
import { 
  Text, StyleSheet, ViewStyle, TextStyle, ScrollView, View 
} from 'react-native';

import {
  NavigationScreenProp,
  NavigationRoute,
} from 'react-navigation';

import { colors, fontSizes, fonts } from '../../styles';
import PoiComponent from './Poi.Component';
import { POI } from '../../model/POI';

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>
  title: string
  pois: POI[]
}
interface Style {
  container: ViewStyle
  subTitleCapital: TextStyle
}

const PlacesComponent = ({ navigation, title, pois }) => {
    if (!pois) return null 
    return (
      <View style={styles.container as ViewStyle}>
        <Text style={styles.subTitleCapital}>{title?.toUpperCase()}</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          { pois.map( poi => <PoiComponent key={poi?.header?.title} navigation={navigation} poi={poi} /> ) }
        </ScrollView>
      </View>
    )
}

const styles = StyleSheet.create<Style>({
    container: {
      height: 'auto'
    },
    subTitleCapital: {
        fontSize: fontSizes.medium,
        textAlign: 'center',
        fontFamily: fonts.pommery,
        color: colors.secondaryColor,
        lineHeight: 25,
        marginRight: 20,
        marginLeft: 20,
        padding: 5,
        paddingTop: 20,
        paddingBottom: 15

    }
});

export default PlacesComponent;

