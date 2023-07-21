import React from 'react';
import { View } from 'native-base';
import { StyleSheet, Text, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';

import ButtonComponent from '../common/Button.Component';

import { colors, fonts, globalStyles } from '../../styles';
import Images from '../../images/images';

import { POI } from '../../model/POI';

interface Props {
    navigation: NavigationScreenProp<NavigationRoute>,
    poi: POI
}

interface Style {
    container: ViewStyle,
    content: ViewStyle,
    itemDescription: ViewStyle,
    title: TextStyle,
    subtitle: TextStyle,
    image: ImageStyle,
    button: ViewStyle,
    arrow: TextStyle
}

class POINavItem extends React.Component<Props, any> {
    render() {
        return (
            <View style={[globalStyles.shadow, styles.container]}>
                <View style={styles.content}>
                    <Image style={styles.image} resizeMode="contain" source={Images(this.props.poi.thumbnail)} />
                    <View style={styles.itemDescription}>
                        <Text numberOfLines={0} style={styles.title}>{this.props.poi.header.title}</Text>
                        <Text numberOfLines={0} style={styles.subtitle}>{this.props.poi.header.subtitle}</Text>
                    </View>
                    
                    <ButtonComponent 
                        style={styles.button} 
                        arrowStyle={styles.arrow} 
                        navigation={this.props.navigation} 
                        screen="ContentDetail" 
                        object={this.props.poi}></ButtonComponent>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create<Style>({
    container: {
        backgroundColor: colors.white,
        opacity: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'absolute',
        left: '5%',
        top: '5%',
        width: '90%',
        padding: 15,
        paddingRight: 5
        
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },
    itemDescription: {
        flex: 1,
        flexShrink: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
        margin: 15,
        marginRight: 5,
        marginTop: 0,
        marginBottom: 0
    },
    title: {
        color: colors.gray,
        fontSize: 16,
        fontFamily: fonts.primary,
        fontWeight: '500'
    },
    subtitle: {
        color: colors.lightGray,
        fontSize: 13,
        fontFamily: fonts.primary,
        fontWeight: 'normal'
    },
    image: {
        width: 65,
        height: 65
    },
    button: {
        alignSelf: 'flex-start',
        flexGrow: 0,
        padding: 0,
        marginTop: 20,
        height: 34,
        width: 34,
    },
    arrow: {
        fontSize: 34,
        height: 36
    }
});

export default POINavItem;