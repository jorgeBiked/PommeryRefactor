import React from 'react';
import { AppNavigator } from './AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { useFonts } from 'expo-font';

const theme = extendTheme({
  style: getTheme(platform),
});

const PommeryApp = () => {

  const [fontsLoaded] = useFonts({
    'Roboto': require('./fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Italic': require('./fonts/Roboto/Roboto-Italic.ttf'),
    'Roboto-Light': require('./fonts/Roboto/Roboto-Light.ttf'),
    'Roboto-Bold': require('./fonts/Roboto/Roboto-Bold.ttf'),
    'OldStandardTT-Regular': require('./fonts/Old_Standard_TT/OldStandard-Regular.ttf'),
    'OldStandardTT-Bold': require('./fonts/Old_Standard_TT/OldStandard-Bold.ttf'),
    'OldStandardTT-Italic': require('./fonts/Old_Standard_TT/OldStandard-Italic.ttf'),
  });

  if (!fontsLoaded) return null;
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
export default PommeryApp;
