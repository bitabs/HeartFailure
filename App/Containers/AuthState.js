import React, { Component } from 'react'

import firebase from 'react-native-firebase';
import LaunchScreen from "./LaunchScreen";
import OpeningLogoLoader from "./OpeningLogoLoader";

export default class AuthState extends Component {

  constructor() {
    super();

    this.state = {
      loading: true
    }
  }

  /*
* Listen for any state changes and update the component state
* */
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged( user => this.setState({ loading: false, user }) );
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render () {
    // If the user has not authenticated
    if (this.state.loading)
      return null;

    if (this.state.user)
      return <LaunchScreen/>;

    return <OpeningLogoLoader/>;

  }

}
