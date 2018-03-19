import firebase from 'react-native-firebase';
import moment from 'moment';
import User from './User';

export default class Database {

  static createNewUser = (uid, newUser) => firebase.app().database().ref(`/Users/${uid}`).set(newUser).catch(e => console.log(e));

  static updateUserTable = (uid, inputValues) => firebase.app().database().ref(`/Users/${uid}`).update(inputValues).catch(e => console.log(e));

  static updateHealthTable = (uid, inputValues) => firebase.app().database().ref(`/Health/${uid}`).update(inputValues).catch(e => console.log(e));

  static getHealth = async (uid, healthRef) => await new Promise((resolve, reject) => {
    healthRef.child(uid).on('value', (snap) => snap.val() ? resolve(snap.val()) : reject())
  });

  static updateDashBoard = (rootUID = null, childUI = null, userObj) =>
    firebase.app().database().ref(`/Dashboard/${rootUID}/${childUI}`).update(userObj).catch(e => console.log(e));

  static updateECG = (uid, data) => firebase.app().database().ref(`/ECG/`).update({[uid]: data}).catch(e => console.log(e));

  //
  // static setECG() {
  //   const ECG = [];
  //   User().then(user => {
  //     firebase.app().database().ref(`/ECG/${user.uid}`).set(ECG).then(() => {
  //       console.log("successfully added ECG!");
  //     }).catch(e => console.log(e));
  //   });
  // }
  //
  // static setAppointments() {
  //   const appointments = [];
  //   User().then(user => {
  //     firebase.app().database().ref(`/Appointments/${user.uid}`).set(appointments).then(() => {
  //       console.log("successfully added Appointments!");
  //     }).catch(e => console.log(e));
  //   });
  // }
  //
  // static setDashboard() {
  //   const patients = {};
  //   User().then(user => {
  //     firebase.app().database().ref(`/Dashboard/${user.uid}`).set(patients).then(() => {
  //       console.log("successfully added to Dashboard!");
  //     }).catch(e => console.log(e));
  //   });
  // }
  //
  static async initialiseMessagesDB(msgTo = "", loggedInUserUid, activeUserUid, type, ref, healthRef) {
    let health = null;
    if (type === "Patient") this.getHealth(loggedInUserUid, healthRef).then(h => health = h).catch(e => console.log(e));
    ref.child(`${loggedInUserUid}<=>${activeUserUid}`).on('value', snap => {
      if (!snap.val()) {
        return ref.child(`${loggedInUserUid}<=>${activeUserUid}`).set({
          name: msgTo,
          uid: loggedInUserUid,
          healthAlert: health ? health.healthAlert : "Not Specified",
        }).then(() => {
          console.log("Successfully initialised messageDB");
        }).catch(e => console.log(e));
      }
    });
  }

  static setMessage(uid, toUid, ref, $message) {
    const message = {timeStamp: moment().format(), msgText: $message};
    ref.child(`${uid}<=>${toUid}/messages`).push(message).then(() => {
      console.log("Successfully added to message");
    }).catch(e => console.log(e));
  }

  static followUser(authUserUID, toFollowUserUID, userTypeObject, creds) {
    // console.log(authUserUID, toFollowUserUID, userTypeObject, creds)
    firebase.app().database().ref(`/Users/${authUserUID}/${userTypeObject}s/${toFollowUserUID}`)
      .set(creds).then(() => {
      console.log("successfully added to DoctorsList!");
    }).catch(e => console.log(e));
  }
}
