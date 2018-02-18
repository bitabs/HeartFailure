import firebase from 'react-native-firebase';
import User from './User';

export default class Database {

  static setUser(user) {
    const $user = {
      DOB               : "",
      address           : "",
      age               : "",
      contactNumber     : "",
      gender            : "",
      profession        : "",
      ...user
    };
    User().then(user => {
      firebase.app().database().ref(`/Users/${user.uid}`).set($user).then(() => {
        console.log("successfully added User!");
      }).catch(e => console.log(e));
    });
  }

  static setHealth() {
    const health = {
      age         : "",   allergies : [],
      bmi         : "",   bpm       : "",
      calories    : "",   fat       : "",
      healthAlert : "",   height    : "",
      thermometer : "",   weight    : ""
    };
    User().then(user => {
      firebase.app().database().ref(`/Health/${user.uid}`).set(health).then(() => {
        console.log("successfully added Health!");
      }).catch(e => console.log(e));
    });
  }

  static setECG() {
    const ECG = [];
    User().then(user => {
      firebase.app().database().ref(`/ECG/${user.uid}`).set(ECG).then(() => {
        console.log("successfully added ECG!");
      }).catch(e => console.log(e));
    });
  }

  static setAppointments() {
    const appointments = [];
    User().then(user => {
      firebase.app().database().ref(`/Appointments/${user.uid}`).set(appointments).then(() => {
        console.log("successfully added Appointments!");
      }).catch(e => console.log(e));
    });
  }

  static setDashboard() {
    const patients = {};
    User().then(user => {
      firebase.app().database().ref(`/Dashboard/${user.uid}`).set(patients).then(() => {
        console.log("successfully added to Dashboard!");
      }).catch(e => console.log(e));
    });
  }
}
