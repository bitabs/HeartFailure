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
  }

  componentDidMount() {
    const {uid, type, userRef, dashRef, userView} = this.props;
    this.initialiseDashboard(uid, type, userRef, dashRef, userView);
  }


  initialiseDashboard = (uid, type, userRef, dashRef, userView) => {
    if (type === "Patient") userRef.on('value', snap => {
      const { Doctors = null } = snap.val()[uid];
      Doctors ? Object.keys(Doctors).map((uid, i) => {
        this.setState(prevState => ({
          Users: {...prevState.Users, [uid]: snap.val()[uid]}
        }), () => {
          if (i === 0) userView({
            uid: uid, ...snap.val()[uid]
          });
        });
      }) : null;

    });

    if (type === "Doctor") dashRef.child(uid).on('value', snap => {
      if (snap.val()) this.setState({Users: snap.val()}, () => userView({
        uid: Object.keys(this.state.Users)[0], ...Object.values(this.state.Users)[0]
      }))
    })



    // User().then(user => {
    //   const { type, userView } = this.props;
    //
    //   if (type === "Patient") userRef.on('value', (snap) => {
    //     if (snap.val()) {
    //       const { Doctors = null } = snap.val()[user.uid] || null;
    //
    //       Doctors ? Object.keys(Doctors).map((uid, i) => {
    //         this.setState(prevState => ({
    //           Users: {...prevState.Users, [uid]: snap.val()[uid]}
    //         }), () => {
    //           if (i === 0) userView({
    //             uid: uid, ...snap.val()[uid]
    //           });
    //         });
    //       }) : null;
    //     }
    //   });
    //
    //   if (type === "Doctor") dashboardRef.child(user.uid).on('value', (snap) => {
    //     if (snap.val()) this.setState({Users: snap.val()}, () => userView({
    //       uid: Object.keys(this.state.Users)[0], ...Object.values(this.state.Users)[0]
    //     }))
    //   })
    // });
  };

  render() {
    const { Users = null } = this.state;
    const {uid, type, userRef, dashRef, userView, updateIndex, loggedInUser, PCRef, DCRef, healthRef, CurrentUserUID} = this.props;

    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Users ? Object.keys(Users).map((uid, i) => {
            const user = Users[uid];
            return (
              <UserBox
                uid={uid}
                CurrentUserUID={CurrentUserUID}
                type={type}
                User={user}
                PCRef = {PCRef}
                DCRef = {DCRef}
                healthRef={healthRef}
                loggedInUser={loggedInUser}
                updateIndex={updateIndex}
                userView={userView}
                key={i}
              />
            )
          }): null}
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
