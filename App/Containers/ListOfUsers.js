import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet, TouchableOpacity} from "react-native";
import PropTypes from 'prop-types';
import _ from 'lodash';
import firebase from 'react-native-firebase';
import Feather from "react-native-vector-icons/Feather";
import UserBox from "./UserBox";
import Database from '../Components/Database';
import User from '../Components/User';

export default class ListOfUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Users: null,
      authUserUID: null,
      authUserType: null,
      switchViews: false,
      filteredUsers: null,
      iWantThisUsers: this.props.authUserType  === "Doctor" ? "Patient" : "Doctor"
    };
    this.userRef = firebase.app().database().ref(`/Users/`);
    this.dashRef = firebase.app().database().ref(`/Dashboard/`);
    this.initialiseDashboard = this.initialiseDashboard.bind(this);
    this.fetchUsersFromNetwork = this.fetchUsersFromNetwork.bind(this);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;

    User().then(authUser => {
      this.userRef.on('value', snap => {
        if (snap.val() && this._isMounted) {
          this.setState({
            authUserUID: authUser.uid,
            authUserType: snap.val()[authUser.uid].type,
          }, () => {
            const {authUserUID, authUserType} = this.state;
            this.initialiseDashboard(authUserUID, authUserType, snap.val(), this.dashRef, this.props.userView);
          });

          this.userRef.endAt().limitToLast().child(`${this.state.authUserUID}/Patients`).on('child_added', childSnap =>
            this.state.authUserType === "Doctor" ? Database.updateDashBoard(this.state.authUserUID, childSnap.key, snap.val()[childSnap.key]) : null
          );

          this.userRef.endAt().limitToLast().child(`${this.state.authUserUID}/Doctors` ).on('child_added', childSnap =>
            this.state.authUserType === "Patient" ?Database.updateDashBoard(childSnap.key, this.state.authUserUID, snap.val()[this.state.authUserUID]) : null
          );

          const isDoctor = this.state.authUserType === "Doctor";

          if (isDoctor)
            this.fetchUsersFromNetwork(snap.val(), "Patient");
          else
            this.fetchUsersFromNetwork(snap.val(), "Doctor");
        }
      })
    });
  }

  fetchUsersFromNetwork = (data, attribute) => {
    const attributes = `${attribute}s`;
    if (this._isMounted) {
      this.setState({
        filteredUsers: JSON.parse(JSON.stringify(data), (k, v) => !v.type || (
          v.type === attribute && (_.has(data[this.state.authUserUID], attributes) ? !_.has(data[this.state.authUserUID][attributes], k) : true )
        ) ? v : void 0)
      });
    }
  };

  initialiseDashboard = (authUserUID, authUserType, userSnapData, dashRef, userView) => {
    const isPatient = authUserType === "Patient";

    if (isPatient && this._isMounted) {
      const {Doctors = null} = userSnapData && userSnapData[authUserUID];
      Doctors ? Object.keys(Doctors).map((uid, i) => {
        this.setState(prevState => ({
          Users: {...prevState.Users, [uid]: userSnapData[uid]}
        }), () => {
          if (i === 0) userView({uid: uid, ...userSnapData[uid]});
        });
      }) : null;
    }

    if (!isPatient && this._isMounted) {
      this.setState({
        Users: JSON.parse(JSON.stringify(userSnapData), (k, v) => !v.type || (
          v.type === "Patient" && (_.has(userSnapData[this.state.authUserUID], `Patients`) ? _.has(userSnapData[this.state.authUserUID][`Patients`], k) : true )
        ) ? v : void 0)
      }, () => userView({uid: Object.keys(this.state.Users)[0], ...Object.values(this.state.Users)[0]}))
    }
  };

  switchToggle = value => this._isMounted ? this.setState({switchViews: value}) : null;

  render() {
    const {Users = null, switchViews, filteredUsers, authUserType, authUserUID} = this.state, {updateIndex, userView} = this.props;
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
                    opositeTable={isDoctor ? "Patients" : "Doctors"}
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

const styles = StyleSheet.create({
  page: {
    flex: 1,
    position: 'relative',
    flexDirection: 'column',
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
