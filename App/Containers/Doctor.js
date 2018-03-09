import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import PropTypes from 'prop-types';
import ListOfPatients from "./ListOfPatients";
import PatientInfo from "./PatientInfo";
import UserInfo from "./UserInfo";
import ListOfUsers from "./ListOfUsers";
import firebase from 'react-native-firebase';
import User from '../Components/User';

export default class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.View = this.View.bind(this);
  }

  View = () => {

    switch (this.props.index) {
      case 0:
        return (
          <ListOfUsers
            updateIndex = {this.props.updateIndex}
            userView    = {this.props.userView}
          />
        );

      case 1:
        return (
          <UserInfo
            User={this.props.User}
          />
        );

      default: return(null);
    }
  };

  render() {
    return(
      <View>
        {this.View()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

Doctor.propTypes = {
  index       : PropTypes.number.isRequired
};
