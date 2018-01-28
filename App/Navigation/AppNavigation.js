import {DrawerNavigator, StackNavigator} from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'
import CustomSideMenu from "../Components/customSideMenu";
import OpeningLogoLoader from "../Containers/OpeningLogoLoader";
import Login from "../Containers/Login";
import BLE from "../Containers/BLE";

// const LoginStack = StackNavigator({
//   loginScreen: { screen: LoginScreen },
//   //signupScreen: { screen: LoginScreen },
//   // forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } }
// }, {
//   headerMode: 'float',
//   navigationOptions: {
//     headerStyle: {backgroundColor: '#E73536'},
//     title: 'You are not logged in',
//     headerTintColor: 'white'
//   }
// });
//
// const DrawerNavigation = StackNavigator({
//   DrawerStack: { screen: LaunchScreen }
// }, {
//   headerMode: 'float',
//   contentComponent: CustomSideMenu,
//   navigationOptions: {
//     headerStyle: styles.header,
//   }
// });
//
// // Manifest of possible screens
// const PrimaryNav = StackNavigator({
//   loginStack    : { screen: LoginStack},
//   drawerStack   : { screen: DrawerNavigation }
// }, {
//   // Default config for all screens
//   headerMode: 'none',
//   initialRouteName: 'LoginScreen',
//   navigationOptions: {
//     headerStyle: styles.header
//   }
// });

// // Manifest of possible screens
// const PrimaryNav = StackNavigator({
//   LoginScreen: { screen: LoginScreen }
// }, {
//   // Default config for all screens
//   headerMode: 'none',
//   initialRouteName: 'LoginScreen'
// });

// // Manifest of possible screens
// const PrimaryNav = StackNavigator({
//   LaunchScreen: { screen: LaunchScreen }
// }, {
//   // Default config for all screens
//   headerMode: 'none',
//   initialRouteName: 'LaunchScreen',
//   navigationOptions: {
//     headerStyle: styles.header
//   }
// });

// const RootDrawer = DrawerNavigator({
//   LaunchScreen: {
//     screen: LaunchScreen
//   }
// }, {
//   // Default config for all screens
//   headerMode: 'none',
//   initialRouteName: 'LaunchScreen',
//   contentComponent: CustomSideMenu,
//   navigationOptions: {
//     headerStyle: styles.header
//   }
// });

// drawer stack
const DrawerStack = DrawerNavigator({
  screen1: { screen: LaunchScreen },
  screen2: { screen: BLE },
  //screen3: { screen: Screen3 },
}, {
  contentComponent: CustomSideMenu,
  navigationOptions: {
    headerStyle: styles.header
  }
});

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  navigationOptions: {
    header: null
  }
});

// login stack
const LoginStack = StackNavigator({
  loginScreen: { screen: Login },
  //signupScreen: { screen: SignupScreen },
  //forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } }
}, {
  navigationOptions: {
    header: null
  }
});

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerNavigation }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack'
})


export default PrimaryNav
