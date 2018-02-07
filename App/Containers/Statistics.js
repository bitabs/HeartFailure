import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ChartView from 'react-native-highcharts';
import Chart from "./Chart";

export default class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "Day"
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Month</Text>
        <Chart type={"day"}/>
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
