import Ionicons from 'react-native-vector-icons/Feather';
import firebase from 'react-native-firebase';
import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import {Field, reduxForm} from 'redux-form';




const onLogin = creds => {
  const {email, password} = creds;
  //console.log("props123 ", values, nav);
  firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
    /*
    * User is logged in
    *
    * */
    // if (user) navigation.navigate('drawerStack');
  }).catch(err => {
    const { code, message } = err;
    console.log("not loggedin, ", message);
  });
};

const renderInput = ({placeholder, input: { onChange, ...restInput }}) => {
  return <TextInput placeholder={placeholder} style={styles.input} onChangeText={onChange} {...restInput} />
};

const LoginForm = props => {
  const { handleSubmit } = props;

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.elementAlignLeft}>
          <Ionicons name="activity" size={33} color="#8F9CAE" />
        </View>
      </View>

      <View>
        <View style={styles.elementAlignLeft}>
          <Text style={[styles.elementAlignLeft, styles.welcomeFontOne, {fontSize: 35}]}>
            Welcome Back!{'\n'}
            <Text style={[styles.elementAlignLeft, styles.welcomeFontOne, {color: '#8F9CAE'}]}>
              Login to continue
            </Text>
          </Text>
        </View>
      </View>

      <View>
        <Field style={styles.input} name="email" placeholder="Email" component={renderInput} />
        <Field style={[styles.input, {marginBottom: 40}]} name="password" placeholder="Password" component={renderInput} />
      </View>

      <View>
        <View style={styles.loginBtnContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit(onLogin)}>
            <Text style={{fontSize: 30, color: '#17a2e0'}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <View style={styles.elementAlignLeft}>
          <Text style={[styles.elementAlignLeft, styles.welcomeFontOne, {marginRight: 4}]}>
            Don't have an account? <Text style={[styles.elementAlignLeft, styles.welcomeFontOne, {color: '#8F9CAE'}]}> Signup</Text>
          </Text>
        </View>
      </View>

    </View>
  )
}

export default reduxForm({
  form: 'test'
})(LoginForm)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Used to set Text Component Vertically Center
    alignItems: 'center', // Used to set Text Component Horizontally Center
    paddingTop: 80,
    paddingBottom: 80,
    backgroundColor: '#F5FCFF'
  },
  elementAlignLeft: {
    width: 280,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding:0,
  },
  welcomeFontOne: {
    flex: 1,
    color: '#47535d'
  },
  loginBtnContainer: {
    width: 280,
    height: 60,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  button: {
    alignItems: 'flex-start'
  },
  input: {
    fontSize: 19,
    height: 50,
    width: 280,
    marginTop: 10
  }
});
