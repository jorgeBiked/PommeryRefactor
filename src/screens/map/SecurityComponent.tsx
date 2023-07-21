import React from 'react'
import { View, Icon } from 'native-base';
import { Text, StyleSheet, ViewStyle, TextStyle, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';

import globalStyles from '../../styles/styles';
import { locale } from '../../utilities/Strings';
import { fonts, colors, fontSizes } from '../../styles';
import SwipeUpDown from '../common/SwipeUpDown';
import { isIphoneX } from '../../../node_modules/react-native-iphone-x-helper';
import Images from '../../images/images';


interface Style {
    container: ViewStyle
    securityHeader: ViewStyle
    paragraph: TextStyle
    li: TextStyle
    liText: TextStyle
    bullet: TextStyle
    bulletImage: ViewStyle
    securityHeaderTitle: TextStyle
    securityHeaderCloseIconView: ViewStyle
    securityHeaderClose: ViewStyle
    securityHeaderCloseIcon: TextStyle
}

const PADDING_TOP = Platform.OS === 'ios' ? isIphoneX()? 34 : 20 : 22

interface Props {
    onClose?: any
}
interface State {

}

class SecurityComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
           
        }
    }

    render() {
        const card = (
 
            <ScrollView style={{flex:1}}>

                <View style={styles.li}>
                    <Image style={[styles.bulletImage]} resizeMode="contain" source={Images('yellow')} />
                    <Text style={styles.liText}>{locale('map_security0')}</Text>
                </View>
                <View style={styles.li}>
                    <Image style={[styles.bulletImage]} resizeMode="contain" source={Images('blue')} />
                    <Text style={styles.liText}>{locale('map_security1')}</Text>
                </View>
                <View style={styles.li}>
                    <Image style={[styles.bulletImage]} resizeMode="contain" source={Images('brown')} />
                    <Text style={styles.liText}>{locale('map_security2')}</Text>
                </View>
                <View style={styles.li}>
                    <Image style={[styles.bulletImage]} resizeMode="contain" source={Images('arrow')} />
                    <Text style={styles.liText}>{locale('map_security3')}</Text>
                </View>
                <View style={styles.li}>
                    <Image style={[styles.bulletImage]} resizeMode="contain" source={Images('phone')} />
                    <Text style={styles.liText}>{locale('map_security4')}</Text>
                </View>
                <View style={styles.li}>
                    <Image style={[styles.bulletImage]} resizeMode="contain" source={Images('alarm')} />
                    <Text style={styles.liText}>{locale('map_security5')}</Text>
                </View>

                <Text style={[styles.paragraph, globalStyles.bold]}>{locale('terms1')}</Text>
        
                <View style={styles.li}>
                    <Text style={styles.bullet}>{'\u2022'}</Text>
                    <Text style={styles.liText}>{locale('terms_bullets0')}</Text>
                </View>

                <View style={styles.li}>
                    <Text style={styles.bullet}>{'\u2022'}</Text>
                    <Text style={styles.liText}>{locale('terms_bullets1')}</Text>
                </View>

                <View style={styles.li}>
                    <Text style={styles.bullet}>{'\u2022'}</Text>
                    <Text style={styles.liText}>{locale('terms_bullets2')}</Text>
                </View>

                <View style={styles.li}>
                    <Text style={styles.bullet}>{'\u2022'}</Text>
                    <Text style={styles.liText}>{locale('terms_bullets0')}</Text>
                </View>

                <View style={styles.li}>
                    <Text style={styles.bullet}>{'\u2022'}</Text>
                    <Text style={styles.liText}>{locale('terms_bullets1')}</Text>
                </View>

                <View style={styles.li}>
                    <Text style={styles.bullet}>{'\u2022'}</Text>
                    <Text style={styles.liText}>{locale('terms_bullets2')}</Text>
                </View>
            </ScrollView>
            
        )
        
        return (
        <View style={styles.container} pointerEvents="none"> 

            <View style={[globalStyles.shadow, styles.securityHeader]}>
                <Text style={styles.securityHeaderTitle}>{locale('security')}</Text>      
            </View>

            <SwipeUpDown
                itemMini={card}
                itemFull={card}
                disablePressToShow={false}
                style={{ backgroundColor: '#fff' }} 
                />

        </View>
        )
    }

    _closeSecurity() {
        this.props.onClose()
    }
}


const styles = StyleSheet.create<Style>({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1
    },
    securityHeader: {
        top: 0,
        backgroundColor: '#fff',
        height: 75,
        left: 0,
        right: 0,
        paddingTop: PADDING_TOP,
        paddingLeft: 40,
        paddingRight: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-between'
    },
    securityHeaderTitle: {
        fontFamily: fonts.primary_bold,
        color: colors.gray,
        fontSize: 18,
        flexShrink: 1,
    },
    securityHeaderClose: {
        alignSelf: 'flex-end',
        right: -30,
        width: 50,
        height: 50
    },
    securityHeaderCloseIconView: {
        alignSelf: 'flex-end',
        width: 50,
        height: 50
    },
    securityHeaderCloseIcon: {
        textAlign: 'center',
        fontFamily: fonts.primary_bold,
        color: colors.orange,
        fontSize: 48
    },
    paragraph: {
        padding: 30,
        paddingBottom: 10,
        fontFamily: fonts.primary_bold,
        color: colors.gray,
        fontSize: fontSizes.medium
    },
    li: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row'
    },
    liText: {
        fontFamily: fonts.primary,
        color: colors.gray,
        fontSize: fontSizes.medium
    },
    bullet: {
        color: colors.secondaryColor,
        fontSize: fontSizes.medium,
        marginRight: 7
    },
    bulletImage: {
        marginRight: 10
    }
})

export default SecurityComponent