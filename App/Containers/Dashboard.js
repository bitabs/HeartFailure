import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import ListOfPatients from "./ListOfPatients";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    let $ = this.props.index === 0 ? (
      <ListOfPatients updateIndex={this.props.updateIndex}/>
    ) : (
      <Text>In Two"</Text>
    );

    return(
      <View>
        {$}
      </View>
    );
  }
}
