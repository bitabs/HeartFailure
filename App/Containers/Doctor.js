import React, {Component} from 'react';
import {View, Text} from "react-native";
import Dashboard from "./Dashboard";
import PropTypes from 'prop-types';

export default class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
        <Dashboard
          index       = {this.props.index}
          updateIndex = {this.props.updateIndex}
          style       = {{backgroundColor: 'pink'}}
        />
      </View>
    );
  }
}

Doctor.propTypes = {
  index       : PropTypes.number.isRequired
};
