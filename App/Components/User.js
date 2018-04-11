import firebase from 'react-native-firebase';

export default async function User() {
  // get the current user's auth details
  const user = firebase.app().auth().currentUser;
  // if the user is logged in
  if (user) {
    // es6 destructuring
    const {_user} = user;

    // return the values from the object
    return {
      uid           : _user.uid,
      displayName   : _user.displayName,
      email         : _user.email,
      emailVerified : _user.emailVerified,
      phoneNumber   : _user.phoneNumber,
      photoURL      : _user.photoURL
    };
  }
};
