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
        <View style={styles.calendarBtnContainer}>
          <Text style={styles.calendarBtn}>Month</Text>
          <Text style={styles.calendarBtn}>Day</Text>
          <Text style={styles.calendarBtn}>Year</Text>
        </View>
        <Chart style={styles.chartContainer} type={"day"}/>
        <View style={styles.calendarBtnContainer}>
          <Text style={styles.calculationContainer}>Min</Text>
          <Text style={styles.calculationContainer}>Max</Text>
          <Text style={styles.calculationContainer}>Avg</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection:'column',
    justifyContent: 'space-between'
  },
  calendarBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  calendarBtn: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
    marginRight: 20,
    marginLeft: 20,
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold',
    color: 'white',
    borderRadius: 100 / 2,
    backgroundColor: '#c8d6dc',
    elevation: 5
  },
  chartContainer: {
    // flex: 20
  },
  calculationContainer: {
    flex: 1,
    marginBottom: 30,
    marginRight: 20,
    marginLeft: 20,
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold',
    color: '#909aae',
    fontSize: 19
  }
});
