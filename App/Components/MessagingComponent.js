import React, { Component } from 'react'
import { NavigationActions } from "react-navigation";
import {StyleSheet, ScrollView, View, Text, TextInput, Keyboard, TouchableWithoutFeedback} from "react-native";
import MessageComponent from "./MessageComponent";
import Ionicons from 'react-native-vector-icons/Feather';


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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{position: 'relative', marginBottom: 20}}>
            <Ionicons name="search" size={18} color="rgba(188,202,208, 0.5)" style={{position: 'absolute', left: 15, top: 16}} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              underlineColorAndroid="transparent"
              placeholderTextColor={"#bccad0"}
            />
          </View>
        </TouchableWithoutFeedback>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.messageComponent()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideMenuContainer: {
    flex: 1,
    //paddingTop: 40,
    padding: 20
  },
  searchInput: {
    fontSize: 13,
    color: "#aab8be",
    height: 30,
    paddingTop:0,
    paddingBottom: 0,
    paddingLeft: 40,
    backgroundColor: 'rgba(188,202,208, 0.1)',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5
  },
});
