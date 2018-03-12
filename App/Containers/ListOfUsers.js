import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight} from "react-native";
import User from '../Components/User';
import PropTypes from 'prop-types';

var _ = require('lodash');
import firebase from 'react-native-firebase';
import UserBox from "./UserBox";

export default class ListOfUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Users: null,
    };
    this.userRef = firebase.app().database().ref(`/Users/`);
    this.dashRef = firebase.app().database().ref(`/Dashboard/`);
    this.initialiseDashboard = this.initialiseDashboard.bind(this);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    const {authUserType, authUserUID, userView} = this.props;

    this.initialiseDashboard(authUserUID, authUserType, this.userRef, this.dashRef, userView);
  }


  fetchDashBoard = async (dashRef, authUserUID) => new Promise((resolve, reject) => {
    dashRef.child(authUserUID).on('value', snap => snap.val() ? resolve(snap.val()) : reject())
  });


  initialiseDashboard = (authUserUID, authUserType, userRef, dashRef, userView) => {
    if (authUserType === "Patient") userRef.on('value', snap => {
      const {Doctors = null} = snap.val() && snap.val()[authUserUID];
      Doctors ? Object.keys(Doctors).map((uid, i) => {
        if (this._isMounted) {
          this.setState(prevState => ({Users: {...prevState.Users, [uid]: snap.val()[uid]}}), () => {
            if (i === 0) userView({uid: uid, ...snap.val()[uid]});
          });
        }
      }) : null;
    });

    if (authUserType === "Doctor") {
      dashRef.child(authUserUID).on('value', snap => {
        if (snap.val() && this._isMounted) {
          this.setState({Users: snap.val()}, () => userView({uid: Object.keys(this.state.Users)[0], ...Object.values(this.state.Users)[0]}))
        }
      })
    }
  };

  render() {
    const {Users = null} = this.state, {authUserType, authUserUID, updateIndex, userView} = this.props;

    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Users ? Object.keys(Users).map((uid, i) => {
            const user = Users[uid];
            return (
              <UserBox
                uid={uid}
                authUserUID={authUserUID}
                type={authUserType}
                User={user}
                updateIndex={updateIndex}
                userView={userView}
                key={uid}
              />
            )
          }) : null}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fafafa'
  }
});

ListOfUsers.propTypes = {
  updateIndex: PropTypes.func.isRequired
};
