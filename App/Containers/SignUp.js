import React, {PureComponent} from 'react'

// predefined components of react
import {
  StyleSheet, Text, TextInput, TouchableOpacity,
  TouchableWithoutFeedback, View, Keyboard
} from 'react-native'

// icon package to use vector icons
import Ionicons from 'react-native-vector-icons/Feather'

// bridge to firebase database
import firebase from 'react-native-firebase'

// form components from redux
import {Field, reduxForm} from 'redux-form'

// DB component for common DB operations
import Database from '../Components/Database'

// importing styles for the signup form
import styles from './Styles/SignUpStyles'

export class SignUp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * It will create an account for the user. Therefore it will
   * require common user credentials
   * ==============================================================
   * @param credentials
   */
  onSignUp = credentials => {

    // to signup, we shall acquire the following
    const {name, email, password, type} = credentials;

    // these fields are predefined from firebase
    const userToBeRegistered = {
      name              : name,
      type              : type,
      writePermission   : type === "Doctor"
    };

    // to create the user, we shall do so by passing the email and password
    firebase.auth()
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then((user) => Database.createNewUser (
        user.user.uid, userToBeRegistered
      )).catch(err => ({ code, message } = err));
  };

  /**
   * Converts the <Field /> component to actual form field
   * component
   * ==============================================================
   * @param secureTextEntry
   * @param password
   * @param placeholder
   * @param onChange
   * @param restInput
   * @return {XML}
   */
  renderInput = ({ secureTextEntry, password, placeholder, input: { onChange, ...restInput }}) => {
    return (
      <TextInput
        placeholder           = {placeholder}
        secureTextEntry       = {secureTextEntry}
        password              = {password}
        placeholderTextColor  = {"#bccad0"}
        style                 = {styles.input}
        onChangeText          = {onChange}
        underlineColorAndroid = "transparent"
        {...restInput}
      />
    )
  };


  /**
   * Creates the sign up form for users to add their credentials
   * ==============================================================
   * @return {XML}
   * @constructor
   */
  render() {
    const { handleSubmit } = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.centerContainer}>
            <View style={styles.topContainer}>
              <Ionicons name="activity" size={63} color="#bccad0" />
              <Text style={styles.topContainerTxt}>Sign up for an account.</Text>
            </View>
            <View style={styles.middleContainer}>
              <View style={styles.inputContainer}>
                <Field
                  style={[styles.input, styles.overrideInput]}
                  name="name"
                  placeholder="Name"
                  component={this.renderInput}
                />
              </View>
              <View style={styles.inputContainer}>
                <Field
                  style={[styles.input, styles.overrideInput]}
                  name="email"
                  placeholder="Email"
                  component={this.renderInput}
                />
              </View>
              <View style={styles.inputContainer}>
                <Field
                  style={[styles.input, styles.overrideInput]}
                  name="type"
                  placeholder="Patient or Doctor?"
                  component={this.renderInput}
                />
              </View>
              <View style={styles.inputContainer}>
                <Field
                  style={[styles.input, styles.overrideInput]}
                  secureTextEntry={true}
                  password={true}
                  name="password"
                  placeholder="Password"
                  component={this.renderInput}
                />
              </View>
              <View style={styles.inputContainer}>
                <Field
                  style={[styles.input, styles.overrideInput]}
                  secureTextEntry={true}
                  password={true}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  component={this.renderInput}
                />
              </View>
            </View>

            <View style={styles.bottomContainer}>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={handleSubmit(this.onSignUp)}
              ><Text style={styles.signUpTxt}>S I G N  U P</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default reduxForm({
  form: 'SignUp Form'
})(SignUp)
