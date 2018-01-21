import {DrawerNavigator, StackNavigator} from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'
import customSideMenu from "../Components/customSideMenu";

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
});

const RootDrawer = DrawerNavigator({
  LaunchScreen: {
    screen: LaunchScreen
  }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  contentComponent: customSideMenu,
  navigationOptions: {
    headerStyle: styles.header
  }
});




export default RootDrawer
