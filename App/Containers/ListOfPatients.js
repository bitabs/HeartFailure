import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet, Image} from "react-native";
import PatientBox from "./PatientBox";
import User from '../Components/User';
import PropTypes from 'prop-types';

var _ = require('lodash');
import firebase from 'react-native-firebase';

export default class ListOfPatients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Patients: null,
    };
    this.$ref = firebase.app().database().ref('/Dashboard');
    this.initialiseDashboard = this.initialiseDashboard.bind(this);
  }

  componentWillMount() {
    this.initialiseDashboard(this.$ref)
  }

  initialiseDashboard = ($ref) => {
    $ref.on('value', (snap) => {
      if (snap.val()) {
        User().then(user => {
          this.setState({
            Patients: snap.val()[user.uid]
          });
        })
      }
    })
  };

  render() {
    const patients = this.state.Patients;
    let $PatientsBox = patients ? (
      Object.keys(patients).map((uid, i) => {
        const patient = patients[uid];
        return (<PatientBox uid={uid} Patient={patient} key={i}/>)
      })
    ) : null;

    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>{$PatientsBox}</ScrollView>
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

ListOfPatients.propTypes = {};
