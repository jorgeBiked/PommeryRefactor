import { createStackNavigator } from 'react-navigation-stack';

import MapComponent from './screens/map/Map.Component';
import IntroComponent from './screens/intro/Intro.Component';
import ContentDetail from './screens/contentDetail/ContentDetail';
import TastingComponent from './screens/tasting/Tasting.Component';
import BootleDetail from './screens/tasting/BootleDetail';
import TermsComponent from './screens/terms/Terms.Component';

const AppNavigator = createStackNavigator({
  TermsComponent: { screen: TermsComponent},
  MapComponent: { screen: MapComponent },
  IntroComponent: { screen: IntroComponent },  
  TastingComponent: { screen: TastingComponent},
  ContentDetail: { screen: ContentDetail },
  BootleDetail: { screen: BootleDetail },
  },
  {
    initialRouteName: 'TermsComponent',
    mode: 'modal',
    headerMode: 'none',
    // transitionConfig: () => ({
    //   transitionSpec: {
    //     duration: 0,
    //   },
    // })
});

export { AppNavigator };
