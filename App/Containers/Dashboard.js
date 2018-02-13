import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import ListOfPatients from "./ListOfPatients";
import PropTypes from 'prop-types';

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
            <ListOfPatients updateIndex={this.props.updateIndex} Patients={this.props.Patients}/>
          ) : (
            <Text>In Two"</Text>
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
    justifyContent: 'center',
    backgroundColor: 'red'
  }
});

Dashboard.propTypes = {
  Patients    : PropTypes.object
};
