import React, { Component } from 'react'
import {View, TouchableHighlight, StyleSheet, Text, Animated} from 'react-native'

import LoginForm from "../Components/LoginForm";

export default class Login extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   email     : '',
    //   password  : ''
    // };
    //
    this.buttonPress = this.buttonPress.bind(this);
  }

  buttonPress() {
    this.props.navigation.navigate('drawerStack');
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginForm navigation={this.props.navigation}  {...this.props}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3'
  }
});
