import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle, Image, ScrollView, TouchableOpacity, View, Dimensions, SafeAreaView, BackHandler } from 'react-native';

import {
  NavigationScreenProp,
  NavigationRoute
} from 'react-navigation';

import {  globalStyles, colors, fontSizes, fonts } from '../../styles';

import { Icon } from 'native-base';

import SectionComponent from '../common/SectionComponent';
import { Bootle } from '../../model/Bootle';
import SliderComponent from './Slider.Component';
import Images from '../../images/images';
import ParsedText from 'react-native-parsed-text';

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>,
}
interface State {
    bootle: Bootle
    width: number
}

interface Style {
    bg: ViewStyle
    bgWhite: ViewStyle
    bgImage: ViewStyle
    bootleView: ViewStyle
    title: TextStyle
    selector: ViewStyle
    button: TextStyle
    active: TextStyle
    closeButtonView: ViewStyle
    bold: TextStyle
}

class BootleDetail extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props)

        const bootle: Bootle = this.props.navigation.getParam('object')

        this.state = {
            bootle: bootle,
            width: undefined
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
    }

    handleBackButton = () => {
        this._close()
        return true
    }

    render() {
        let i: number = 0
        
        if (this.state.bootle) {
            return (
                <View style={styles.bg} >

                    <View style={styles.bgWhite}></View>
                    <Image source={Images('bg_blue')} resizeMode="contain" style={styles.bgImage}/>

                    <ScrollView showsVerticalScrollIndicator={false} style={styles.bootleView}>
                        
                        <SliderComponent width={this.state.width} images={this.state.bootle.images}></SliderComponent>
                        <Text style={[globalStyles.title, styles.title]}>{this.state.bootle.title}</Text>
                        <ParsedText 
                        style={[globalStyles.paragraph]}
                        parse={
                            [
                              {pattern: /<bold>[\w\W]*?<\/bold>/, style: styles.bold, renderText: this._renderBoldText}
                            ]
                          }
                          >{this.state.bootle.text}</ParsedText>

                        {/* {this.state.bootle.sections.map(section => 
                            <SectionComponent key={i += 1} section={section}></SectionComponent>
                        )} */}

                        <TouchableOpacity style={styles.closeButtonView} onPress={this._close.bind(this)}>      
                            <Icon style={[{color: colors.secondaryColor, fontSize: 50}]} name="ios-close"/>
                        </TouchableOpacity>
                        
                    </ScrollView>
                </View>
            )
        } else {

            return (
                <Text style={[globalStyles.title, styles.title]}>No info</Text>
            )
        }
    }
    
    onLayout = event => {
        if (this.state.width) return 
        let {width} = event.nativeEvent.layout
        this.setState({width: width})
    }

    _close() {
        this.props.navigation.pop()
    }
    
    _renderBoldText(matchingString: string) {
        let match = matchingString.replace(/<bold>/g, "")
        match = match.replace(/<\/bold>/g, "")

        return match
    }
}


const styles = StyleSheet.create<Style>({
    bg: {
        flex: 1,
        backgroundColor: colors.primaryBg
    },
    bgWhite: {
        backgroundColor: colors.white,
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        height: 500
    },
    bgImage: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        height: 500
    },
    bootleView: {
        backgroundColor: colors.white,
        margin: 15,
        marginTop: 0,
        marginBottom: 0,
        paddingBottom: 40
    },
    title: {
        marginTop: 40,
        fontSize: fontSizes.big
    },
    selector: {
        margin: 20,
        marginBottom: 40,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        alignContent: 'center',
        flex: 1,
        height: 38,
        fontFamily: fonts.primary,
        color: colors.gray,
        fontSize: fontSizes.small,
        borderRadius:19,
        borderColor: colors.secondaryColor,
        borderWidth: 0.5,
        padding: 10
        
    },
    active: {
        fontFamily: fonts.primary_bold,
        color: 'black'
    },
    closeButtonView: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: -20,
        top: 30,
        width: 50,
        height: 50
    },
    bold: {
        fontFamily: fonts.primary_bold
    }
});

export default BootleDetail
