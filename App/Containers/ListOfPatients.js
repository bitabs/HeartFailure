import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet, Image} from "react-native";
import PatientBox from "./PatientBox";
import PropTypes from 'prop-types';

export default class ListOfPatients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Patients: null
    }
  }

  componentWillReceiveProps() {
    if (this.props.Patients) {
      this.setState({
        Patients: this.props.Patients
      })
    }
  }

  render() {

    //console.log({P: this.props.Patients});

    let Patients = this.props.Patients ? (
      Object.keys(this.props.Patients).map((uid, i) => {
        let patient = this.props.Patients[uid];
        //console.log(patient);
        return (
          <PatientBox
            uid         = {uid}
            name        = {patient.name}
            profilePic  = {patient.profilePicture}
            profession  = {patient.profession}
            history     = {patient.history}
            ecg         = {patient.ecg}
            heartsound  = {patient.heartSound}
            key         = {i}
          />
        );
      })
    ) : (null);

    return(
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            Patients
          }
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
    backgroundColor: '#f7f7f7'
  }
});

ListOfPatients.propTypes = {
  Patients    : PropTypes.object
};
