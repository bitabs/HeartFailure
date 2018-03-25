import Ionicons from 'react-native-vector-icons/Feather';
import firebase from 'react-native-firebase';
import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard } from 'react-native'
import {Field, reduxForm} from 'redux-form';
import CheckBox from 'react-native-check-box';


const onLogin = creds => {
  const {email, password} = creds;
  firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password).catch(err => {
    const { code, message } = err;
  });
};

const renderInput = ({secureTextEntry, password, placeholder, input: { onChange, ...restInput }}) => {
  return <TextInput secureTextEntry={secureTextEntry} password={password}  placeholder={placeholder} placeholderTextColor={"#bccad0"} style={styles.input} onChangeText={onChange} {...restInput} underlineColorAndroid="transparent" />
};

const LoginForm = props => {
  const { handleSubmit } = props;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.centerContainer}>

          <View style={styles.topContainer}>
            <Ionicons name="activity" size={63} color="#bccad0" />
            <Text style={styles.topContainerTxt}>Sign into your account.</Text>
          </View>

          <View style={styles.middleContainer}>
            <Field style={styles.input} name="email" placeholder="Email" component={renderInput} />
            <View style={{position: 'relative'}}>
              <Ionicons name="eye" size={18} color="rgba(188,202,208, 0.5)" style={{position: 'absolute', right: 15, top: 21}} />
              <Field style={[styles.input, {marginBottom: 40}]} secureTextEntry={true} password={true} name="password" placeholder="Password" component={renderInput} />
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit(onLogin)}>
              <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'white', letterSpacing: 2}}>L O G I N</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: '#bccad0', marginRight: 10}}>Don't have an account?</Text>
              <TouchableOpacity style={styles.signUp} onPress={() => props.navigation.navigate('SignUp')}>
                <Text style={{fontSize: 14, color: '#E67D8F', fontWeight: 'bold'}}>Sign Up</Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default reduxForm({
  form: 'test'
})(LoginForm)

const styles = StyleSheet.create({
  container: {
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
    marginTop: 30,
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
