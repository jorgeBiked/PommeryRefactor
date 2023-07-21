import React from 'react';
import { Text, StyleSheet, View, ViewStyle, TextStyle, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { introPage, mapPage, tastingPage } from '../../utilities/Constants'
import {
  NavigationScreenProp,
  NavigationRoute,
  withNavigation
} from 'react-navigation';

import { globalStyles, colors, fonts, fontSizes} from '../../styles';
import { Icon } from 'native-base';
import Images from '../../images/images';
import { locale } from '../../utilities/Strings';

const menuWidthCollapsed = 54

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>
  active: string
  expanded: boolean
  tutorial: boolean
  onSecurityPress?: any
}
interface State {
    active: string
    tutorial: boolean
    menuExpanded: boolean
    menuOpacity: any
    menuWidth: number
    animatedWidth: any
}

interface Style {
    tutorialView: ViewStyle
    tutorialText: TextStyle
    tutorial: ViewStyle
    separator: ViewStyle
    menuView: ViewStyle
    menuViewCollapsed: ViewStyle
    menuButtonView: ViewStyle
    menuButtonText: TextStyle
    active: TextStyle
    regular: TextStyle
    closeButtonView: ViewStyle
    menuIcon: TextStyle
    menuIconMap: TextStyle
    menuButtonImage: ViewStyle
    menuButtonImageActive: ViewStyle
    menuText: TextStyle
    securityView: ViewStyle
    securityIcon: TextStyle
    securityText: TextStyle
}

class MenuComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            tutorial: this.props.tutorial ? 1 : 0,
            active: this.props.active,
            menuExpanded: this.props.expanded,
            menuOpacity: new Animated.Value(this.props.expanded? 1 : 0),
            menuWidth: Dimensions.get('window').width - 20,
            animatedWidth: new Animated.Value(this.props.expanded? Dimensions.get('window').width - 20 : menuWidthCollapsed)
        }
        
        this.props.navigation.addListener(
            'willFocus',
            payload => {
                setTimeout(() => {
                    if (this.state.active != introPage) {
                        this._closeMenu()
                    }
                }, 300)
            }
          )
    }

    render() {
        
        const buttonStyle = {
            display: this.state.menuExpanded ? 'flex': 'none', 
            opacity: this.state.menuOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                })
                }

        return (
            <View>
                <Animated.View style={[styles.menuView, globalStyles.shadow, 
                    this.state.menuExpanded ? null : styles.menuViewCollapsed, 
                    { width: this.state.animatedWidth }
                    ]}>
                    
                    {/* TUTORIAL VIEW */}
                    <Animated.View style={[styles.tutorialView, buttonStyle, { width: this.state.animatedWidth, opacity: this.state.tutorial }]}>
                        <View style={styles.tutorial}>
                        </View>
                        <View style={styles.tutorial}>
                            <Text style={styles.tutorialText}>{locale('stage1')}</Text>
                            <View style={styles.separator}></View>
                        </View>
                        <View style={styles.tutorial}>
                            <Text style={styles.tutorialText}>{locale('stage2')}</Text>
                            <View style={styles.separator}></View>
                        </View>
                        <View style={styles.closeButtonView}>
                        </View>
                    </Animated.View>

                    {/* INTRO BUTTON */}
                    <Animated.View style={[buttonStyle, styles.menuButtonView]}>
                        <TouchableOpacity onPress={this._goToIntro.bind(this)}>
                            <View style={styles.menuButtonView}>
                                <Image style={[styles.menuButtonImage, this.state.active == introPage ? styles.menuButtonImageActive : null]} resizeMode="contain"
                                source={Images('intro')}
                                />
                                <Text style={[styles.menuButtonText, this.state.active == introPage ? styles.active : styles.regular]}>{locale('introduction')}</Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>

                    {/* MAP BUTTON */}
                    <Animated.View style={[buttonStyle, styles.menuButtonView]}>
                        <TouchableOpacity onPress={this._goToMap.bind(this)}>
                            <View style={styles.menuButtonView}>
                                <Image style={[styles.menuButtonImage, this.state.active == mapPage ? styles.menuButtonImageActive : null]} resizeMode="contain"
                                source={Images('map')}
                                />
                                <Text style={[styles.menuButtonText, this.state.active == mapPage ? styles.active : styles.regular]}>{locale('galleries')}</Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                    
                    {/* TASTING BUTTON */}
                    <Animated.View style={[buttonStyle, styles.menuButtonView]}>
                        <TouchableOpacity onPress={this._goToTasting.bind(this)}>
                            <View style={styles.menuButtonView}>
                                <Image style={[styles.menuButtonImage, this.state.active == tastingPage ? styles.menuButtonImageActive : null]} resizeMode="contain"
                                source={Images('tasting')}
                                />
                                <Text style={[styles.menuButtonText, this.state.active == tastingPage ? styles.active : styles.regular]}>{locale('tasting')}</Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>

                    {/* MENU BUTTON */}
                    <TouchableOpacity onPress={this._toggleMenu.bind(this)}>
                        <View style={styles.closeButtonView}>
                            <Icon style={[styles.menuIcon, this.state.active == mapPage && !this.state.menuExpanded ? styles.menuIconMap : null, {fontSize: this.state.menuExpanded ? 45 : 30}]} name={this.state.menuExpanded ? 'ios-close': 'ios-menu'}/>
                            <Text style={[styles.menuText, {display: this.state.active == mapPage && !this.state.menuExpanded ? 'flex' : 'none'}]}>{locale('menu').toUpperCase()}</Text>
                        </View>
                    </TouchableOpacity>

                </Animated.View>
                
                {/* SECURITY BUTTON */}
                
                <View style={{display: this.state.active == mapPage && !this.state.menuExpanded ? 'flex' : 'none'}}>
                    <View style={[styles.securityView, globalStyles.shadow]}>
                        <TouchableOpacity onPress={this._showExit.bind(this)}>
                            <View style={styles.closeButtonView}>
                                <Icon style={styles.securityIcon} name='directions-run' type="MaterialIcons"/>
                                <Text style={styles.securityText}>{locale('security').toUpperCase()}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    _goToIntro() {
        this.props.navigation.navigate('IntroComponent')
    }
    _goToMap() {
        this.props.navigation.navigate('MapComponent')
    }
    _goToTasting() {
        this.props.navigation.navigate('TastingComponent')
    }
    _showExit() {
        this.props.onSecurityPress()
    }

    _closeMenu() {
        this.setState({
            menuExpanded: false
        }, () => {
            const endWidth = this.state.menuExpanded ? this.state.menuWidth : menuWidthCollapsed
            Animated.spring( 
                this.state.animatedWidth,
                { toValue: endWidth, useNativeDriver: false }
            ).start()
            Animated.spring( 
                this.state.menuOpacity,
                { toValue: this.state.menuOpacity? 1 : 0, useNativeDriver: false }
            ).start()
        })
        
    }
    _toggleMenu() {
        
        this.setState({
            menuExpanded: !this.state.menuExpanded
        }, () => {
            const endWidth = this.state.menuExpanded ? this.state.menuWidth : menuWidthCollapsed
            Animated.spring( 
                this.state.animatedWidth,
                { toValue: endWidth, useNativeDriver: false }
            ).start()
            Animated.spring( 
                this.state.menuOpacity,
                { toValue: this.state.menuOpacity? 1 : 0, useNativeDriver: false }
            ).start()
        })
        
    }
}

