import React from 'react';
import { StyleSheet, View, ViewStyle, TextStyle, Text, Alert, TouchableOpacity, BackHandler } from 'react-native';

import {
  NavigationScreenProp,
  NavigationRoute,
  withNavigationFocus
} from 'react-navigation';
import { Container, Content } from 'native-base';

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

// const MapComponent = ({ navigation }) => {
//     console.log('+++ MapComponent navigation', navigation)
//     return (
//         <View>
//             <Text>MapComponent</Text>
//         </View> 
//     )
// }
class MapComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      selectedPOI: undefined,
      isSecurity: false
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
  }

  handleBackButton = () => {
    this._hidePOIToast()
    return true
  }

  _showPOIToast(poi: POI) {
    if (this.state.selectedPOI != undefined && poi.header.title == this.state.selectedPOI.header.title) {
      this.setState({selectedPOI: undefined})
    } else {
      this.setState({selectedPOI: poi})
    }
    
  }

  _hidePOIToast() {
    this.setState({selectedPOI: undefined})
  }

  _toogleSecurity() {
    this.setState({
      isSecurity: !this.state.isSecurity
    })
  }

  render() {

    const selected = this.state.selectedPOI
    let map
    if (this.props.isFocused) {
      map = (
        // <Container scrollEnabled={false}>
        <View>
          <View style={{ width: '100%', height: '100%' }}>
            <PommeryMapComponent 
              navigation={this.props.navigation} 
              isSecurity={this.state.isSecurity} 
              onSelectedPOI={this._showPOIToast.bind(this)} 
              selectedPOI={this.state.selectedPOI}
              onBackgroundSelected={this._hidePOIToast.bind(this)}
            />
          </View>
      </View>
      )
    }

    return (
      <View style={styles.container as ViewStyle}>
        { map }
        {selected && !this.state.isSecurity &&
          <POINavItem navigation={this.props.navigation} poi={selected}></POINavItem>
        }

        {this.state.isSecurity &&
          <SecurityComponent onClose={() => this._toogleSecurity()}></SecurityComponent>
        }
        <MenuComponent active={mapPage} expanded={true} tutorial={false} navigation={this.props.navigation} onSecurityPress={() => this._toogleSecurity()}></MenuComponent>

        <CustomStatusBar barStyle={"dark-content"} backgroundColor={'rgba(255, 255, 255, 0.6)'} />
      </View>
    )
  }
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

const mapStateToProps = (state: any, { }) => {
  return {
  };
}

export default withNavigationFocus(MapComponent)
