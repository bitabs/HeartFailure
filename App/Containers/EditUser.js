import Ionicons from 'react-native-vector-icons/Feather';
import firebase from 'react-native-firebase';
import Feather from "react-native-vector-icons/Feather";
import React, {Component} from 'react'
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
import {success} from "../Redux/GithubRedux";

class EditUser extends Component {
 constructor(props) {
   super(props);
   this.state = {
     submitSuccess: null
   };
 }

  renderInput = ({multiline, style, maxLength, secureTextEntry, password, placeholder, input: {onChange, ...restInput}}) => {
    return (
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        password={password}
        multiline={multiline}
        placeholderTextColor={"#cbd9df"}
        style={style}
        onChangeText={onChange}
        maxLength={maxLength}
        underlineColorAndroid="transparent"
        {...restInput}
      />
    )
  };

  saveEdit = fields => {
    console.log(fields);
  };

  updateUser = () => {

  };

  render() {
    const {handleSubmit, submitFailed, save, firebaseUser} = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex:0}}>
          <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch',}}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end', marginBottom: 1, padding: 10, backgroundColor: '#6482e6', borderRadius: 300,
                elevation: 4
              }}
              onPress={handleSubmit(saveEdit => Database.updateUser(saveEdit)) }
            >
              <Feather name={'check'} size={17} color='white' />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>@Name</Text>
              <Field style={styles.input} name="name" placeholder="eg. Naseebullah Ahmadi" component={this.renderInput}/>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>@Bio</Text>
              <Field style={[styles.input, {height: 100, textAlignVertical: "top"}]} multiline={true} name="bio" placeholder="your Text" component={this.renderInput}/>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>@Address</Text>
              <Field style={styles.input} name="address" placeholder="eg. 123 Wallstreet" component={this.renderInput}/>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>@Profession</Text>
              <Field style={styles.input} name="profession" placeholder="eg. Frontend Developer" component={this.renderInput}/>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>@Date of birth</Text>
              <Field style={styles.input} name="dob" placeholder="eg. 02/06/1997" component={this.renderInput}/>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    )
  }
}

export default reduxForm({
  form: 'test'
})(EditUser)

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20
  },
  inputTitle: {
    textAlign: 'left',
    color: '#aab8be'
  },
  input: {
    fontSize: 15,
    color: "#aab8be",
    height: 40,
    // alignSelf: 'stretch',
    // width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'rgba(188,202,208, 0.15)',
    marginTop: 10,
    borderRadius: 5
  }
});
