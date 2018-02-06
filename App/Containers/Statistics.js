import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Month</Text>
        <Text>Graph</Text>
        <Text>Measurement</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
