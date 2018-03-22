import React, {Component, PureComponent} from 'react';
import {View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight} from "react-native";
import PropTypes from 'prop-types';
import _ from 'lodash';
import firebase from 'react-native-firebase';
import Feather from "react-native-vector-icons/Feather";
import UserBox from "./UserBox";
import Database from '../Components/Database';

export default class ListOfUsers extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      Users: null,
      switchViews: false,
      filteredUsers: null,
      iWantThisUsers: this.props.authUserType  === "Doctor" ? "Patient" : "Doctor"
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

  initialiseDashboard = (authUserUID, authUserType, userRef, dashRef, userView) => {
    const {iWantThisUsers} = this.state;

    userRef.on('value', async snap => {

      if (await this._isMounted && snap.val()) await this.setState({
        filteredUsers: JSON.parse(JSON.stringify(snap.val()), (k, v) => !v.type || (
          v.type === iWantThisUsers && (_.has(snap.val()[authUserUID], `${iWantThisUsers}s`) ? !_.has(snap.val()[authUserUID][`${iWantThisUsers}s`], k) : true )
        ) ? v : void 0)
      });


      if (authUserType === "Patient") {
        const {Doctors = null} = snap.val() && snap.val()[authUserUID];
        Doctors ? Object.keys(Doctors).map((uid, i) => {
          if (this._isMounted) {
            this.setState(prevState => ({Users: {...prevState.Users, [uid]: snap.val()[uid]}}), () => {
              if (i === 0) userView({uid: uid, ...snap.val()[uid]});
            });
          }
        }) : null;
      }

      if (authUserType === "Doctor") {
        dashRef.child(authUserUID).on('value', async snap => {
          if (snap.val() && this._isMounted) {
            await this.setState({Users: snap.val()}, () => userView({uid: Object.keys(this.state.Users)[0], ...Object.values(this.state.Users)[0]}))
          }
        });
      }

      userRef.endAt().limitToLast().child(`${authUserUID}/Patients`).on('child_added', childSnap =>
        authUserType === "Doctor" ? Database.updateDashBoard(authUserUID, childSnap.key, snap.val()[childSnap.key]) : null
      );

      userRef.endAt().limitToLast().child(`${authUserUID}/Doctors` ).on('child_added', childSnap =>
        authUserType === "Patient" ?Database.updateDashBoard(childSnap.key, authUserUID, snap.val()[authUserUID]) : null
      );

    });
  };

  switchToggle = value => this._isMounted ? this.setState({switchViews: value}) : null;

  render() {
    const {Users = null, switchViews, filteredUsers} = this.state, {authUserType, authUserUID, updateIndex, userView} = this.props;
    const isDoctor = authUserType === "Doctor";
    return (
      <View style={styles.page}>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
          {(Users && !switchViews) ? (
            <View>
              <Text style={styles.pageTitle}>{isDoctor ? "My Patients" : "My Doctors"}</Text>
              {Object.keys(Users).map((uid, i) => {
                const user = Users[uid];
                return (
                  <UserBox
                    uid={uid}
                    authUserUID={authUserUID}
                    opositeTable={null}
                    type={authUserType}
                    User={user}
                    toFollow={false}
                    updateIndex={updateIndex}
                    userView={userView}
                    key={uid}
                  />
                )
              })}
            </View>
          ) : filteredUsers && switchViews ? (
            <View>
              <Text style={styles.pageTitle}>{isDoctor ? "Patients" : "Doctors"}</Text>
              {Object.keys(filteredUsers).map((uid, i) => {
                const filteredUser = filteredUsers[uid];
                return (
                  <UserBox
                    uid={uid}
                    authUserUID={authUserUID}
                    opositeTable={this.state.iWantThisUsers}
                    type={authUserType}
                    User={filteredUser}
                    toFollow={true}
                    updateIndex={updateIndex}
                    userView={userView}
                    key={uid}
                  />
                )
              })}
            </View>
          ) : !Users ? (
            <View style={[styles.page, {
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 30
            }]}>
              <Feather name="activity" size={33} color="#8F9CAE"/>
            </View>
          ) : null}
        </ScrollView>

        <TouchableOpacity style={styles.stickyBtn} activeOpacity={1} onPress={() => this.switchToggle(!switchViews)}>
          <Feather name={"search"} size={20} color={"white"}/>
        </TouchableOpacity>
      </View>
    );
  }
}

/*


              <Text style={{fontSize: 40, color: '#aab8be', textAlign: 'center', fontWeight: 'bold'}}>Oh Shoot!</Text>
              <View style={{marginTop: 10, marginBottom: 10, width: 20, height: 3, backgroundColor: 'rgba(188,202,208, 0.15)'}}/>
              <Text style={{paddingTop: 0,padding: 20, fontSize: 14, color: '#d2d6d9', textAlign: 'center'}}>
                We're sorry, but something went wrong. Don't worry, it's not your fault. Please refresh this page and try
                again
              </Text>
* */

const styles = StyleSheet.create({
  page: {
    flex: 1,
    position: 'relative',
    flexDirection: 'column',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    backgroundColor: '#fafafa'
  },
  pageTitle: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 30,
    color: '#909aae',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  stickyBtn: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 30,
    padding: 20,
    backgroundColor: '#1bb3f3',
    borderRadius: 300,
    elevation: 3,
  },
});

ListOfUsers.propTypes = {
  updateIndex: PropTypes.func.isRequired
};
