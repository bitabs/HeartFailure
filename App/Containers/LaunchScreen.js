// list of external libraries imported
import React, {Component} from 'react'

// react's predefined components
import {View, TouchableHighlight, Text, StatusBar} from 'react-native'

// vector icons
import Feather from 'react-native-vector-icons/Feather'

// tab navigation mechanism
import {TabViewAnimated, TabBar} from 'react-native-tab-view'

// navigation state for navigating between tabs
import type {NavigationState} from 'react-native-tab-view/types'

// the main interface of the application rests within here
import SimplePage from './SimplePage'

// importing firebase to access firebase database
import firebase from 'react-native-firebase'

// helper class to return the authenticated user details
import User from '../Components/User'

// styles of this component
import styles from './Styles/LaunchScreenStyles'

/**
 * In order to use firebase, we first had to generate api key.
 * Here's a link for instructions: https://support.google.com/cloud/answer/6158862
 * @type {{
 *    apiKey        : string, authDomain: string,
 *    databaseURL   : string, projectId : string,
 *    storageBucket : string
 * }}
 */
const firebaseConfig = {
  apiKey        : "AIzaSyDFdv9jmcfZzzRs2OHu_j3ZXV0gkz5HniQ",
  authDomain    : "heartfailure-bad0c.firebaseapp.com",
  databaseURL   : "https://heartfailure-bad0c.firebaseio.com",
  projectId     : "heartfailure-bad0c",
  storageBucket : "heartfailure-bad0c.appspot.com",
};

// For tab navigation, we structure route object
type Route = { key: string, icon: string };

// Our state will be based on rout object declared above
type State = NavigationState<Route>;

/**
 * A root component where the entire application rests within it.
 * This component acts like a root container. Users are directed
 * here from loginForm/SignUp component.
 * ==============================================================
 * @typedef {(class)} Component
 */
export default class LaunchScreen extends Component<*, State> {

  /**
   * The class extends Component, and so we use all the props the
   * component uses.
   * @param props
   */
  constructor(props) {
    super(props);

    /*
     * State object that holds up-to-date data. Which will trigger
     * refresh if anything changes within this object.
     */
    this.state = {
      index           : 0, routes : [
        {key: '1', icon: 'users'}, {key: '2', icon: 'cpu'}
      ],
      authUserUID     : null,  authUserType    : null,
      modalVisible    : false, viewCurrentUser : null,
      defaultView     : null,  activeTitle     : null
    };

    // Keep a local reference to the database from firebase
    this.userRef = firebase.app().database().ref(`/Users/`);

    /*
     * Set of methods that require to be in the same context as this
     */

    // This method updates the index based on the current context
    this.updateIndex = this.updateIndex.bind(this);

    // this method keeps a record of the first user to be viewed
    this.updateUserView = this.updateUserView.bind(this);

    // method that retrieves data from firebase
    this.retrieveInfo = this.retrieveInfo.bind(this);

    // method that changes the title within the dashboard
    this.toggleTitle = this.toggleTitle.bind(this);
  }

  /**
   * lifeCycle hook called when the component umounts
   */
  componentWillUnmount() {
    // set this false so that we don't call "this.setState()" on unmounted component
    this._isMounted = false;
  }

  /**
   * this method is called when the component mounts
   */
  componentDidMount() {
    // set this to true so that we can call "this.setState()" on mounted component
    this._isMounted = true;

    // when the component has mounted, we request the data from database
    this.retrieveInfo(this.userRef)
  };

  /**
   * This method is called only when the component has mounted.
   * This method will require a predefined reference from
   * firebase, which will return the data.
   * ==============================================================
   * @param userRef
   */
  retrieveInfo = (userRef) => {

    // we add an extra tab for patients
    const
      key3 = {key : '3', icon: 'activity'},
      key4 = {key: '4', icon: 'menu'};

    /**
     * User() will return info of the current authenticated user.
     * When the user info has returned. We attach a listener.
     * "userRef" is a reference to the entire table in firebase.
     * We request the entire data of the current user by passing
     * the uid of the current user to the reference like so:
     * userRef.child(user.uid)
     * ==============================================================
     */
    User().then(user => {

      // when the data of the current user is available
      userRef.child(user.uid).on('value', snap => {
        // check of val() consists data
        if (snap.val()) {

          let
            authUser  = snap.val(),
            isPatient = authUser.type === "Patient",
            contains  = key => this.state.routes.some(route => route.key === key);

          // We update the state object so that the component is re-rendered
          this.setState({
            // the ID of the current user
            authUserUID: user.uid,
            // the type of the current user (i.e. Doctor or Patient)
            authUserType: snap.val().type,
            // title of the dashboard based on the current user type
            activeTitle: snap.val().type === "Doctor" ? "My Patients" : "My Doctors",

            // conditions for the routing to ensure not duplicate
            routes: isPatient
              ? !contains('3') && !contains('4')
                ? [...this.state.routes, key3, key4]
                : [...this.state.routes]
              : !contains('3')
                ? [...this.state.routes, {key : '3', icon: 'menu'}]
                : this.state.routes
          });
        }
      });
    });
  };

