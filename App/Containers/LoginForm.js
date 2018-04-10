// import React from 'react'
//
// // predefined components of React
// import {
//   Text, TextInput, TouchableOpacity,
//   TouchableWithoutFeedback, View, Keyboard
// } from 'react-native'
//
// // vector icons package
// import Ionicons from 'react-native-vector-icons/Feather';
//
// // firebase database
// import firebase from 'react-native-firebase';
//
// // form fields from redux
// import {Field, reduxForm} from 'redux-form';
//
// // checkbox component 3rd party
// import CheckBox from 'react-native-check-box';
//
// // styles for this component
// import styles from '../Containers/Styles/LoginFormStyles'
//
// /**
//  * This will login the user with their email and password
//  * ==============================================================
//  * @param credentials
//  */
// const onLogin = credentials => {
//   // to login, we need the email and password of the user
//   const {email, password} = credentials;
//
//   // we call the authentication mechanism from firebase and pass the creds
//   firebase.auth()
//     .signInAndRetrieveDataWithEmailAndPassword(email, password)
//     .catch(err => ({ code, message } = err));
// };
//
// /**
//  * Converts the normal field to actual input field from redux
//  * ==============================================================
//  * @param secureTextEntry
//  * @param password
//  * @param placeholder
//  * @param onChange
//  * @param restInput
//  * @return {XML}
//  */
// const renderInput = (
//   {secureTextEntry, password, placeholder, input: { onChange, ...restInput }}) => {
//   return (
//     <TextInput
//       secureTextEntry       = {secureTextEntry}
//       password              = {password}
//       placeholder           = {placeholder}
//       placeholderTextColor  = {"#bccad0"}
//       style                 = {styles.input}
//       onChangeText          = {onChange}
//       underlineColorAndroid = "transparent"
//       {...restInput}
//     />
//   )
// };
//
// /**
//  * The container of the form is created here, with their inputs
//  * ==============================================================
//  * @param props
//  * @return {XML}
//  * @constructor
//  */
// export const LoginForm = props => {
//   const { handleSubmit } = props;
//
//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//       <View style={styles.container}>
//         <View style={styles.centerContainer}>
//
//           <View style={styles.topContainer}>
//             <Ionicons name="activity" size={63} color="#bccad0" />
//             <Text style={styles.topContainerTxt}>Sign into your account.</Text>
//           </View>
//
//           <View style={styles.middleContainer}>
//             <Field
//               style={styles.input}
//               name="email"
//               placeholder="Email"
//               component={renderInput}
//             />
//             <View style={styles.positionRelative}>
//               <Ionicons
//                 name="eye"
//                 size={18}
//                 color="rgba(188,202,208, 0.5)"
//                 style={styles.ioniconsStyle} />
//               <Field
//                 style={[styles.input, {marginBottom: 40}]}
//                 secureTextEntry={true}
//                 password={true}
//                 name="password"
//                 placeholder="Password"
//                 component={renderInput}
//               />
//               <View style={styles.checkBoxContainer}>
//                 <View style={styles.checkBoxContainerSub}>
//                   <CheckBox
//                     style={{marginRight: 4}}
//                     checkBoxColor={'#bccad0'}
//                     isChecked={false}
//                     onClick={() => true}
//                   />
//                   <Text style={{color: '#bccad0'}}>Remember me</Text>
//                 </View>
//                 <View>
//                   <Text style={{color: '#bccad0'}}>Forgot Pass?</Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//
//           <View style={styles.bottomContainer}>
//             <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit(onLogin)}>
//               <Text style={styles.logoutTxt}>L O G I N</Text>
//             </TouchableOpacity>
//
//             <View style={styles.dontHaveAnAccountContainer}>
//               <Text style={styles.dontHaveAccountTxt}>Don't have an account?</Text>
//               <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
//                 <Text style={styles.signUpTxt}>Sign Up</Text>
//               </TouchableOpacity>
//             </View>
//
//           </View>
//
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   )
// };
//
// export default reduxForm({form: 'test'})(LoginForm)
import React, {Component} from 'react'

// predefined components of React
import {
  Text, TextInput, TouchableOpacity,
  TouchableWithoutFeedback, View, Keyboard
} from 'react-native'

// vector icons package
import Ionicons from 'react-native-vector-icons/Feather';

// firebase database
import firebase from 'react-native-firebase';

// form fields from redux
import {Field, reduxForm} from 'redux-form';

// checkbox component 3rd party
import CheckBox from 'react-native-check-box';

// styles for this component
import styles from './Styles/LoginFormStyles'

export class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * This will login the user with their email and password
   * ==============================================================
   * @param credentials
   */
  onLogin = credentials => {
    // to login, we need the email and password of the user
    const {email, password} = credentials;

    // we call the authentication mechanism from firebase and pass the creds
    firebase.auth()
      .signInAndRetrieveDataWithEmailAndPassword(email, password)
      .catch(err => ({ code, message } = err));
  };

  /**
   * Converts the normal field to actual input field from redux
   * ==============================================================
   * @param secureTextEntry
   * @param password
   * @param placeholder
   * @param onChange
   * @param restInput
   * @return {XML}
   */
  renderInput = ({secureTextEntry, password, placeholder, input: { onChange, ...restInput }}) => {
    return (
      <TextInput
        secureTextEntry       = {secureTextEntry}
        password              = {password}
        placeholder           = {placeholder}
        placeholderTextColor  = {"#bccad0"}
        style                 = {styles.input}
        onChangeText          = {onChange}
        underlineColorAndroid = "transparent"
        {...restInput}
      />
    )
  };

  /**
   * The container of the form is created here, with their inputs
   * ==============================================================
   * @return {XML}
   * @constructor
   */
  render() {
    const { handleSubmit, navigation } = this.props;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.centerContainer}>

            <View style={styles.topContainer}>
              <Ionicons name="activity" size={63} color="#bccad0" />
              <Text style={styles.topContainerTxt}>Sign into your account.</Text>
            </View>

            <View style={styles.middleContainer}>
              <Field
                style={styles.input}
                name="email"
                placeholder="Email"
                component={this.renderInput}
              />
              <View style={styles.positionRelative}>
                <Ionicons
                  name="eye"
                  size={18}
                  color="rgba(188,202,208, 0.5)"
                  style={styles.ioniconsStyle} />
                <Field
                  style={[styles.input, {marginBottom: 40}]}
                  secureTextEntry={true}
                  password={true}
                  name="password"
                  placeholder="Password"
                  component={this.renderInput}
                />
                <View style={styles.checkBoxContainer}>
                  <View style={styles.checkBoxContainerSub}>
                    <CheckBox
                      style={{marginRight: 4}}
                      checkBoxColor={'#bccad0'}
                      isChecked={false}
                      onClick={() => true}
                    />
                    <Text style={{color: '#bccad0'}}>Remember me</Text>
                  </View>
                  <View>
                    <Text style={{color: '#bccad0'}}>Forgot Pass?</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.bottomContainer}>
              <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit(this.onLogin)}>
                <Text style={styles.logoutTxt}>L O G I N</Text>
              </TouchableOpacity>

              <View style={styles.dontHaveAnAccountContainer}>
                <Text style={styles.dontHaveAccountTxt}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.signUpTxt}>Sign Up</Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default reduxForm({form: 'loginForm'})(LoginForm)
