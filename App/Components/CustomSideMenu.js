import React, { Component } from 'react'
import * as NavigationActions from "react-navigation";
import {Image, ScrollView, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Feather";
import CustomModal from "./CustomModal";


class CustomSideMenu extends Component {

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  openModel = () => {
    this.child.toggleModal() // do stuff
  };

  render () {

    return (
      <View style={styles.sideMenuContainer}>
        <ScrollView>
          <View style={styles.profileBlock}>

            <TouchableOpacity onPress={() => this.openModel()}>
              <Image style={styles.userImg} source={require('../Images/profile.jpg')} resizeMode="contain"/>
            </TouchableOpacity>

            <Text style={[styles.verticalCenter, styles.userName]}>Naseebullah</Text>

            <TouchableHighlight
              style={[styles.verticalCenter, styles.floatRight]}
              activeOpacity={1.0}
              underlayColor="rgba(253,138,94,0)"
              onPress={() => this.openModel()}
            >
              <Ionicons name="log-out" size={16} color="#bccad0"/>
            </TouchableHighlight>
            <CustomModal onRef={ref => this.child = ref}/>
          </View>

          <View style={styles.linkStack}>
            <View style={styles.link}>
              <TouchableHighlight style={styles.linkIcon} activeOpacity={1.0} underlayColor="rgba(253,138,94,0)">
                <Ionicons name="home" size={22} color="#bccad0"/>
              </TouchableHighlight>
            </View>

            <Text style={styles.linkFontColour}>Home</Text>

          </View>

          <View style={styles.linkStack}>
            <View style={styles.link}>
              <TouchableHighlight style={styles.linkIcon} activeOpacity={1.0} underlayColor="rgba(253,138,94,0)">
                <Ionicons name="bar-chart-2" size={22} color="#bccad0"/>
              </TouchableHighlight>
            </View>

            <Text style={styles.linkFontColour}>View History</Text>

          </View>

          <View style={styles.linkStack}>
            <View style={styles.link}>
              <TouchableHighlight style={styles.linkIcon} activeOpacity={1.0} underlayColor="rgba(253,138,94,0)">
                <Ionicons name="activity" size={22} color="#bccad0"/>
              </TouchableHighlight>
            </View>

            <Text style={styles.linkFontColour}>ECG & Heart Sound</Text>

          </View>

          <View style={styles.linkStack}>
            <View style={styles.link}>
              <TouchableHighlight style={styles.linkIcon} activeOpacity={1.0} underlayColor="rgba(253,138,94,0)">
                <Ionicons name="user" size={22} color="#bccad0"/>
              </TouchableHighlight>
            </View>

            <Text style={styles.linkFontColour}>My Doctor</Text>

          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
  },
  sideMenuContainer: {
    flex: 1,
    paddingTop: 40,
    padding: 20
  },
  profileBlock: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40
  },
  userImg: {
    borderRadius: 300,
    height: 50,
    width: 50,
  },
  userName: {
    alignItems: 'center',
    color: '#959bad',
    flex: 2,
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 15
  },
  verticalCenter: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  floatRight: {
    alignItems: 'flex-end',
  },
  linkStack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 30
  },
  linkIcon : {
    alignItems: 'flex-start',
    paddingLeft: 12.5,
    paddingRight: 27.5,
  },
  linkFontColour: {
    color: "#c2c9d0",
    fontSize: 16
  }
});

CustomSideMenu.propTypes = {
  navigation: PropTypes.object
};

export default CustomSideMenu;
