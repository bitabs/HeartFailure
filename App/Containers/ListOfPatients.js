import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";

export default class ListOfPatients extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <View style={styles.page}>
        <View style={styles.box}>
          <Text>Hello jkhkh jkhjkh kjhasdhjkasdhjkashdhaskdhjakshdkjahsdjahsdkjashdakjhdkjashdkjash</Text>
        </View>
        <View style={styles.box}>
          <Text>Hello jkhkh jkhjkh kjhasdhjkasdhjkashdhaskdhjakshdkjahsdjahsdkjashdakjhdkjashdkjash</Text>
        </View>
        <View style={styles.box}>
          <Text>Hello jkhkh jkhjkh kjhasdhjkasdhjkashdhaskdhjakshdkjahsdjahsdkjashdakjhdkjashdkjash</Text>
        </View>
        <View style={styles.box}>
          <Text>Hello jkhkh jkhjkh kjhasdhjkasdhjkashdhaskdhjakshdkjahsdjahsdkjashdakjhdkjashdkjash</Text>
        </View>
        <View style={styles.box}>
          <Text>Hello jkhkh jkhjkh kjhasdhjkasdhjkashdhaskdhjakshdkjahsdjahsdkjashdakjhdkjashdkjash</Text>
        </View>
        <View style={styles.box}>
          <Text>Hello jkhkh jkhjkh kjhasdhjkasdhjkashdhaskdhjakshdkjahsdjahsdkjashdakjhdkjashdkjash</Text>
        </View>
        <View style={styles.box}>
          <Text>Hello jkhkh jkhjkh kjhasdhjkasdhjkashdhaskdhjakshdkjahsdjahsdkjashdakjhdkjashdkjash</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  box: {
    margin: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    elevation: 0.2
  }
});