  /**
   * helper function that update the object when the index has
   * changed.
   * ==============================================================
   * @param index the current active tab that the user is in
   * @private
   */
  _handleIndexChange = index => this.setState({index});

  /**
   * This method changes the index when the user clicks on a followed user.
   * It is passed to nested components so that nested component can have
   * access.
   * ==============================================================
   * @typedef {((Boolean, string))} route
   * @param route
   */
  updateIndex = route => {
    if (route === "Patient") this.setState({
      index: this.state.index === 0 ? 1 : 0
    }); else if (route === "Doctor") this.setState({
      index: this.state.index === 0 ? 1 : 0
    })
  };

  /**
   * This method will toggle on the title of the dashboard based
   * on the type of the user.
   * ==============================================================
   * @param val
   */
  toggleTitle = val => this.setState({activeTitle: val});

  /**
   * This method will update on the default user that the
   * authenticated user will be able to view in the 3rd/4th tab. It
   * is passed to nested component so that it can update it.
   * ==============================================================
   * @param user
   */
  updateUserView = user => this.setState({viewCurrentUser: user});

  /**
   * This method will create icons based on the names specified
   * in the state object.
   * ==============================================================
   * @param route
   * @private
   */
  _renderIcon = ({route}) => <Feather name={route.icon} size={20} color="#bccad0"/>;

  /**
   * This method will open the right side menu to view messages
   * ==============================================================
   * @private
   */
  _openRightSideMenu = () => this.props.navigation.navigate('FooDrawerOpen');

  /**
   * This method will add top bar to the application. Which will
   * consist of the logo on the left side, and message icon on the
   * right.
   * ==============================================================
   * @returns {XML}
   * @private
   */
  _renderHeader = () => {
    return (
      <View style={[styles.headerContainer, styles.renderHeaderOverrideView]}>
        <Feather name="activity" size={20} color="#bccad0" />
        {this.state.index === 0 ? (
          <Text style={styles.dashboardTitle}>{this.state.activeTitle}</Text>
        ): null}
        <View style={{position: 'relative'}}>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="rgba(253,138,94,0)"
            onPress={() => this._openRightSideMenu()}
          ><Feather
            style={styles.msgIcon}
            name="message-square"
            size={22}
            color="#bccad0"
          /></TouchableHighlight>
          <View style={styles.notificationDot}/>
        </View>
      </View>
    )
  };

  /**
   * This will add footer to the application. Which will consists
   * of the icons based on each tab
   * ==============================================================
   * @param props
   * @returns {XML}
   * @private
   */
  _renderFooter = props => {
    return (
      <View style={styles.renderFooterView}>
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          renderIcon={this._renderIcon}
          style={[styles.tabBar, styles.tabBarOverride]}
        />
      </View>
    )
  };

  /**
   * This method consists of the main container of the application.
   * This method consist of the patient's and doctor's UI. We pass
   * few props so that children component can have access to.
   * ==============================================================
   * @param route
   * @returns {XML}
   * @private
   */
  _renderScene = ({route}) => {
    return (
      <SimplePage
        authUserType  = {this.state.authUserType}
        index         = {this.state.index}
        activeUser    = {this.state.viewCurrentUser}
        navigation    = {this.props.navigation}
        updateIndex   = {this.updateIndex}
        activeTitle   = {this.toggleTitle}
        userView      = {this.updateUserView}
      />
    )
  };

  /**
   * This method is called after the component has mounted. This
   * method will take care of the render and show it to the user.
   * ==============================================================
   * @returns {XML}
   */
  render() {
    const {index, authUserType} = this.state;
    return (
      <React.Fragment>
        <StatusBar backgroundColor="white" barStyle="dark-content"/>
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={!(
              index === 3 && authUserType === "Patient"
            ) && !(
              index === 2 && authUserType === "Doctor"
            ) ? this._renderHeader : null
          }
          renderFooter={this._renderFooter}
          onIndexChange={this._handleIndexChange}
        />
      </React.Fragment>
    );
  }
}
