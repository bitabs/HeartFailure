// this class will only deal with firebase DB
import firebase from '../../firebase'

// we need the timestamp of the message that is to be saved
import moment from 'moment';

export default class Database {

  /**
   * Call this method to create a new user with their UID and
   * @param uid
   * @param newUser
   */
  static createNewUser = (uid, newUser) =>
    firebase.database().ref(`/Users/${uid}`)
      .set(newUser)
      .catch(e => e);

  /**
   * Call this method if you want to update the user obj in firebase
   * @param uid
   * @param inputValues
   */
  static updateUserTable = (uid, inputValues) =>
    firebase.database().ref(`/Users/${uid}`)
      .update(inputValues)
      .catch(e => e);

  /**
   * Call this method if you want to update the health object in firebase
   * @param uid
   * @param inputValues
   */
  static updateHealthTable = (uid, inputValues) =>
    firebase.database().ref(`/Health/${uid}`)
      .update(inputValues)
      .catch(e => e);

  /**
   * Call this method if you want to pass in the new values of ECG to firebase
   * @param uid
   * @param data
   */
  static updateECG = (uid, data) =>
    firebase.database().ref(`/ECG/`)
      .update({[uid]: data})
      .catch(e => e);

  /**
   * Call this method to retrieve the health data
   * @param uid
   * @param healthRef
   */
  static getHealth = async (uid, healthRef) => await new Promise((resolve, reject) =>
    healthRef.child(uid).on('value', (snap) => snap.val()
      ? resolve(snap.val())
      : reject())
  );

  /**
   * Call this method if you want to send the message from the user to the selected user
   * @param uid
   * @param toUid
   * @param ref
   * @param $message
   */
  static setMessage = (uid, toUid, ref, $message) =>
    ref.child(`${uid}<=>${toUid}/messages`).push({
      timeStamp: moment().format(),
      msgText: $message
    }).catch(e => e);

  /**
   * Call this method if you want to make the user follow the selected user
   * @param authUserUID
   * @param toFollowUserUID
   * @param userTypeObject
   * @param creds
   */
  static followUser = (authUserUID, toFollowUserUID, userTypeObject, creds) =>
    firebase.database().ref(`/Users/${authUserUID}/${userTypeObject}/${toFollowUserUID}`)
      .set(creds)
      .catch(e => e);

  /**
   * Call this method if you want to initialise the DB for new users
   * @param msgTo
   * @param loggedInUserUid
   * @param activeUserUid
   * @param type
   * @param ref
   * @param healthRef
   * @return {Promise.<void>}
   */
  static async initialiseMessagesDB (
    msgTo = "", loggedInUserUid, activeUserUid, type, ref, healthRef
  ) {
    let health = null;
    if (type === "Patient")
      this.getHealth(loggedInUserUid, healthRef)
        .then(h => health = h)
        .catch(e => e);

    ref.child(`${loggedInUserUid}<=>${activeUserUid}`).on('value', snap => {
      if (!snap.val()) {
        return ref.child(`${loggedInUserUid}<=>${activeUserUid}`).set({
          name: msgTo, uid: loggedInUserUid, healthAlert: health
            ? health.healthAlert
            : "Not Specified"
        }).catch(e => e);
      }
    });
  }
}
