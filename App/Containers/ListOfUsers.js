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

    this.initialiseDashboard = this.initialiseDashboard.bind(this);
    this.userRef      = firebase.app().database().ref('/Users');
    this.dashboardRef = firebase.app().database().ref('/Dashboard');
  }

  componentDidMount() {
    this.initialiseDashboard(this.userRef, this.dashboardRef);
    // User().then(user => {
    //   this.userRef.on('value', (snap) => {
    //     if (snap.val()) this.setState(prevState => ({
    //       Users: {...prevState.Users, ...snap.val()[user.uid]}
    //     }), () => console.log(this.state.Users))
    //   });
    //
    //   this.dashboardRef.on('value', (snap) => {
    //     if (snap.val() && this.state.Users) {
    //       const { Patients } = this.state.Users;
    //       Patients ? Object.keys(Patients).map((uid) => {
    //         const patient = Patients[uid];
    //         this.setState(prevState => ({
    //           Users: {...prevState.Users, Patients: {...prevState.Users.Patients, [uid]: {...patient, ...snap.val()[user.uid][uid]}}}
    //         }), () => console.log(this.state.Users))
    //       }): null
    //     }
    //   })
    // });
  }


  initialiseDashboard = (userRef, dashboardRef) => {
    User().then(user => {
      const { type, userView } = this.props;

      if (type === "Patient") userRef.on('value', (snap) => {
        if (snap.val()) {
          const { Doctors = null } = snap.val()[user.uid] || null;

          Doctors ? Object.keys(Doctors).map((uid, i) => {
            this.setState(prevState => ({
              Users: {...prevState.Users, [uid]: snap.val()[uid]}
            }), () => {
              if (i === 0) userView({
                uid: uid, ...snap.val()[uid]
              });
            });
          }) : null;
        }
      });

      if (type === "Doctor") dashboardRef.child(user.uid).on('value', (snap) => {
        if (snap.val()) this.setState({Users: snap.val()}, () => userView({
          uid: Object.keys(this.state.Users)[0], ...Object.values(this.state.Users)[0]
        }))
      })
    });
  };

  render() {
    const { Users = null } = this.state;
    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Users ? Object.keys(Users).map((uid, i) => {
            const user = Users[uid];
            return (
              <UserBox
                uid={uid}
                type={this.props.type}
                User={user}
                updateIndex={this.props.updateIndex}
                userView={this.props.userView}
                key={i}
              />
            )
          }): null}
        </ScrollView>
      </View>
    );
  }
}

/**
 *  <UserBox
 uid={uid}
 type={this.props.type}
 User={user}
 updateIndex={this.props.updateIndex}
 userView={this.props.userView}
 key={i}
 />
 */

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
