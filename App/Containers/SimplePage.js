import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Statistics from "./Statistics";
import ListOfUsers from "./ListOfUsers";
import UserInfo from "./UserInfo";
import PatientMainScreen from "./PatientMainScreen";
import ECG from "./ECG";


export default class SimplePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.Patient = this.Patient.bind(this);
    this.Doctor = this.Doctor.bind(this);
  }


  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  Patient = (state, navigation, userRef, ecgRef, healthRef, dashRef, uid, updateIndex, userView, activeUser, PCRef, DCRef, loggedInUser) => {
    if (!this._isMounted) return;

    const { type, index } = state;

    let toReturn = null;

    if (type === "Patient" && index === 0) toReturn = (<PatientMainScreen
        navigation  = {navigation}
        userRef     = {userRef}
        ecgRef      = {ecgRef}
        healthRef   = {healthRef}
        uid         = {uid}
      />
    );

    if (type === "Patient" && index === 1) toReturn = (<Statistics />);

    if (type === "Patient" && index === 2) toReturn = (<ListOfUsers
        updateIndex = {updateIndex}
        loggedInUser  = {loggedInUser}
        CurrentUserUID = {uid}
        healthRef   = {healthRef}
        userView    = {userView}
        dashRef     = {dashRef}
        PCRef         = {PCRef}
        DCRef         = {DCRef}
        userRef     = {userRef}
        ecgRef      = {ecgRef}
        type        = {type}
        uid         = {uid}
      />
    );

    if (type === "Patient" && index === 3) toReturn = (<UserInfo
        index         = {index}
        User          = {activeUser}
        healthRef     = {healthRef}
        CurrentUserUID = {uid}
        loggedInUser  = {loggedInUser}
        userRef       = {userRef}
        PCRef         = {PCRef}
        DCRef         = {DCRef}
        uid           = {uid}
        type          = {type}
      />
    );

    return toReturn;
  };

  Doctor = (state, navigation, userRef, ecgRef, healthRef, dashRef, uid, updateIndex, userView, activeUser, PCRef, DCRef, loggedInUser) => {
    if (!this._isMounted) return;
    const { type, index } = state;
    let toReturn = null;

    if (type === "Doctor" && index === 0) toReturn = (<PatientMainScreen
        navigation  = {navigation}
        userRef     = {userRef}
        ecgRef      = {ecgRef}
        healthRef   = {healthRef}
        uid         = {uid}
      />
    );

    if (type === "Doctor" && index === 1) toReturn = (<ListOfUsers
        updateIndex = {updateIndex}
        loggedInUser  = {loggedInUser}
        CurrentUserUID = {uid}
        healthRef   = {healthRef}
        userView    = {userView}
        dashRef     = {dashRef}
        PCRef         = {PCRef}
        DCRef         = {DCRef}
        userRef     = {userRef}
        ecgRef      = {ecgRef}
        type        = {type}
        uid         = {uid}
      />
    );

    if (type === "Doctor" && index === 2) toReturn = (<UserInfo
        index         = {index}
        User          = {activeUser}
        healthRef     = {healthRef}
        CurrentUserUID = {uid}
        loggedInUser  = {loggedInUser}
        userRef       = {userRef}
        PCRef         = {PCRef}
        DCRef         = {DCRef}
        uid           = {uid}
        type          = {type}
      />
    );

    return toReturn;
  };

  render() {
    const {state, navigation, userRef, ecgRef, dashRef, healthRef, uid, updateIndex, userView, activeUser, PCRef, DCRef, loggedInUser} = this.props;
    return (
      <View style={styles.page}>

        {state.type === "Patient" && this._isMounted ? this.Patient(
          state, navigation, userRef, ecgRef, healthRef,
          dashRef, uid, updateIndex, userView, activeUser,
          PCRef, DCRef, loggedInUser
        ): state.type === "Doctor" && this._isMounted ? this.Doctor(
          state, navigation, userRef, ecgRef, healthRef,
          dashRef, uid, updateIndex, userView, activeUser,
          PCRef, DCRef, loggedInUser
        ): null}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#f3f3f3',
  }
});
