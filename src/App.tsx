import React from 'react';
import { AppNavigator } from './AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import { NativeBaseProvider, extendTheme } from 'native-base';

const theme = extendTheme({
  style: getTheme(platform),
});

const PommeryApp = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
export default PommeryApp;

// AppRegistry.registerComponent(appName, () => PommeryApp);