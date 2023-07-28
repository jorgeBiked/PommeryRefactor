// @ts-nocheck
import React, { useState } from 'react'
import { Circle, G, Image, Text } from 'react-native-svg'
import { SvgPanZoomElement } from '../../../lib/svg-pan-zoom'
import Images from '../../../images/images';
import { POI } from '../../../model/POI';
interface Props {
    poi: POI,
    poiIdx: string,
    highlighted: boolean,
    onClick?: () => void
}
interface State {
    selectedPOI?: POI
}

export const PointsOfInterestItem = ({ onClick, poi, highlighted, poiIdx }) => {
    const [selectedPOI, setSelectedPOI] = useState(null);
    return (

        <G key={Math.random()}>
    
            {/* HACK: clickablea area since the Image element does not handle click events properly (Android only) */}
            <SvgPanZoomElement onClick={() => onClick && onClick()}>
                <Circle
                    cx={poi.geography!.thumbnail_x + 29}
                    cy={poi.geography!.thumbnail_y + 29}
                    r={29}
                    fill='#fff'
                />
            </SvgPanZoomElement>

            <G 
                key={Math.random()}
                x={poi.geography!.thumbnail_x} 
                y={poi.geography!.thumbnail_y}>
                {
                    highlighted && (
                        <Circle 
                            x={29}
                            y={29}
                            r={36}
                            fill="#fff"
                            stroke="#d3d3d3"
                            strokeWidth={2}
                            strokeOpacity={0.8}
                        />
                    )
                }
                <Image
                    width={58}
                    height={58}
                    preserveAspectRatio="xMidYMid slice"
                    href={Images(poi.thumbnail)}
                    onPressIn={() => onClick && onClick()}
                />
                <Circle
                    cx={55}
                    cy={4}
                    r={12}
                    fill="#B17900"
                />
                <Text
                    x={55}
                    y={8}
                    textAnchor="middle"
                    fill="white"
                >
                    { poiIdx }
                </Text>
            </G>
        </G>
    )   
}
