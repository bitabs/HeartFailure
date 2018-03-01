import {DrawerNavigator, StackNavigator} from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import React from 'react';
import Login from "../Containers/Login";
import Loading from "../Containers/Loading";
import CustomSideMenu from "../Components/customSideMenu";
import MessagingComponent from "../Components/MessagingComponent";
import SignUp from "../Containers/SignUp";
import Profile from "../Containers/Profile";
import EditProfile from "../Containers/EditProfile";
import Cardiologists from "../Containers/Cardiologists";
import ViewMyDoctors from "../Containers/ViewMyDoctors";


export const SignedOut = StackNavigator({
  SignIn: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null
    }
  }
});


const DrawerExample = DrawerNavigator({
  Home: {
    screen: LaunchScreen
  },
},{
  drawerOpenRoute: 'FooDrawerOpen',
  drawerCloseRoute: 'FooDrawerClose',
  drawerPosition: "right",
  contentComponent: ({ navigation }) => (
    <MessagingComponent navigation={navigation} />
  ),
});

export const $LaunchScreen = DrawerNavigator({
  Home: {screen: DrawerExample}
},{
  contentComponent: CustomSideMenu
});

export const $Profile = DrawerNavigator({
  Profile: {screen:  Profile}
},{
  contentComponent: CustomSideMenu
});

export const $Doctors = DrawerNavigator({
  Profile: {screen:  Cardiologists}
},{
  contentComponent: CustomSideMenu
});

export const $MyDoctors = DrawerNavigator({
  Profile: {screen:  ViewMyDoctors}
},{
  contentComponent: CustomSideMenu
});



export const SignedIn = StackNavigator({
  LaunchScreen: {
    screen: $LaunchScreen
  },
  Profile: {
    screen: $Profile
  },
  EditProfile: {
    screen: EditProfile
  },
  DoctorsScreen: {
    screen: $Doctors
  },
  MyDoctors: {
    screen: $MyDoctors
  }
}, {
  headerMode: "none",
  mode: "modal",
  initialRouteName: 'LaunchScreen'
});

export const HomeNav = StackNavigator({
  Home: {
    screen: SignedIn,
    navigationOptions: {
      gesturesEnabled: false
    }
  }
},{
  headerMode: "none",
  mode: "modal",
  initialRouteName: "Home",
});


const PrimaryNav = StackNavigator({
  SignedIn: {
    screen: HomeNav,
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
  initialRouteName: "Loading",
});

export default PrimaryNav;




