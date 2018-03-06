import React, { Component } from 'react'
import {NavigationActions} from "react-navigation";
import {Image, ScrollView, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Feather";
import CustomModal from "./CustomModal";
import firebase from 'react-native-firebase';

import User from "./User";
import {Images} from '../Containers/PreLoadImages';


class CustomSideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      uid: null
    };
  }

  componentDidMount() {
    User().then(user => {
      firebase.app().database().ref(`/Users/${user.uid}`).on('value', (snap) => {
        if (snap.val()) this.setState({uid: user.uid, user: snap.val() });
      });
    });
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  openModel = () => {
    this.child.toggleModal() // do stuff
  };

  signOutUser = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  render () {

    let userType = this.state.user ? (
      <View>
        {
          this.state.user.type === "Patient" ? (
            <View>
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
            </View>

          ): null
        }
      </View>
    ): null;

    let profPic = this.state.uid ? (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
        <Image style={styles.userImg} source={Images[this.state.uid]} resizeMode="contain"/>
      </TouchableOpacity>
    ): null;

    let name = this.state.user ? (
      <Text style={[styles.verticalCenter, styles.userName]}>{this.state.user.name}</Text>
    ): null;

    return (
      <View style={styles.sideMenuContainer}>
        <ScrollView>
          <View style={styles.profileBlock}>

            {profPic}

            {name}

            <TouchableHighlight
              style={[styles.verticalCenter, styles.floatRight]}
              activeOpacity={1.0}
              underlayColor="rgba(253,138,94,0)"
              onPress={() => this.signOutUser()}
            >
              <Ionicons name="log-out" size={16} color="#bccad0"/>
            </TouchableHighlight>
            <CustomModal onRef={ref => this.child = ref}/>
          </View>

          <View style={styles.linkStack}>
            <View style={styles.link}>
              <TouchableHighlight
                onPress={() => this.props.navigation.navigate('Home')}
                style={styles.linkIcon} activeOpacity={1.0} underlayColor="rgba(253,138,94,0)">
                <Ionicons name="home" size={22} color="#bccad0"/>
              </TouchableHighlight>
            </View>

            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Home')}
              style={styles.linkIcon} activeOpacity={1.0} underlayColor="rgba(253,138,94,0)">
              <Text style={styles.linkFontColour}>Home</Text>
            </TouchableHighlight>
          </View>


          {
            this.state.user ? (
              <View>
                { this.state.user.type === "Patient" ? (
                  <View style={styles.linkStack}>
                    <View style={styles.link}>
                      <TouchableHighlight
                        onPress={() => this.props.navigation.navigate('DoctorsScreen')}
                        style={styles.linkIcon} activeOpacity={1.0} underlayColor="rgba(253,138,94,0)">
                        <Ionicons name="user" size={22} color="#bccad0"/>
                      </TouchableHighlight>
                    </View>

                    <Text style={styles.linkFontColour}>Search</Text>
                  </View>
                ): null}

              </View>
            ): null
          }

        </ScrollView>
      </View>
    );
  }
}


/*
                    <View style={styles.linkStack}>
                      <View style={styles.link}>
                        <TouchableHighlight
                          onPress={() => this.props.navigation.navigate('MyDoctors')}
                          style={styles.linkIcon} activeOpacity={1.0} underlayColor="rgba(253,138,94,0)">
                          <Ionicons name="user" size={22} color="#bccad0"/>
                        </TouchableHighlight>
                      </View>
                      <Text style={styles.linkFontColour}>{this.state.user.type === "Patient" ? "My Doctors" : ""}</Text>
                    </View>
 */

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
