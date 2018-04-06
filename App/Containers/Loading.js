import React, { Component } from 'react'

// require the authentication mechanism from firebase
import firebase from 'react-native-firebase'

// While the app authenticates, show a loading icon
import OpeningLogoLoader from "./OpeningLogoLoader"


/**
 * This component will check if the user has been authenticated
 * or not. During that time, show a loading icon to indicate that
 * the user must wait
 * ==============================================================
 */
export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * When the component loads, check if the user is logged in or
   * not.
   * ==============================================================
   */
  componentDidMount() {

    // we need the navigation props to navigate the user from one component to another
    const { navigate } = this.props.navigation;

    // let us see if the user is logged in or not, if so then navigate to the main page
    this.authSubscription = firebase.auth().onAuthStateChanged( user => user
      ? navigate('SignedIn')
      : navigate('SignedOut')
    )
  }

  /**
   * Don't forget to stop listening for authentication state changes
   * when the component unmounts.
   *
   */
  componentWillUnmount() {
    this.authSubscription();
  }


  /**
   * While the user is being authenticated, show the loading icon
   * ==============================================================
   * @return {XML}
   */
  render() {
    return(
      <OpeningLogoLoader/>
    );
  }
}
