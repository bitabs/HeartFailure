import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import ListOfPatients from "./ListOfPatients";
import PropTypes from 'prop-types';
import PatientInfo from "./PatientInfo";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }



  render() {
    return(
      <View>
        {
          this.props.index === 0 ? (
            <ListOfPatients updateIndex={this.props.updateIndex} patientView={this.props.patientView}/>
          ) : (
            <PatientInfo Patient={this.props.patient} />
          )
        }
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

Dashboard.propTypes = {};