const styles = StyleSheet.create<Style>({
    tutorialView: {
        position: 'absolute',
        top: -70,
        height: 70,
        paddingLeft: 20,
        alignSelf: 'flex-end',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        overflow: 'hidden'
    },
    tutorial: {
        height: 60,
        width: 95,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    tutorialText: {
        color: '#7977A9',
        fontFamily: fonts.pommery,
        fontSize: 18
    },
    separator: {
        alignSelf: 'center',
        backgroundColor: colors.white,
        width: 1,
        marginTop: 7,
        opacity: 0.6,
        height: 19
    },
    menuView: {
        position: 'absolute',
        bottom: 25,
        right: 10,

        paddingTop: 3,
        paddingLeft: 20,
        paddingRight: 0,
        paddingBottom: 10,

        borderRadius: 27,
        height: 54,
        backgroundColor: colors.white,
        alignSelf: 'flex-end',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    menuViewCollapsed: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    menuButtonView: {
        height: 50,
        width: 95,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    menuButtonText: {
        fontFamily: fonts.primary,
        fontSize: 11,
        textAlign: 'center'
    },
    active: {
        color: colors.orange,
    },
    regular: {
        color: 'black',
    },
    closeButtonView: {
        margin: 0,
        padding: 0,

        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIcon: {
        fontSize: 45,
        color: colors.orange,
    },
    menuIconMap: {
        marginTop: -5,
        marginBottom: 5
    },
    menuButtonImage: {
        width: 30,
        height: 20,
    },
    menuButtonImageActive: {
        tintColor: colors.secondaryColor
    },
    menuText: {
        fontFamily: fonts.primary,
        fontSize: 8,
        color: colors.orange,
        marginTop: -10
    },
    securityView: {
        position: 'absolute',
        bottom: 25,
        left: 10,
        width: 54,
        height: 54,
        padding: 10,
        paddingTop: 7,
        borderRadius: 27,
        
        flexDirection: 'column',
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    securityIcon: {
        fontSize: fontSizes.mediumxBig,
        color: colors.orange
    },
    securityText: {
        fontFamily: fonts.primary,
        fontSize: 8,
        color: colors.orange
    }
})

export default withNavigation(MenuComponent)
