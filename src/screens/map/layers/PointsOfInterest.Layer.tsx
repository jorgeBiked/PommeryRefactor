import React from 'react'
import { G } from 'react-native-svg'

import { PointsOfInterestItem } from './PointOfInterest.Item'

import { POI } from '../../../model/POI';
import { 
    poi_escalier, 
    poi_maradeurs,
    poi_veuve_pommery, 
    poi_notre_dame, 
    poi_liverpool, 
    poi_elaboration,
    poi_manchester, 
    poi_stockholm_olso, 
    poi_silene, 
    poi_champagne, 
    poi_fete_bacchus, 
    poi_louise, 
    poi_crayeres,
    poi_oenotheque
} from '../resources/map-poi'

interface Props {
    onClick?: (poi: POI) => void
    selectedPOI?: POI
}

interface State {
    selectedPOI?: POI
}

export class PointsOfInterestLayer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            selectedPOI: this.props.selectedPOI
        }
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any){
        return {selectedPOI : nextProps.selectedPOI}
    }

    render() {

        const selected = this.state.selectedPOI
        return (
            <G>
                <PointsOfInterestItem
                    poi={poi_escalier}
                    poiIdx="1"
                    highlighted={selected == poi_escalier}
                    onClick={() => this._onPOISelected(poi_escalier)} />

                <PointsOfInterestItem
                    poi={poi_maradeurs}
                    poiIdx="2"
                    highlighted={selected == poi_maradeurs}
                    onClick={() => this._onPOISelected(poi_maradeurs)} />

                <PointsOfInterestItem
                    poi={poi_veuve_pommery}
                    poiIdx="3"
                    highlighted={selected == poi_veuve_pommery}
                    onClick={() => this._onPOISelected(poi_veuve_pommery)} />

                <PointsOfInterestItem
                    poi={poi_notre_dame}
                    poiIdx="4"
                    highlighted={selected == poi_notre_dame}
                    onClick={() => this._onPOISelected(poi_notre_dame)} />

                <PointsOfInterestItem
                    poi={poi_liverpool}
                    poiIdx="5"
                    highlighted={selected == poi_liverpool}
                    onClick={() => this._onPOISelected(poi_liverpool)} />

                <PointsOfInterestItem
                    poi={poi_elaboration}
                    poiIdx="6"
                    highlighted={selected == poi_elaboration}
                    onClick={() => this._onPOISelected(poi_elaboration)} />

                <PointsOfInterestItem
                    poi={poi_manchester}
                    poiIdx="7"
                    highlighted={selected == poi_manchester}
                    onClick={() => this._onPOISelected(poi_manchester)} />

                <PointsOfInterestItem
                    poi={poi_crayeres}
                    poiIdx="8"
                    highlighted={selected == poi_crayeres}
                    onClick={() => this._onPOISelected(poi_crayeres)} />

                <PointsOfInterestItem
                    poi={poi_stockholm_olso}
                    poiIdx="9"
                    highlighted={selected == poi_stockholm_olso}
                    onClick={() => this._onPOISelected(poi_stockholm_olso)} />

                <PointsOfInterestItem
                    poi={poi_silene}
                    poiIdx="10"
                    highlighted={selected == poi_silene}
                    onClick={() => this._onPOISelected(poi_silene)} />

                <PointsOfInterestItem
                    poi={poi_champagne}
                    poiIdx="11"
                    highlighted={selected == poi_champagne}
                    onClick={() => this._onPOISelected(poi_champagne)} />

                <PointsOfInterestItem
                    poi={poi_fete_bacchus}
                    poiIdx="12"
                    highlighted={selected == poi_fete_bacchus}
                    onClick={() => this._onPOISelected(poi_fete_bacchus)} />

                <PointsOfInterestItem
                    poi={poi_louise}
                    poiIdx="13"
                    highlighted={selected == poi_louise}
                    onClick={() => this._onPOISelected(poi_louise)} />

                <PointsOfInterestItem
                    poi={poi_oenotheque}
                    poiIdx="14"
                    highlighted={selected == poi_oenotheque}
                    onClick={() => this._onPOISelected(poi_oenotheque)} />
            </G>
        )
    }

    _onPOISelected(poi: POI) {
        
        if (this.state.selectedPOI == undefined || this.state.selectedPOI != undefined && poi.header.title != this.state.selectedPOI.header.title) {
            if ( this.props.onClick !== undefined ) {
                this.props.onClick(poi)
            }
        } 
    }
}