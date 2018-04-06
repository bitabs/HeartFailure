import React, { Component } from 'react'

// predefined component of react
import {View, StyleSheet} from 'react-native'

// form for the login
import LoginForm from "../Components/LoginForm"

/**
 * This component holds the actual form of the login
 */
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * This component will only call the actual form of the login
   * @return {XML}
   */
  render() {
    return (
      <View style={styles.container}>
        <LoginForm
          navigation={this.props.navigation}
          {...this.props}
        />
      </View>
    );
  }
}

/**
 * Styles of this component
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3'
  }
});
