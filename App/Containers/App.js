import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import {MenuProvider} from "react-native-popup-menu";
import firebase from 'react-native-firebase';
import LaunchScreen from './LaunchScreen';

// create our store
const store = createStore();

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  /*
* Listen for any state changes and update the component state
* */
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }

  /**
   * Don't forget to stop listening for authentication state changes
   * when the component unmounts.
   */
  componentWillUnmount() {
    this.authSubscription();
  }


  render () {
    // The application is initialising
    if (this.state.loading) return null;

    console.log('app.js', this.state.user);
    // The user is an Object, so they're logged in
    if (this.state.user) {
      return (
        <LaunchScreen />
      )
    } else {

      return (
        <MenuProvider>
          <Provider store={store}>
            <RootContainer />
          </Provider>
        </MenuProvider>
      );

      // The user is null, so they're logged out
      // return <LoggedOut/>;
    }

  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
