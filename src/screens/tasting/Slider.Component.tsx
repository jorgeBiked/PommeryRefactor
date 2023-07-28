import React, { useState } from 'react';
import { Text, StyleSheet, ViewStyle, Image, View, Dimensions } from 'react-native';
import {  globalStyles, colors, fontSizes } from '../../styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Images from '../../images/images';

interface Props {
    images: string[]
    width: number
}
interface State {
    activeSlide: number
}
interface Style {
    slider: ViewStyle
    image: ViewStyle
    paginationContainer: ViewStyle
    dotStyle: ViewStyle
}

const SliderComponent = ({ images }) => {

    const [activeSlide, setActiveSlide] = useState(0);
    
    const _renderItem = ({item}) => {
        return (
            <View style={styles.image}>
                <Image style={styles.image} source={Images(item)} resizeMode="contain"/>
            </View>
        )
    }

    if (images) {
        let pagination = (
            <Pagination
                dotsLength={images.length}
                activeDotIndex={activeSlide}
                containerStyle={[styles.paginationContainer]}
                dotStyle={styles.dotStyle}
                inactiveDotOpacity={0.2}
                inactiveDotScale={1}
            />
        )
        return (
            <View>
                { pagination }
                <Carousel
                    // ref={c => { this._carousel = c; }}
                    data={images}
                    renderItem={_renderItem}
                    sliderWidth={300}
                    itemWidth={300}
                    containerCustomStyle={styles.slider}
                    onSnapToItem={index => setActiveSlide(index) }
                />  
            </View>
        )
    } else {
        return <Text style={[globalStyles.title]}>No info</Text>
    }
    
}

// class SliderComponent extends React.Component<Props, State> {
    
//     constructor(props: Props) {
//         super(props)

//         this.state = {
//             activeSlide: 0
//         }
//     }

//     _renderItem ({item}) {
//         return (
//             <View style={styles.image}>
//                 <Image style={styles.image} source={Images(item)} resizeMode="contain"/>
//             </View>
//         )
//     }

//     render() {
//         let i: number = 0

//         if (this.props.images) {

//             let pagination = <Pagination
//                 dotsLength={this.props.images.length}
//                 activeDotIndex={this.state.activeSlide}
//                 containerStyle={[styles.paginationContainer]}
//                 dotStyle={styles.dotStyle}
                
//                 inactiveDotOpacity={0.2}
//                 inactiveDotScale={1}
//             />

//             return (
//                 <View>
//                     { pagination }
//                     <Carousel
//                     ref={(c) => { this._carousel = c; }}
//                     data={this.props.images}
//                     renderItem={this._renderItem}
//                     sliderWidth={300}
//                     itemWidth={300}
//                     containerCustomStyle={styles.slider}
//                     onSnapToItem={(index) => this.setState({ activeSlide: index }) }
//                     />
                    
//                 </View>

//             )
//         } else {

//             return (
//                 <Text style={[globalStyles.title]}>No info</Text>
//             )
//         }
//     }
    
// }


const styles = StyleSheet.create<Style>({
    slider: {
        alignSelf: 'center',
        marginTop: 40,
        height: 300,
    },
    paginationContainer: {
        alignSelf: 'center',
        marginTop: 20
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 0,
        opacity: 0.7,
        backgroundColor: colors.orange
    
    },
    image: {
        alignSelf: 'center',
        width: '100%',
        height: 300,
      
    }
});

export default SliderComponent
