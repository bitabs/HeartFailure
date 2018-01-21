import React, { Component } from 'react'
import * as NavigationActions from "react-navigation";
import {Image, Modal, ScrollView, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Feather";

class customSideMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }

  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render () {

    return (
      <View style={styles.sideMenuContainer}>
        <ScrollView>
          <View style={styles.profileBlock}>

            <TouchableOpacity
              onPress={() => this.openModal()}
              onRequestClose={() => this.closeModal()}
            >
              <Image style={styles.userImg} source={require('../Images/profile.jpg')} resizeMode="contain"/>
            </TouchableOpacity>

            <Text style={[styles.verticalCenter, styles.userName]}>Naseebullah</Text>


            <TouchableHighlight
              style={[styles.verticalCenter, styles.floatRight]}
              activeOpacity={1.0}
              underlayColor="rgba(253,138,94,0)"
              onPress={() => this.openModal()}
            >
              <Ionicons name="log-out" size={16} color="#bccad0"/>
            </TouchableHighlight>

            <Modal
              visible={this.state.modalVisible}
              animationType={'fade'}
              transparent={true}
              onRequestClose={() => this.closeModal()}
            >
              <View style={styles.modalContainer}>
                <View style={styles.innerContainer}>
                  <TouchableHighlight activeOpacity={1.0} underlayColor="rgba(253,138,94,0)">
                    <Ionicons name="x" size={22} color="#bccad0"/>
                  </TouchableHighlight>
                  <Text>This is content inside of modal component</Text>
                </View>
              </View>
            </Modal>

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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  innerContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    height: 300,
    justifyContent: 'flex-start',
    padding: 20,
    width: 350,
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

customSideMenu.propTypes = {
  navigation: PropTypes.object
};

export default customSideMenu;
