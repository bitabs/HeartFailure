import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight} from "react-native";
import PatientBox from "./PatientBox";
import User from '../Components/User';

import PropTypes from 'prop-types';
import Database from '../Components/Database'

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
    User().then(user => {
      this.userRef.on('value', (snap) => {
        this.type = snap.val()[user.uid].type;
        if (snap.val() && user) this.initialiseDashboard(
          snap.val()[user.uid].type === "Patient" ? this.userRef : this.dashboardRef
        );
      })
    });
  }


  initialiseDashboard = (ref) => {
    ref.on('value', (snap) => {
      if (snap.val()) {
        User().then(user => {
          if (this.type === "Doctor") {
            this.setState({
              Users: snap.val()[user.uid]
            }, () => this.props.userView({uid: Object.keys(this.state.Users)[0], ...Object.values(this.state.Users)[0]}));
          } else {
            const doctors = snap.val()[user.uid].Doctors;
            doctors ? Object.keys(doctors).map((uid, i) => {
              if (snap.val()) this.setState(prevState => ({
                Users: {...prevState.Users, [uid]: snap.val()[uid]}
              }), () => {
                if (i === 0) this.props.userView({uid: uid, ...snap.val()[uid]});
              });
            }): null
          }
        });
      }
    })

    // User().then(user => {
    //   ref.on('value', (snap) => {
    //     if (snap.val()) {
    //       const {type} = user;
    //       if (type === "Doctor") {
    //         this.setState({
    //           Users: snap.val()[user.uid]
    //         });
    //       } else {
    //         const doctors = snap.val()[user.uid].Doctors;
    //         Object.keys(doctors).map((uid,i) => {
    //           if (snap.val()) this.setState(prevState => ({
    //             Users: {...prevState.Users, [uid]: snap.val()[uid]}
    //           }), () => {
    //             if (i === 0) this.props.userView({uid: uid, ...snap.val()[uid]});
    //           });
    //         })
    //       }
    //     }
    //   })
    // })
  };

  render() {
    const users = this.state.Users;
    let _UserBox = users ? Object.keys(users).map((uid, i) => {
      const user = users[uid];
      return (<UserBox
        uid={uid}
        type={this.props.type}
        User={user}
        updateIndex={this.props.updateIndex}
        userView={this.props.userView}
        key={i}/>
      )
    }): null;

    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {_UserBox}
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
