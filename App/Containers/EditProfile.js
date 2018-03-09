import Ionicons from 'react-native-vector-icons/Feather';
import firebase from 'react-native-firebase';
import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  ScrollView
} from 'react-native'
import {Field, reduxForm} from 'redux-form';
import Database from '../Components/Database';


const onSignUp = (creds) => {
  const {name, email, password, type} = creds;
  const userToBeRegistered = {
    name: name,
    type: type,
    writePermission: type === "Doctor"
  };

  //console.log("props123 ", values, nav);
  firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
    Database.setUser(userToBeRegistered);
  }).catch(err => {
    const {code, message} = err;
  });
};

const renderInput = ({secureTextEntry, password, placeholder, input: {onChange, ...restInput}}) => {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      password={password}
      placeholderTextColor={"#bccad0"}
      style={styles.input}
      onChangeText={onChange}
      underlineColorAndroid="transparent"
      {...restInput}
    />
  )
};

const EditProfile = props => {
  //console.log(props);
  const {handleSubmit} = props;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.centerContainer}>

          <View style={styles.topContainer}>
            <Ionicons name="activity" size={63} color="#bccad0"/>
            <Text style={styles.topContainerTxt}>Edit your profile.</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.middleContainer}>
              <View style={{marginBottom: 20}}>
                <Text style={[styles.topContainerTxt, {textAlign: 'center'}]}>Personal Info</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{position: 'relative', marginLeft: 5, marginRight: 5}}>
                    <Field style={[styles.input, {marginBottom: 5}]} name="name" placeholder="Name"
                           component={renderInput}/>
                  </View>
                  <View style={{position: 'relative', marginLeft: 5, marginRight: 5}}>
                    <Field style={[styles.input, {marginBottom: 5}]} name="email" placeholder="Email"
                           component={renderInput}/>
                  </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{position: 'relative', marginLeft: 5, marginRight: 5}}>
                    <Field style={[styles.input, {marginBottom: 5}]} name="dob" placeholder="DD/MM/YYYY"
                           component={renderInput}/>
                  </View>
                  <View style={{position: 'relative', marginLeft: 5, marginRight: 5}}>
                    <Field style={[styles.input, {marginBottom: 5}]} name="address" placeholder="Address"
                           component={renderInput}/>
                  </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{position: 'relative', marginLeft: 5, marginRight: 5}}>
                    <Field style={[styles.input, {marginBottom: 5}]} name="contactNumber" placeholder="Phone Number"
                           component={renderInput}/>
                  </View>
                  <View style={{position: 'relative', marginLeft: 5, marginRight: 5}}>
                    <Field style={[styles.input, {marginBottom: 5}]} name="age" placeholder="Age"
                           component={renderInput}/>
                  </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{position: 'relative', marginLeft: 5, marginRight: 5}}>
                    <Field style={[styles.input, {marginBottom: 5}]} name="profession" placeholder="Profession"
                           component={renderInput}/>
                  </View>
                  <View style={{position: 'relative', marginLeft: 5, marginRight: 5}}>
                    <Field style={[styles.input, {marginBottom: 5}]} name="type" placeholder="Patient/Doctor"
                           component={renderInput}/>
                  </View>
                </View>
              </View>
              <View>
                <Text style={[styles.topContainerTxt, {textAlign: 'center'}]}>Health info</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{position: 'relative', marginLeft: 5, marginRight: 5}}>
                    <Field style={[styles.input, {marginBottom: 5}]} name="bmi" placeholder="Body mass index"
                           component={renderInput}/>
                  </View>
                  <View style={{position: 'relative', marginLeft: 5, marginRight: 5}}>
                    <Field style={[styles.input, {marginBottom: 5}]} name="bpm" placeholder="Beats per minute"
                           component={renderInput}/>
                  </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{position: 'relative', marginLeft: 5, marginRight: 5}}>
                    <Field style={[styles.input, {marginBottom: 5}]} name="calories" placeholder="Calories"
                           component={renderInput}/>
                  </View>
                  <View style={{position: 'relative', marginLeft: 5, marginRight: 5}}>
                    <Field style={[styles.input, {marginBottom: 5}]} name="fat" placeholder="% Fat burned"
                           component={renderInput}/>
                  </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{position: 'relative', marginLeft: 5, marginRight: 5}}>
                    <Field style={[styles.input, {marginBottom: 5}]} name="healtAlert" placeholder="Health status"
                           component={renderInput}/>
                  </View>
                  <View style={{position: 'relative', marginLeft: 5, marginRight: 5}}>
                    <Field style={[styles.input, {marginBottom: 5}]} name="temperature" placeholder="Temperature"
                           component={renderInput}/>
                  </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{position: 'relative', marginLeft: 5, marginRight: 5}}>
                    <Field style={[styles.input, {marginBottom: 5}]} name="height" placeholder="Height(cm)"
                           component={renderInput}/>
                  </View>
                  <View style={{position: 'relative', marginLeft: 5, marginRight: 5}}>
                    <Field style={[styles.input, {marginBottom: 5}]} name="weight" placeholder="Weight(kg)"
                           component={renderInput}/>
                  </View>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{position: 'relative', marginLeft: 5, marginRight: 5}}>
                    <TouchableOpacity style={styles.importBtn}>
                      <Text style={{color: '#f3f3f3', textAlign:'center', fontWeight: 'bold'}}>
                        <Ionicons name="activity" size={18} color="#f3f3f3" style={{marginRight: 5}}/></Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{position: 'relative', marginLeft: 5, marginRight: 5}}>
                    <TouchableOpacity style={styles.importBtn}>
                      <Text style={{color: '#f3f3f3', textAlign:'center', fontWeight: 'bold'}}>
                        <Ionicons name="heart" size={18} color="#f3f3f3" style={{marginRight: 5}}/></Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.loginBtn} onPress={() => props.navigation.goBack()}>
              <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'white', letterSpacing: 2}}>S
                A V E </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </TouchableWithoutFeedback>
  )
};

export default reduxForm({
  form: 'test'
})(EditProfile)

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
    marginBottom: 10
  },
  input: {
    fontSize: 15,
    color: "#aab8be",
    height: 40,
    width: 190,
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
  signUp: {},
  importBtn: {
    backgroundColor: '#62bdfb',
    elevation: 5,
    width: 190,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 10,
    borderRadius: 5
  }
});
