import React, { Component, PureComponent } from 'react'
import {ScrollView, Text, Image, View, TouchableOpacity} from 'react-native'
import { Images } from '../Themes'
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Feather';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import type { NavigationState } from 'react-native-tab-view/types';
import SimplePage from './SimplePage';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
const image = require('../Images/launch-icon.png');

/*
* ======= Firebase Initialisation ======
* */
import firebase from 'react-native-firebase';

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

    this.toggle = this.toggle.bind(this);

    this.state = {
      index: 0,
      routes: [{ key: '1', icon: 'activity' }, { key: '2', icon: 'airplay' },],
      isOpen: false,
      selectedItem: 'About',
      data: []
    };

    this.personsRef = firebase.app().database().ref().child('Persons');
    this.listenForPersons = this.listenForPersons.bind(this);

  }

  componentDidMount = () => {
    this.listenForPersons(this.personsRef);
  };

  listenForPersons = (personsRef) => {
    console.log("here so far");
    personsRef.on('value', (snap) => {
      var persons = [];
      snap.forEach(child => {
        persons.push({
          name: child.val().name,
          _key: child.key
        })
      });

      console.log(persons);

      this.setState({
        data: persons
      });

    });
  };


  _handleIndexChange = index => { this.setState({ index }); };

  _renderIcon = ({ route }) => { return <Ionicons name={route.icon} size={24} color="#98a0ab" />; };

  _renderHeader = props => {
    return (
      <View>
        <View style={styles.headerContainer}>
          <Ionicons name="menu" size={24} color="white" style={{position: 'absolute', left: 20}} />
          <Text style={styles.headerText}>Heart Monitor</Text>
        </View>
        <View style={{width: '100%'}}>
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            renderIcon={this._renderIcon}
            style={styles.tabbar}
          />
        </View>
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

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} isOpen={this.state.isOpen} />;

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
        openMenuOffset={200}
      >

        <TabViewAnimated
          style={[styles.container, this.props.style]}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
        />
        <TouchableOpacity
          onPress={this.toggle}
          style={styles.button}
        >
        </TouchableOpacity>
      </SideMenu>
    );


/*    return (

      <TabViewAnimated
        style={[styles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />

    );*/
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%'
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
    width: '100%',
    height: 50,
    backgroundColor: '#ff6969',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    position: 'absolute',
    top: 10,
    padding: 10,
  }
})
