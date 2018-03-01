import firebase from 'react-native-firebase';

export default async function User() {
  const user = firebase.app().auth().currentUser;
  if (user) {
    const {_user} = user;
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
