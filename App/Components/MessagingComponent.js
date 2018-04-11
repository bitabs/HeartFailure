// import the component from react
import React, { Component } from 'react'

// importing predefined components from react native
import {
  StyleSheet, ScrollView, View, TextInput,
  Keyboard, TouchableWithoutFeedback
} from "react-native"

// each message is treated as seperate component
import MessageComponent from "./MessageComponent";

// vector icon package
import Ionicons from 'react-native-vector-icons/Feather';

// require the database to return the messages
import firebase from '../../firebase';

// to get the current user's details like uid
import User from './User';

/**
 * This component is treated a super container holding
 * messages details
 */
export default class MessagingComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messageObject : null,
      user          : null,
      type          : null
    };

    // binding methods
    this.fetchMessagesObject = this.fetchMessagesObject.bind(this);
    this.initMessages  = this.initMessages.bind(this);

    // we have two tables for the messages
    // return patients messages
    this.PCommentsRef = firebase.database().ref(`/PatientsCommentsToDoctors`);

    // return doctors messages
    this.DCommentsRef = firebase.database().ref(`/DoctorsCommentsToPatients`);
  }

  /**
   * When the component is mounted, initiate the fetching
   */
  componentDidMount() {
    this.fetchMessagesObject(this.PCommentsRef, this.DCommentsRef);
  };

  /**
   * Get the message object of the user
   * @param PatientsCommentsToDoctors
   * @param DoctorsCommentsToPatients
   */
  fetchMessagesObject = (PatientsCommentsToDoctors, DoctorsCommentsToPatients) => {

    // get the current user's details
    User().then(user => {

      // get the user's details from firebase
      firebase.database().ref(`/Users/${user.uid}`).on('value', (snap) => {
        // if the user exists, get its type and the object itself
        if (snap.val()) this.setState({ type: snap.val().type, user: snap.val() }, () => {

          // now, we need to fetch the messages from the table and then filter
          this.initMessages(
            snap.val().type === "Doctor" ? PatientsCommentsToDoctors : DoctorsCommentsToPatients,
            user, snap.val().type
          );
        });
      });
    });
  };

  /**
   * Get the corresponding message table from the user, and
   * render the messages.
   * @param messages
   * @param user
   * @param type
   */
  initMessages = (messages, user, type) => {

    // get the data from the message table
    messages.on('value', snap => {

      // if the data exists...
      if (snap.val() && this.state.user) {

        // first let us ge the Users object from the authenticated user
        const Users = (type === "Patient")
          ? (this.state.user.Doctors || null)
          : (this.state.user.Patients || null);

        // local store of the message table
        const message = snap.val();

        // If the Users object is not empty, i.e. there are messages
        if (Users) this.setState({

          // loop through it
          messageObject: Object.keys(Users).map(($uid,i) => {

            // get the messages that is durected to the authenticated user
            const _uid = `${$uid}<=>${user.uid}`;

            // if the uid exists in the message table...
            if (message[_uid] && message[_uid].messages) {

              // es6 destructuring of the message object
              const { healthAlert, messages, name, uid } = message[_uid];

              // filter the table based on the timestamp of the message
              const [latest] = messages
                ? Object.values(messages)
                  .sort((a, b) => Date.parse(a.timeStamp) - Date.parse(b.timeStamp))
                  .map(k => ({
                    timeStamp: k.timeStamp, msgText: k.msgText
                  })).slice(-1)
                : null;

              // once filtered, let us render it now to the UI
              if ( latest ) {
                return (
                  <MessageComponent
                    name        = {name}
                    uid         = {uid}
                    healthAlert = {healthAlert || "Stable"}
                    comment     = {latest ? latest.msgText : ""}
                    timeStamp   = {latest ? latest.timeStamp : ""}
                    type        = {this.state.type}
                    key         = {i}
                  />
                );
              }
            }
          })
        });
      }
    });
  };

  /**
   * Let us render the message container to the ui when
   * the component is ready
   * @return {XML}
   */
  render () {
    return (
      <View style={styles.sideMenuContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{
            position: 'relative', marginBottom: 20
          }}>
            <Ionicons
              name="search"
              size={18}
              color="rgba(188,202,208, 0.5)"
              style={{
                position: 'absolute',
                left: 15,
                top: 16
              }}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              underlineColorAndroid="transparent"
              placeholderTextColor={"#bccad0"}
            />
          </View>
        </TouchableWithoutFeedback>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.messageObject}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideMenuContainer: {
    flex: 1,
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
