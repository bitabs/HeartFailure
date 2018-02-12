import {DrawerNavigator, StackNavigator} from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import React from 'react';
import Login from "../Containers/Login";
import Loading from "../Containers/Loading";
import CustomSideMenu from "../Components/customSideMenu";
import RightSideMenu from "../Components/RightSideMenu";


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
  contentComponent: CustomSideMenu
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




