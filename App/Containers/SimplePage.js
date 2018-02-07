import * as React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import { List, ListItem } from "react-native-elements";
import ECG from "./ECG";
import HeartBeat from "../Components/HeartBeat";
import Statistics from "./Statistics";

export default function CurrentStateIndicator({ state, style }: *) {

  return (
    <View style={[styles.page, style]}>
      {
         state.index === 0 ?
           <View style={[styles.page, style]}>
             <HeartBeat/>
             <ECG/>
           </View>
        : <Statistics/>
      }
    </View>
  );
}

/*
TODO uncommont this for data retrieval from firebase:
    <View style={[styles.page, style]}>
      <List containerStyle={{marginBottom: 20, width: 390}}>
        {
          state.data.map((l, i) => (
            <ListItem
              key={i}
              title={l.name}
            />
          ))
        }
      </List>
    </View>
* */

/*

      <List containerStyle={{marginBottom: 20, width: 390}}>
        {
          state.data.map((l, i) => (
            <ListItem
              key={i}
              title={l.name}
            />
          ))
        }
      </List>


      <View style={styles.container}>
        <Text style={styles.text}>
          Current route is: {state.routes[state.index].title || state.index}
        </Text>
      </View>
 */

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, .1)',
    borderRadius: 3,
  },
  text: {
    color: 'black',
    textAlign: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
