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
            this.initialiseDashboard(authUserUID, authUserType, snap.val(), snap.val()[authUserUID], this.props.userView);
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

  initialiseDashboard = (authUserUID, authUserType, snapVal, currentUser, userView) => {
    const isPatient = authUserType === "Patient";

    if (isPatient && this._isMounted) {
      const doctors = _.has(currentUser, `Doctors`);
      if (doctors) {
        this.setState({
          Users: Object.assign({}, ...Object.entries(currentUser['Doctors']).map( uid => ({ [uid[0]]: snapVal[uid[0]] }) ))
        }, () => userView({uid: Object.keys(this.state.Users)[0], ...Object.values(this.state.Users)[0]}))
      }
    }

    if (!isPatient && this._isMounted) {
      const patients = _.has(currentUser, `Patients`);
      if (patients) {
        this.setState({
          Users: Object.assign({}, ...Object.entries(currentUser['Patients']).map( uid => ({ [uid[0]]: snapVal[uid[0]] }) ))
        },() => {
          userView({uid: Object.keys(this.state.Users)[0], ...Object.values(this.state.Users)[0]})
        });
      }
    }
  };

  switchToggle = value => this._isMounted ? this.setState({switchViews: value}) : null;

  render() {
    const {Users = null, switchViews, filteredUsers, authUserType, authUserUID} = this.state, {updateIndex, userView} = this.props;
    const isDoctor = authUserType === "Doctor";
    return (
      <View style={styles.page}>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
          {Users ? (
            <View style={{height: switchViews ? 0 : null }}>
              {Object.keys(Users).map(uid => {
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
          ): !Users ? (
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

          {switchViews ? (
            <View style={{position: 'absolute', backgroundColor: 'white', top:0,left: 0, right:0, overflow: 'hidden'}}>
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
          ) : null}
        </ScrollView>

        <TouchableOpacity style={styles.stickyBtn} activeOpacity={1} onPress={() => {
          this.switchToggle(!switchViews);
          this.props.activeTitle(isDoctor ? (!switchViews ? "Patients" : "My Patients") : switchViews ? "My Doctors" : "Doctors")
        }}>
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
