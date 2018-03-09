import React, {Component} from 'react';
import {View, StyleSheet, Text} from "react-native";
import HeartBeat from "../Components/HeartBeat";
import ECG from "./ECG";
import Statistics from "./Statistics";
import PropTypes from 'prop-types';
import ListOfDoctors from "./ListOfDoctors";
import DoctorInfo from "./DoctorInfo";
import UserInfo from "./UserInfo";
import ListOfUsers from "./ListOfUsers";

export default class Patient extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.View = this.View.bind(this);
  }

  View = () => {

    switch (this.props.index) {
      case 0:
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <HeartBeat/>
            <ECG height={230} width={380}/>
          </View>
        );

      case 1:
        return (
          <Statistics/>
        );

      case 2:
        return (
          <ListOfUsers updateIndex={this.props.updateIndex} userView={this.props.userView}/>
        );

      case 3:
        return (
          <UserInfo User={this.props.User}/>
        );

      default: return (null);
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
    justifyContent: 'center',
  }
});

Patient.propTypes = {
  index   : PropTypes.number.isRequired
};
