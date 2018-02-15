import React, { Component } from 'react'
import { NavigationActions } from "react-navigation";
import {StyleSheet, ScrollView, View} from "react-native";
import MessageComponent from "./MessageComponent";


export default class MessagingComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {}

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
        const {name, healthAlert} = patient;
        const {patientsComments} = patient.doctors[DoctorUID];

        // console.log(patientsComments[patientsComments.length - 1]);
        return (
          <MessageComponent
            name              = {name}
            uid               = {uuid}
            healthAlert       = {healthAlert}
            comment           = {patientsComments[patientsComments.length - 1].msgText}
            dateTime          = {patientsComments[patientsComments.length - 1].dateTime}
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
