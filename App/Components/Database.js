import firebase from 'react-native-firebase';
import moment from 'moment';
import User from './User';

export default class Database {
  constructor() {}


  static createNewUser = newUser => {
    User().then(user => {
      firebase.app().database().ref(`/Users/${user.uid}`).set(newUser).then(() => {
        console.log("Successfully created new user in User table");
      }).catch(e => console.log(e));
    })
  };

  static updateUserTable(userRef, uid, inputValues) {
    const {
      address       = null,
      age           = null,
      bio           = null,
      contactNumber = null,
      dob           = null,
      gender        = null,
      name          = null,
      profession    = null,
    } = inputValues;

    console.log(inputValues);

    userRef.child(uid).update(inputValues).then(() => console.log("successfully Updated User!")).catch(e => console.log(e));


    // User().then(user => {
    //   firebase.app().database().ref(`/Users/${user.uid}`).set({
    //     DOB               : "sd",
    //     address           : "asd",
    //     age               : "asdasd",
    //     contactNumber     : "as",
    //     gender            : "",
    //     profession        : "",
    //     name              : "testing",
    //     bio               : "",
    //     type              : "Patient"
    //   }).then(() => {
    //     console.log("successfully Updated User!");
    //   }).catch(e => console.log(e));
    // });
  }

  // static setHealth() {
  //   const health = {
  //     age         : "",   allergies : [],
  //     bmi         : "",   bpm       : "",
  //     calories    : "",   fat       : "",
  //     healthAlert : "",   height    : "",
  //     thermometer : "",   weight    : ""
  //   };
  //   User().then(user => {
  //     firebase.app().database().ref(`/Health/${user.uid}`).set(health).then(() => {
  //       console.log("successfully added Health!");
  //     }).catch(e => console.log(e));
  //   });
  // }
  //
  static async getHealth(uid, healthRef) {
    return await new Promise((resolve, reject) => {
      healthRef.child(uid).on('value', (snap) => {
        if (snap.val())
          resolve(snap.val());
        else
          reject();
      });
    });
  }
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
          healthAlert: health ? health.healthAlert :  "Not Specified",
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

  // static followDoctor(msgTo, profession, uid, type, healthAlert) {
  //   User().then(user => {
  //     firebase.app().database().ref(`/Users/${user.uid}/Doctors/${uid}`).set({name: msgTo, profession: profession}).then(() => {
  //       console.log("successfully added to DoctorsList!");
  //       this.initialiseMessagesDB(msgTo, healthAlert, uid, type).then(() => {
  //         //this.setMessage(uid, type);
  //       })
  //       //this.setMessage(uid, type, healthAlert, userName);
  //     }).catch(e => console.log(e));
  //   });
  // }
}
