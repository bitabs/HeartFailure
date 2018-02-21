import React, { Component } from 'react'
import { NavigationActions } from "react-navigation";
import {StyleSheet, ScrollView, View, Text, TextInput, Keyboard, TouchableWithoutFeedback} from "react-native";
import MessageComponent from "./MessageComponent";
import Ionicons from 'react-native-vector-icons/Feather';
import firebase from 'react-native-firebase';
import User from './User';
import _ from 'lodash';

export default class MessagingComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messageObject : null,
      type      : null
    };

    this.fetchMessagesObject = this.fetchMessagesObject.bind(this);
  }

  componentDidMount() {
    this.fetchMessagesObject();
  };

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  fetchMessagesObject = () => {
    User().then(user => {
      firebase.app().database().ref(`/Users/${user.uid}`).on('value', (snap) => {
        if (snap.val()) this.setState({ type: snap.val().type }, () => {});

        this.messages = snap.val().type === "Doctor" ? (
          firebase.app().database().ref('/DoctorsCommentsToPatients')
        ) : (
          firebase.app().database().ref('/PatientsCommentsToDoctors')
        );

        this.initMessages  = this.initMessages.bind(this);
        this.initMessages(this.messages, user);
      });
    });
  };

  initMessages = (messages, user) => {
    messages.on('value', snap => {
      const msgObj = snap.val();

      if (msgObj) {
        this.setState({
          messageObject: Object.keys(msgObj).map(($uid, i) => {
            const person = msgObj[$uid];
            if (person.messages) {
              const latest = Object.values(person.messages)[Object.keys(person.messages).length - 1];
              return (
                <MessageComponent
                  name          = {person.name}
                  uid           = {this.state.type === "Doctor" ? $uid.match( /(.*)<=>/)[1] : $uid.match( /<=>(.*)/)[1] }
                  healthAlert   = {person.healthAlert || ""}
                  comment       = {latest ? latest.msgText : ""}
                  timeStamp     = {latest ? latest.timeStamp : ""}
                  type          = {this.state.type}
                  key           = {i}
                />
              );
            }
          })
        })
      }

      // this.setState({
      //   messageObject: Object.keys(msgObj).map(($uid, i) => {
      //     const person = msgObj[$uid];
      //     const latest = Object.values(person.messages)[Object.keys(person.messages).length - 1];
      //
      //     return (
      //       <MessageComponent
      //         name          = {person.name}
      //         uid           = {this.state.type === "Doctor" ? $uid.match( /(.*)<=>/)[1] : $uid.match( /<=>(.*)/)[1] }
      //         healthAlert   = {person.healthAlert || ""}
      //         comment       = {latest.msgText || null}
      //         timeStamp     = {latest.timeStamp}
      //         type          = {this.state.type}
      //         key           = {i}
      //       />
      //     );
      //
      //     // if ($uid.match( /<=>(.*)/)[1] === user.uid) {
      //     //   return (
      //     //     <MessageComponent
      //     //       name         = {person.name}
      //     //       uid          = {this.state.type === "Doctor" ? $uid.match( /(.*)<=>/)[1] : $uid.match( /<=>(.*)/)[1] }
      //     //       healthAlert  = {person.healthAlert || ""}
      //     //       comment      = {person.messages[person.messages.length - 1].msgText || null}
      //     //       timeStamp    = {person.messages[person.messages.length - 1].timeStamp || null}
      //     //       type     = {this.state.type}
      //     //       key          = {i}
      //     //     />
      //     //   );
      //     // }
      //   })
      // })
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
