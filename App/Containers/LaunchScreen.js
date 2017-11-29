import React, { Component, PureComponent } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'

import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Feather';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import type { NavigationState } from 'react-native-tab-view/types';

import SimplePage from './SimplePage';

type Route = {
  key: string,
  icon: string,
};

type State = NavigationState<Route>;

export default class LaunchScreen extends PureComponent<*, State> {
  static title = 'Icon only top bar';
  static appbarElevation = 0;

  state = {
    index: 0,
    routes: [
      { key: '1', icon: 'activity' },
      { key: '2', icon: 'airplay' },
    ],
  };

  _handleIndexChange = index => {
    this.setState({
      index,
    });
  };

  _renderIcon = ({ route }) => {
    return <Ionicons name={route.icon} size={24} color="#98a0ab" />;
  };

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
            style={{ backgroundColor: 'white' }}
          />
        );
      case '2':
        return (
          <SimplePage
            state={this.state}
            style={{ backgroundColor: 'white' }}
          />
        );
      default:
        return null;
    }
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
    flex: 1,
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
  }
})
