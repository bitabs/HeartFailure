import React, { Component } from 'react'
import { NavigationActions } from "react-navigation";
import {StyleSheet, ScrollView, View, AsyncStorage} from "react-native";
import PropTypes from 'prop-types';
import MessageComponent from "./MessageComponent";


export default class MessagingComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false
    }

  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  messageComponent = () => {
    const {routes: [{params: data}]} = this.props.navigation.state;
    let patients = null;
    if (data) {
      const {data: [{Patients, DoctorUID}]} = data;

      patients = Object.keys(Patients).map( (uuid, i) => {
        const patient = Patients[uuid];
        const {name, profilePicture} = patient;
        const {patientsComments} = patient.doctors[DoctorUID];
        console.log(name, profilePicture);

        return (
          <MessageComponent
            name              = {name}
            uid               = {uuid}
            patientsComments  = {patientsComments}
            key               = {i}
          />
        )
      });
    }
    return patients;
  };

  render () {
    return (
      <View style={styles.sideMenuContainer}>
        <ScrollView>
          {this.messageComponent()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideMenuContainer: {
    flex: 1,
    paddingTop: 40,
    padding: 20
  },
});
