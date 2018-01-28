import React, { Component } from 'react'
import LoginForm from "../Components/LoginForm";

export default class Login extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   email     : '',
    //   password  : ''
    // };
    //
    // this.buttonPress = this.buttonPress.bind(this);
  }
  //
  // buttonPress() {
  //   console.log('called');
  //   this.props.navigation.navigate('drawerStack');
  // }

  render() {
    return (
      <LoginForm navigation={this.props.navigation} />
    );
  }
}
