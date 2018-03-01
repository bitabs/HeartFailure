import React, { PureComponent } from 'react'
import {View, TouchableHighlight, StyleSheet, Text, Animated, AsyncStorage} from 'react-native'
import Ionicons from 'react-native-vector-icons/Feather';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import type { NavigationState } from 'react-native-tab-view/types';
import SimplePage from './SimplePage';
import Svg, { Line } from 'react-native-svg';
/*
* ======= Firebase Initialisation ======
* */
import firebase from 'react-native-firebase';
import User from '../Components/User';
import CustomModal from "../Components/CustomModal";

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
      index: 0,
      routes: [{
        key: '1', icon: 'activity'
      }, {
        key: '2', icon: 'airplay'
      }],
      selectedItem: 'About',
      isPressed: false,
      currentUser: null,
      modalVisible: false,
      loading: false,
      type: "",
      renderThis: true,
      defaultView: null
    }
  }

  componentDidMount() {
    User().then(user => {
      firebase.app().database().ref(`/Users/${user.uid}`).on('value', (snap) => {

        this.setState({
          type: snap.val().type
        })
      });
    });
  };

  _handleIndexChange = index => { this.setState({ index }) };

  updateIndex = () => { this.setState({ index: this.state.index === 0 ? 1 : 0 }) };

  updatePatientView = (patient) => { this.setState({
    defaultView: patient
  })};

  eliminateRender = () => { this.setState({ renderThis: false }) };

  _renderIcon = ({ route }) => { return <Ionicons name={route.icon} size={24} color="#bccad0" />; };

  openModel = () => { this.child.toggleModal();};

  _renderHeader = props => {

    return (
      <View style={{elevation: 0.5, backgroundColor:'white'}}>
        <View style={styles.headerContainer}>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('DrawerOpen')} activeOpacity={1.0} underlayColor="rgba(253,138,94,0)">

            <Svg height="24" width="24">
              <Line fill="none" stroke="#bccad0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="3" y1="12" x2="21" y2="12"/>
              <Line fill="none" stroke="#bccad0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="10.208" y1="6" x2="21" y2="6"/>
              <Line fill="none" stroke="#bccad0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="3" y1="18" x2="13.791" y2="18"/>
            </Svg>

          </TouchableHighlight>

          <View style={{position: 'relative'}}>
            <TouchableHighlight activeOpacity={1} underlayColor="rgba(253,138,94,0)" onPress={() => {this.props.navigation.navigate('FooDrawerOpen')}}>
              <Ionicons style={[styles.msgIcon, this.state.isPressed ? styles.testing : {}]} name="message-square" size={22} color="#bccad0"/>
            </TouchableHighlight>

            <View style={styles.notificationDot} />

          </View>
        </View>
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          renderIcon={this._renderIcon}
          style={styles.tabbar}
        />
      </View>
    );
    /*<CustomModal onRef={ref => this.child = ref}/>*/
  };

  _renderScene = ({ route }) => {
    return (
      <SimplePage
        state           = {this.state}
        style           = {{ backgroundColor: 'white' }}
        type            = {this.state.type}
        updateIndex     = {this.updateIndex.bind(this)}
        patient         = {this.state.defaultView}
        patientView     = {this.updatePatientView.bind(this)}

      />
    );
  };

  onMenuItemSelected = item => {
    this.setState({
      selectedItem: item,
    });
  };

  _onHideUnderlay = () => {
    this.setState({ isPressed: false });
  };

  _onShowUnderlay = () => {
    this.setState({ isPressed: true });

  };

  render() {

    return (
        <TabViewAnimated
        style={[styles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
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
    borderRadius: 100/2,
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
