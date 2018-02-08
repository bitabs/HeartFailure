import * as React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import ECG from "./ECG";
import HeartBeat from "../Components/HeartBeat";
import Statistics from "./Statistics";

export default function CurrentStateIndicator({ state, style }: *) {

  return (
    <View style={[styles.page, style]}>
      {
        state.index === 0 ?
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
            <HeartBeat/>
            <ECG/>
          </View>
        : <Statistics />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
