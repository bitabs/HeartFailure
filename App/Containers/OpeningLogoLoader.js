import React, { Component } from 'react'
import {View, StyleSheet, TouchableHighlight, Text} from "react-native";
import Ionicons from 'react-native-vector-icons/Feather';
import Fade from '../Components/Fade'

export default class OpeningLogoLoader extends Component {

  constructor() {
    super();
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    this.setState({loading: true});
  }

  render() {
    return(
      <View style={styles.container}>
        <Fade visible={this.state.loading}>
          <Ionicons name="activity" size={33} color="#8F9CAE" />
        </Fade>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Used to set Text Component Vertically Center
    alignItems: 'center' // Used to set Text Component Horizontally Center
  }
});
