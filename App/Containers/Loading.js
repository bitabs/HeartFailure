import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import OpeningLogoLoader from "./OpeningLogoLoader";

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const { navigate } = this.props.navigation;
    this.authSubscription = firebase.auth().onAuthStateChanged( user => {
      user ? navigate('SignedIn') : navigate('SignedOut');
    })
  };

  /**
   * Don't forget to stop listening for authentication state changes
   * when the component unmounts.
   *
   */
  componentWillUnmount = () => {
    this.authSubscription();
  };


  render() {
    return(
      <OpeningLogoLoader/>
    );
  }
}
