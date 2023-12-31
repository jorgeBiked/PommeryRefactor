import { createStackNavigator } from '@react-navigation/stack';
import { Button, View } from 'react-native';
const Stack = createStackNavigator();

import MapComponent from './screens/map/Map.Component';
import IntroComponent from './screens/intro/Intro.Component';
import ContentDetail from './screens/contentDetail/ContentDetail';
import TastingComponent from './screens/tasting/Tasting.Component';
import BottleDetail from './screens/tasting/BottleDetail';
import TermsComponent from './screens/terms/Terms.Component';


function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Terms"
        onPress={() => navigation.navigate('TermsComponent')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function AppNavigator() {
  return (
      <Stack.Navigator
        initialRouteName="TermsComponent"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="TermsComponent" component={TermsComponent} />
        <Stack.Screen name="IntroComponent" component={IntroComponent} />
        <Stack.Screen name="TastingComponent" component={TastingComponent} />
        <Stack.Screen name="BottleDetail" component={BottleDetail} />
        <Stack.Screen name="ContentDetail" component={ContentDetail} />

        <Stack.Screen name="MapComponent" component={MapComponent} />
      </Stack.Navigator>
  );
}

export { AppNavigator };
