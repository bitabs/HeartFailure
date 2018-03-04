import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight} from "react-native";
import PatientBox from "./PatientBox";
import User from '../Components/User';

import PropTypes from 'prop-types';
import Database from '../Components/Database'

var _ = require('lodash');
import firebase from 'react-native-firebase';
import DoctorBox from "./DoctorBox";

export default class ListOfDoctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Doctors: null,
    };
    this.$ref = firebase.app().database().ref('/Users');
    this.initialiseDashboard = this.initialiseDashboard.bind(this);
  }

  componentDidMount() {
    this.initialiseDashboard(this.$ref)
  }

  initialiseDashboard = ($ref) => {
    $ref.on('value', (snap) => {
      if (snap.val()) {
        User().then(user => {
          const doctors = snap.val()[user.uid].Doctors;

          Object.keys(doctors).map(uid => {
            if (snap.val()) this.setState(prevState => ({
              Doctors: {...prevState.Doctors, [uid]: snap.val()[uid]}
            }));
          })

        })
      }
    })
  };

  render() {
    //console.log(this.state.Doctors);

    const doctors = this.state.Doctors;
    //console.log(doctors);
    let $DoctorBox = doctors ? (
      Object.keys(doctors).map((uid, i) => {
        const doctor = doctors[uid];
        return (
          <DoctorBox uid={uid} Doctor={doctor} updateIndex={this.props.updateIndex} doctorView={this.props.doctorView} key={i}/>
        )
      })
    ) : null;
    // let $PatientsBox = patients ? (
    //   Object.keys(patients).map((uid, i) => {
    //     const patient = patients[uid];
    //     return (
    //       <TouchableHighlight
    //         activeOpacity={1.0}
    //         underlayColor="rgba(253,138,94,0)"
    //         onPress={() => this.update({uid,...patient})}
    //         key={i}
    //       >
    //         <PatientBox uid={uid} Patient={patient} key={i}/>
    //       </TouchableHighlight>
    //     )
    //   })
    // ) : null;

    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {$DoctorBox}
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

ListOfDoctors.propTypes = {
  updateIndex: PropTypes.func.isRequired
};
