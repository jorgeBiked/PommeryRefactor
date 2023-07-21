import { Platform, NativeModules } from 'react-native';

//DEFAULT: en
const availableLanguages = ["en", "fr", "nl"]

const locale = Platform.OS === "android" ? NativeModules.I18nManager.localeIdentifier : NativeModules.SettingsManager.settings.AppleLocale
export const language = languageAvailable(locale)

function languageAvailable(locale: string) {
    if (locale == null) {
        return availableLanguages[0];
    }
    
    let systemLanguage = locale.substring(0, 2)
    let isAvailable = availableLanguages.filter(
        element => element === systemLanguage
    )

    if (isAvailable.length > 0) {
        return isAvailable[0]
    } else {
        return availableLanguages[0]
    }

}

export const introPage = "Intro"
export const mapPage = "Map"
export const tastingPage = "Tasting"

export const videoUrl = require('../videos/tasting.mp4')