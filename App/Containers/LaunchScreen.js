import React, { Component, PureComponent } from 'react'
import {ScrollView, Modal, Text, Image, View, TouchableOpacity, TouchableHighlight} from 'react-native'
import { Images } from '../Themes'
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Feather';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import type { NavigationState } from 'react-native-tab-view/types';
import SimplePage from './SimplePage';
const image = require('../Images/launch-icon.png');

/*
* ======= Firebase Initialisation ======
* */
import firebase from 'react-native-firebase';
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
      routes: [{ key: '1', icon: 'activity' }, { key: '2', icon: 'airplay' },],
      selectedItem: 'About',
      data: [],
      isPressed: false,
      modalVisible: false
    };

    this.personsRef = firebase.app().database().ref().child('Persons');
    this.listenForPersons = this.listenForPersons.bind(this);

  }

  componentDidMount = () => {
    this.listenForPersons(this.personsRef);
  };

  listenForPersons = (personsRef) => {
    personsRef.on('value', (snap) => {
      var persons = [];
      snap.forEach(child => {
        persons.push({
          name: child.val().name,
          _key: child.key
        })
      });

      this.setState({
        data: persons
      });

    });
  };


  _handleIndexChange = index => { this.setState({ index }); };

  _renderIcon = ({ route }) => { return <Ionicons name={route.icon} size={24} color="#bccad0" />; };

  openModel = () => {
    this.child.toggleModal();
  };

  _renderHeader = props => {
    return (
      <View>
        <View style={styles.headerContainer}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('DrawerToggle')}
            activeOpacity={1.0}
            underlayColor="rgba(253,138,94,0)"
          >
            <Ionicons style={{padding: 8}} name="menu" size={22} color="#bccad0"/>
          </TouchableHighlight>


          <TouchableHighlight
            activeOpacity={1}
            underlayColor="rgba(253,138,94,0)"
            onHideUnderlay={this._onHideUnderlay.bind(this)}
            onShowUnderlay={this._onShowUnderlay.bind(this)}
            onPress={() => this.openModel()}
          >
            <Ionicons style={[styles.msgIcon, this.state.isPressed ? styles.testing : {}]} name="message-square" size={22} color="#bccad0"/>
          </TouchableHighlight>
        </View>
        <View style={{width: '100%'}}>
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            renderIcon={this._renderIcon}
            style={styles.tabbar}
          />
        </View>
        <CustomModal onRef={ref => this.child = ref}/>
      </View>
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return (
          <SimplePage
            state={this.state}
            data={this.state.data}
            style={{ backgroundColor: 'white' }}
          />
        );
      case '2':
        return (
          <SimplePage
            state={this.state}
            data={this.state.data}
            style={{ backgroundColor: 'white' }}
          />
        );
      default:
        return null;
    }
  };

  onMenuItemSelected = item =>
    this.setState({
      selectedItem: item,
    });

  _onHideUnderlay() {
    this.setState({ isPressed: false });
  }
  _onShowUnderlay() {
    this.setState({ isPressed: true });
  }

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
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F5FCFF',
  },
  tabbar: {
    backgroundColor: 'white',
    paddingTop: 10,
    elevation: 0,
  },
  indicator: {
    backgroundColor: 'rgba(152, 168, 171, 0)',
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
})
