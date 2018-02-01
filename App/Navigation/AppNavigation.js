import {DrawerNavigator, StackNavigator} from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'
import CustomSideMenu from "../Components/customSideMenu";
import OpeningLogoLoader from "../Containers/OpeningLogoLoader";
import Login from "../Containers/Login";
import BLE from "../Containers/BLE";
import Loading from "../Containers/Loading";


export const SignedOut = StackNavigator({
  SignIn: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  }
});

export const SignedIn = DrawerNavigator({
  Home: {screen: LaunchScreen}
},{
  contentComponent: CustomSideMenu,
  navigationOptions: {}
});


const PrimaryNav = StackNavigator(
  {
    SignedIn: {
      screen: SignedIn,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    SignedOut: {
      screen: SignedOut,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Loading: {
      screen: Loading
    }
  }, {
    headerMode: "none",
    mode: "modal",
    initialRouteName: "Loading"
  }
);

export default PrimaryNav;




