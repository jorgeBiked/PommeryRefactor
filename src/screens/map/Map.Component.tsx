// @ts-nocheck	
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ViewStyle, TextStyle, BackHandler } from 'react-native';

import {
  NavigationScreenProp,
  NavigationRoute,
} from 'react-navigation';

import { colors, fontSizes, fonts, dimensions } from '../../styles';
import PommeryMapComponent from './PommeryMap.Component';
import MenuComponent from '../common/Menu.Component';
import { mapPage } from '../../utilities/Constants';
import POINavItem from './POINavItem.Component';
import { POI } from '../../model/POI';
import SecurityComponent from './SecurityComponent';
import CustomStatusBar from '../common/StatusBar';

interface State {
  isSecurity: boolean
  selectedPOI?: POI
}

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>
}

interface Style {
  list: ViewStyle
  form: ViewStyle
  container: ViewStyle
  resultsCount: TextStyle
  resultsCountLabel: TextStyle
}

const MapComponent = ({ navigation }) => {

    const [state, setState] = useState({
      selectedPOI: null,
      isSecurity: false
    })

    const handleBackButton = () => {
      _hidePOIToast()
      return true
    }
  
    const _showPOIToast = (poi: POI) => {
      if (state.selectedPOI && poi?.header?.title == state.selectedPOI?.header?.title) {
        setState({ ...state, selectedPOI: null })
      } else {
        setState({ ...state, selectedPOI: poi })
      }
    }
  
    const _hidePOIToast = () => {
      setState({ ...state, selectedPOI: null })
    }
  
    const _toogleSecurity = () => {
      setState({ ...state, isSecurity: !state.isSecurity })
    }

    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton)
      return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
    },[]);
    
    const selected = state.selectedPOI
    const map = (
      <View>
        <View style={{ width: '100%', height: '100%' }}>
          <PommeryMapComponent 
            navigation={navigation} 
            isSecurity={state.isSecurity} 
            onSelectedPOI={_showPOIToast} 
            selectedPOI={state.selectedPOI}
            onBackgroundSelected={_hidePOIToast}
          />
        </View>
      </View>
    )

    return (
      <View style={styles.container as ViewStyle}>
        { map }
        { selected && !state.isSecurity && <POINavItem navigation={navigation} poi={selected} /> }
        { state.isSecurity && <SecurityComponent onClose={_toogleSecurity} /> }
        <MenuComponent active={mapPage} expanded={true} tutorial={false} navigation={navigation} onSecurityPress={_toogleSecurity} />
        <CustomStatusBar barStyle={"dark-content"} backgroundColor={'rgba(255, 255, 255, 0.6)'} />
      </View>
    )
}

const styles = StyleSheet.create<Style>({
  container: {
    backgroundColor: "#fff",
  },
  form: {
    paddingLeft: dimensions.indent,
    paddingRight: dimensions.indent,
  },
  list: {
    backgroundColor: colors.white,
  },
  resultsCount: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.xbig,
    fontWeight: "bold",
    color: colors.brown,
  },
  resultsCountLabel: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.small,
    fontWeight: "bold",
    color: colors.brown,
    alignSelf: "flex-end",
    paddingBottom: 3,
  }
});

export default MapComponent;
