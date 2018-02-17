import Ionicons from 'react-native-vector-icons/Feather';
import firebase from 'react-native-firebase';
import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard } from 'react-native'
import {Field, reduxForm} from 'redux-form';
import CheckBox from 'react-native-check-box';


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
  return <TextInput placeholder={placeholder} placeholderTextColor={"#bccad0"} style={styles.input} onChangeText={onChange} {...restInput} underlineColorAndroid="transparent" />
};

const LoginForm = props => {
  //console.log(props);
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
              <Field style={[styles.input, {marginBottom: 40}]} name="password" placeholder="Password" component={renderInput} />
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








/*
TODO => Uncomment below for backup
 */

// import Ionicons from 'react-native-vector-icons/Feather';
// import firebase from 'react-native-firebase';
// import React from 'react'
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native'
//
// import {Field, reduxForm} from 'redux-form';
//
//
//

// const onLogin = creds => {
//   const {email, password} = creds;
//   //console.log("props123 ", values, nav);
//   firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
//     /*
//     * User is logged in
//     *
//     * */
//     // if (user) navigation.navigate('drawerStack');
//   }).catch(err => {
//     const { code, message } = err;
//     console.log("not loggedin, ", message);
//   });
// };
//
// const renderInput = ({placeholder, input: { onChange, ...restInput }}) => {
//   return <TextInput placeholder={placeholder} style={styles.input} onChangeText={onChange} {...restInput} />
// };

// const LoginForm = props => {
//   const { handleSubmit } = props;
//
//   return (
//     <View style={styles.container}>
//       <View>
//         <View style={styles.elementAlignLeft}>
//           <Ionicons name="activity" size={33} color="#8F9CAE" />
//         </View>
//       </View>
//
//       <View>
//         <View style={styles.elementAlignLeft}>
//           <Text style={[styles.elementAlignLeft, styles.welcomeFontOne, {fontSize: 35}]}>
//             Welcome Back!{'\n'}
//             <Text style={[styles.elementAlignLeft, styles.welcomeFontOne, {color: '#8F9CAE'}]}>
//               Login to continue
//             </Text>
//           </Text>
//         </View>
//       </View>
//
//       <View>
//         <Field style={styles.input} name="email" placeholder="Email" component={renderInput} />
//         <Field style={[styles.input, {marginBottom: 40}]} name="password" placeholder="Password" component={renderInput} />
//       </View>
//
//       <View>
//         <View style={styles.loginBtnContainer}>
//           <TouchableOpacity style={styles.button} onPress={handleSubmit(onLogin)}>
//             <Text style={{fontSize: 30, color: '#17a2e0'}}>Login</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//
//       <View>
//         <View style={styles.elementAlignLeft}>
//           <Text style={[styles.elementAlignLeft, styles.welcomeFontOne, {marginRight: 4}]}>
//             Don't have an account? <Text style={[styles.elementAlignLeft, styles.welcomeFontOne, {color: '#8F9CAE'}]}> Signup</Text>
//           </Text>
//         </View>
//       </View>
//
//     </View>
//   )
// }

// export default reduxForm({
//   form: 'test'
// })(LoginForm)
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-between', // Used to set Text Component Vertically Center
//     alignItems: 'center', // Used to set Text Component Horizontally Center
//     paddingTop: 80,
//     paddingBottom: 80
//   },
//   elementAlignLeft: {
//     width: 280,
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     padding:0,
//   },
//   welcomeFontOne: {
//     flex: 1,
//     color: '#47535d'
//   },
//   loginBtnContainer: {
//     width: 280,
//     height: 60,
//     marginTop: 30,
//     justifyContent: 'center',
//     alignItems: 'flex-start'
//   },
//   button: {
//     alignItems: 'flex-start'
//   },
//   input: {
//     fontSize: 19,
//     height: 50,
//     width: 280,
//     marginTop: 10
//   }
// });
