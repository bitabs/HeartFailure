import React, { Component } from 'react'
import {StyleSheet, ScrollView, View, Text, TextInput, Keyboard, TouchableWithoutFeedback} from "react-native";
import MessageComponent from "./MessageComponent";
import Ionicons from 'react-native-vector-icons/Feather';
import firebase from 'react-native-firebase';
import User from './User';

export default class MessagingComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messageObject : null,
      user          : null,
      type          : null
    };

    this.fetchMessagesObject = this.fetchMessagesObject.bind(this);
    this.initMessages  = this.initMessages.bind(this);
    this.PCommentsRef = firebase.app().database().ref(`/PatientsCommentsToDoctors`);
    this.DCommentsRef = firebase.app().database().ref(`/DoctorsCommentsToPatients`);
  }

  componentDidMount() {
    this.fetchMessagesObject(this.PCommentsRef, this.DCommentsRef);
  };

  fetchMessagesObject = (PatientsCommentsToDoctors, DoctorsCommentsToPatients) => {
    User().then(user => {
      firebase.app().database().ref(`/Users/${user.uid}`).on('value', (snap) => {
        if (snap.val()) this.setState({ type: snap.val().type, user: snap.val() }, () => {
          this.initMessages(
            snap.val().type === "Doctor" ? PatientsCommentsToDoctors : DoctorsCommentsToPatients,
            user, snap.val().type
          );
        });
      });
    });
  };

  initMessages = (messages, user, type) => {
    messages.on('value', snap => {
      if (snap.val() && this.state.user) {
        const Users = (type === "Patient") ? (this.state.user.Doctors || null) : (this.state.user.Patients || null);
        const message = snap.val();

        if (Users) this.setState({
          messageObject: Object.keys(Users).map(($uid,i) => {
            const _uid = `${$uid}<=>${user.uid}`;
            if (message[_uid] && message[_uid].messages) {
              const { healthAlert, messages, name, uid } = message[_uid];

              const [latest] = messages ? Object.values(messages).sort((a, b) => Date.parse(a.timeStamp) - Date.parse(b.timeStamp)).map(k => ({
                timeStamp: k.timeStamp,
                msgText: k.msgText
              })).slice(-1) : null;

              if (latest) {
                return (
                  <MessageComponent
                    name={name} uid={uid} healthAlert={healthAlert || "Stable"}
                    comment={latest ? latest.msgText : ""} timeStamp={latest ? latest.timeStamp : ""}
                    type={this.state.type} key={i}
                  />
                );
              }
            }
          })
        });
      }
    });
  };

  render () {
    return (
      <View style={styles.sideMenuContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{position: 'relative', marginBottom: 20}}>
            <Ionicons name="search" size={18} color="rgba(188,202,208, 0.5)" style={{position: 'absolute', left: 15, top: 16}} />
            <TextInput style={styles.searchInput} placeholder="Search..." underlineColorAndroid="transparent" placeholderTextColor={"#bccad0"}/>
          </View>
        </TouchableWithoutFeedback>
        <ScrollView showsVerticalScrollIndicator={false}>{this.state.messageObject}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideMenuContainer: {
    flex: 1,
    //paddingTop: 40,
    padding: 20
  },
  searchInput: {
    fontSize: 13,
    color: "#aab8be",
    height: 30,
    paddingTop:0,
    paddingBottom: 0,
    paddingLeft: 40,
    backgroundColor: 'rgba(188,202,208, 0.1)',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5
  },
});
