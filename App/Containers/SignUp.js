import Ionicons from 'react-native-vector-icons/Feather';
import firebase from 'react-native-firebase';
import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard } from 'react-native'
import {Field, reduxForm} from 'redux-form';


const onSignUp = (creds) => {
  const {email, password} = creds;
  //console.log("props123 ", values, nav);
  firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {

  }).catch(err => {
    const { code, message } = err;
  });
};

const renderInput = ({placeholder, input: { onChange, ...restInput }}) => {
  return <TextInput placeholder={placeholder} placeholderTextColor={"#bccad0"} style={styles.input} onChangeText={onChange} {...restInput} underlineColorAndroid="transparent" />
};

const SignUp = props => {
  //console.log(props);
  const { handleSubmit } = props;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.centerContainer}>

          <View style={styles.topContainer}>
            <Ionicons name="activity" size={63} color="#bccad0" />
            <Text style={styles.topContainerTxt}>Sign up for an account.</Text>
          </View>

          <View style={styles.middleContainer}>
            <View style={{position: 'relative'}}>
              <Field style={[styles.input, {marginBottom: 40}]} name="name" placeholder="Name" component={renderInput} />
            </View>
            <View style={{position: 'relative'}}>
              <Field style={[styles.input, {marginBottom: 40}]} name="email" placeholder="Email" component={renderInput} />
            </View>
            <View style={{position: 'relative'}}>
              <Field style={[styles.input, {marginBottom: 40}]} name="password" placeholder="Password" component={renderInput} />
            </View>
            <View style={{position: 'relative'}}>
              <Field style={[styles.input, {marginBottom: 40}]} name="confirmPassword" placeholder="Confirm password" component={renderInput} />
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit(onSignUp)}>
              <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'white', letterSpacing: 2}}>S I G N  U P</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </TouchableWithoutFeedback>
  )
};

export default reduxForm({
  form: 'test'
})(SignUp)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    flex: 1,
    justifyContent: 'center', // Used to set Text Component Vertically Center
    alignItems: 'center', // Used to set Text Component Horizontally Center
  },
  centerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  topContainerTxt: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 17,
    color: '#bccad0'
  },
  middleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom:10
  },
  input: {
    fontSize: 15,
    color: "#aab8be",
    height: 40,
    width: 280,
    paddingLeft: 15,
    backgroundColor: 'rgba(188,202,208, 0.15)',
    marginTop: 10,
    borderRadius: 5
  },
  bottomContainer: {
    flexDirection: 'column',
    marginTop: 10,
    alignItems: 'center'
  },
  loginBtn: {
    backgroundColor: '#E67D8F',
    alignSelf: 'stretch',
    borderRadius: 5,
    padding: 12,
    width: 280,
    height: 50,
    elevation: 2,
    marginBottom: 20
  },
  signUp: {

  }
});
