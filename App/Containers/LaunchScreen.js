import React, {PureComponent} from 'react'
import {View, TouchableHighlight, StyleSheet, Text, Animated, AsyncStorage, StatusBar} from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import {TabViewAnimated, TabBar} from 'react-native-tab-view';
import type {NavigationState} from 'react-native-tab-view/types';
import SimplePage from './SimplePage';

/*
* ======= Firebase Initialisation ======
* */
import firebase from 'react-native-firebase';
import User from '../Components/User';

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDFdv9jmcfZzzRs2OHu_j3ZXV0gkz5HniQ",
  authDomain: "heartfailure-bad0c.firebaseapp.com",
  databaseURL: "https://heartfailure-bad0c.firebaseio.com",
  projectId: "heartfailure-bad0c",
  storageBucket: "heartfailure-bad0c.appspot.com",
};

type Route = {
  key: string,
  icon: string,
};

type State = NavigationState<Route>;

export default class LaunchScreen extends PureComponent<*, State> {
  static title = 'Icon only top bar';
  static appbarElevation = 0;

  constructor(props) {
    super(props);
    this.state = {
      index           : 0,
      routes          : [{key: '1', icon: 'activity'}, {key: '2', icon: 'airplay'}, {key: '3', icon: 'users'}],
      authUserUID     : null,
      authUserType    : null,
      modalVisible    : false,
      viewCurrentUser : null,
      defaultView     : null,
      disableSwipe    : true,
    };
    this.userRef = firebase.app().database().ref(`/Users/`);
    this.dashRef = firebase.app().database().ref(`/Dashboard/`);

    this.updateIndex = this.updateIndex.bind(this);
    this.updateUserView = this.updateUserView.bind(this);
    this.toggleSwipe = this.toggleSwipe.bind(this);
  }

  componentWillUnmount() {
    this._isMounted = false;
    console.log("unmounting launchscreen")
  }

  componentDidMount() {
    this._isMounted = true;
    User().then(user => {
      this.userRef.child(user.uid).once('value').then(snap => {
        if (snap.val() && this._isMounted) {
          const {routes} = this.state, authUser = snap.val();
          this.setState(prevState => ({
            authUserUID: user.uid,
            authUserType: snap.val().type,
            routes: authUser.type === "Patient" ? [...routes, {key: '4', icon: 'message-square'}]: prevState.routes
          }));
        }
      });
    });
  };

  _handleIndexChange = index => this.setState({index});

  updateIndex = route => {
    if (route === "Patient") this.setState({
      index: this.state.index === 2 ? 3 : 2
    }); else if (route === "Doctor") this.setState({
      index: this.state.index === 0 ? 1 : 0
    })
  };

  toggleSwipe = val => this.setState({disableSwipe: val});

  updateUserView = user => this.setState({viewCurrentUser: user});

  _renderIcon = ({route}) => <Feather name={route.icon} size={24} color="#bccad0"/>;

  _renderHeader = props => (<View style={[styles.headerContainer, {justifyContent: 'space-between', backgroundColor: 'white', elevation: 0.3}]}>
    <Feather name="activity" size={20} color="#8F9CAE" />
    <View style={{position: 'relative'}}>
      <TouchableHighlight activeOpacity={1} underlayColor="rgba(253,138,94,0)" onPress={() => {
        this.props.navigation.navigate('FooDrawerOpen')
      }}>
        <Feather style={styles.msgIcon} name="message-square" size={22} color="#bccad0"/>
      </TouchableHighlight>
      <View style={styles.notificationDot}/>
    </View>
  </View>);

  _renderFooter = props => (<View style={{elevation: 20, backgroundColor: 'white'}}>
    <TabBar {...props} indicatorStyle={styles.indicator} renderIcon={this._renderIcon} style={[styles.tabbar, {paddingTop: 1, paddingBottom: 1}] }/>
  </View>);

  _renderScene = ({route}) => (<SimplePage
    authUserUID={this.state.authUserUID}
    authUserType={this.state.authUserType}
    index={this.state.index}
    updateIndex={this.updateIndex}
    disableSwipe={this.toggleSwipe}
    userView={this.updateUserView}
    activeUser={this.state.viewCurrentUser}
    navigation={this.props.navigation}
  />);

  render() {
    const {index, authUserType} = this.state;
    return (
      <TabViewAnimated
        style={styles.container}
        swipeEnabled={this.state.disableSwipe}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={!(index === 3 && authUserType === "Patient") && !(index === 2 && authUserType === "Doctor") ? this._renderHeader : null}
        renderFooter={this._renderFooter}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabbar: {
    backgroundColor: 'white',
    paddingTop: 10,
    elevation: 0
  },
  notificationDot: {
    position: 'absolute',
    right: 7,
    top: 5,
    width: 12,
    height: 12,
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 100 / 2,
    backgroundColor: '#E67D8F'
  },
  indicator: {
    backgroundColor: 'rgba(152, 168, 171, 0)'
  },
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8395ab',
  },
  button: {
    position: 'absolute',
    top: 10,
    padding: 10,
  },
  msgIcon: {
    padding: 8,
  },
  testing: {
    alignItems: 'center',
    borderColor: '#fff',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#f9f9fa',
    borderRadius: 100 / 2,
  }
});
