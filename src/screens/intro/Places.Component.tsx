import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle, ScrollView, Image, View } from 'react-native';

import {
  NavigationScreenProp,
  NavigationRoute,
  withNavigation
} from 'react-navigation';

import { Container } from 'native-base';

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

class PlacesComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
     
    if (this.props.pois) {

      return (
      
        <Container style={styles.container as ViewStyle}>
          <Text style={styles.subTitleCapital}>{this.props.title.toUpperCase()}</Text>
  
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {this.props.pois.map(poi => 
            
              <PoiComponent key={poi.header.title} navigation={this.props.navigation} poi={poi}>
                  
              </PoiComponent>
            
            )}

           
          </ScrollView>
        </Container>
      )

    } else {
      return null
    }


    
  }

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

export default withNavigation(PlacesComponent);
