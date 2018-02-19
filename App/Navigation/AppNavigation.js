import {DrawerNavigator, StackNavigator} from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import React from 'react';
import Login from "../Containers/Login";
import Loading from "../Containers/Loading";
import CustomSideMenu from "../Components/customSideMenu";
import RightSideMenu from "../Components/RightSideMenu";
import MessagingComponent from "../Components/MessagingComponent";
import SignUp from "../Containers/SignUp";
import Profile from "../Containers/Profile";
import EditProfile from "../Containers/EditProfile";
import Cardiologists from "../Containers/Cardiologists";


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

export const SignedIn = DrawerNavigator({
  Home: {screen: DrawerExample}
},{
  contentComponent: CustomSideMenu
});

export const SignedInProfile = DrawerNavigator({
  Profile: {screen:  Profile}
},{
  contentComponent: CustomSideMenu
});

export const Doctors = DrawerNavigator({
  Profile: {screen:  Cardiologists}
},{
  contentComponent: CustomSideMenu
});

export const HomeNav = StackNavigator({
  Home: {
    screen: SignedIn,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  EditProfile: {
    screen: ({navigation}) => (<EditProfile navigation={navigation}/>),
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  Profile: {
    screen: SignedInProfile,
    navigationOptions: {
      gesturesEnabled: false
    }
  },

  MyDoctors: {
    screen: Doctors,
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




