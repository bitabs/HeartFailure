import * as React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import ECG from "./ECG";
import HeartBeat from "../Components/HeartBeat";
import Statistics from "./Statistics";
import Patient from "./Patient";
import Doctor from "./Doctor";

export default function CurrentStateIndicator({ state, style, userType, updateIndex, currentUser, Patients, Doctors }: *) {
  return (
    <View style={[styles.page, style, userType === "Doctor" ? {backgroundColor: '#f8f8f8'} : ""]}>
      {
        userType === "Patient" ? (
          <Patient
            index       = {state.index}
            Doctors     = {Doctors}
          />
        ) : (
          <Doctor
            index       = {state.index}
            updateIndex = {updateIndex}
            Patients    = {Patients}
          />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink'
  }
});
