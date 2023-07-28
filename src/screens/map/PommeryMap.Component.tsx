// @ts-nocheck	
import React from 'react'
import { View } from 'react-native';

import {
  NavigationScreenProp,
  NavigationRoute
} from 'react-navigation';

import { PointsOfInterestLayer } from './layers'
import { MapConfig } from './config';

import { POI } from '../../model/POI';
import { Image } from 'react-native-svg';
import Images from '../../images/images';
import SvgPanZoom from '../../lib/svg-pan-zoom';

interface Props {
    navigation: NavigationScreenProp<NavigationRoute>
    isSecurity: boolean
    onSelectedPOI: (poi: POI) => void
    onBackgroundSelected?: () => void
    selectedPOI?: POI
}

interface State {
    isSecurity: boolean
    selectedPOI?: POI
}

class PommeryMapComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            isSecurity: this.props.isSecurity,
            selectedPOI: this.props.selectedPOI
        }
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any){
        return {
          isSecurity: nextProps.isSecurity,
          selectedPOI: nextProps.selectedPOI
        }
    }

    render() {

        var pois
        var security
        if (!this.state.isSecurity) {
          pois = <PointsOfInterestLayer selectedPOI={this.state.selectedPOI} onClick={(poi: POI) => this.props.onSelectedPOI(poi)} />
        } else {
          security = <Image
          width={MapConfig.SECURITY_WIDTH}
          height={MapConfig.SECURITY_HEIGHT} 
          x="145"
          y="170"
          href={Images("securitymap")}
          /> 
        }

        return (
          <View renderToHardwareTextureAndroid={true} shouldRasterizeIOS={true} style={{position: 'relative'}}>
            
            <SvgPanZoom
              canvasWidth={MapConfig.CANVAS_WIDTH} 
              canvasHeight={MapConfig.CANVAS_HEIGHT} 
              minScale={MapConfig.MIN_SCALE} 
              initialZoom={MapConfig.INITIAL_ZOOM} 
              initialTranslationX={MapConfig.TRANSLATION_X} 
              initialTranslationY={MapConfig.TRANSLATION_Y}>

              <Image

              onPressIn={() => this._onBackgroundSelected()}
  
              width="1235"
              height="1265"
              href={Images("fullmap")}
              /> 

              {security}
              {pois}
            </SvgPanZoom>

          </View>
        )
    }

    _onBackgroundSelected() {
      this.setState({
        selectedPOI: undefined
      }, () => {
        this.props.onBackgroundSelected && this.props.onBackgroundSelected()
      })
      
    }
}

export default PommeryMapComponent