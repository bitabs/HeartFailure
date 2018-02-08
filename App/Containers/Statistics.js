import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Chart from "./Chart";


export default class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'Day',
      current: 'Day',
      graphType: [{
        type: 'Day',
        onPress: () => this.setState({current: "Day"})
      }, {
        type: 'Month',
        onPress: () => this.setState({current: "Month"})
      }, {
        type: 'Year',
        onPress: () => this.setState({current: "Year"})
      }]
    }
  }

  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}

  render() {

    // this.state.graphType.map(graph => console.log(graph));

    var topBtns = this.state.graphType.map((graph, key) => {
      return <TouchableOpacity style={[styles.touchableCalendarBtn, graph.type === this.state.current ? styles.activeTouchableCalendarBtn : '']} onPress={graph.onPress} key={key}>
        <Text style={[styles.calendarBtn, graph.type === this.state.current ? {color: 'white'} : {color: '#909aae'}]}>{graph.type}</Text>
      </TouchableOpacity>
    });

    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.calendarBtnContainer}>
            {topBtns}
          </View>
          <Chart style={styles.chartContainer} type={"day"}/>
          <View style={styles.calendarBtnContainer}>
            <Text style={styles.calculationContainer}>Min</Text>
            <Text style={styles.calculationContainer}>Max</Text>
            <Text style={styles.calculationContainer}>Avg</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

/*
            <TouchableOpacity
              style={[styles.touchableCalendarBtn, this.state.type === "Day" ? styles.activeTouchableCalendarBtn : '']}
              onPress={() => this.setState({type: 'Day'})}
            >
              <Text style={[styles.calendarBtn, this.state.type === "Day" ? {color: 'white'} : {color: '#909aae'}]}>Day</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.touchableCalendarBtn, this.state.type === "Month" ? styles.activeTouchableCalendarBtn : '']}
              onPress={() => this.setState({type: 'Month'})}
            >
              <Text style={[styles.calendarBtn, this.state.type === "Month" ? {color: 'white'} : {color: '#909aae'}]}>Day</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.touchableCalendarBtn, this.state.type === "Year" ? styles.activeTouchableCalendarBtn : '']}
              onPress={() => this.setState({type: 'Year'})}
            >
              <Text style={[styles.calendarBtn, this.state.type === "Year" ? {color: 'white'} : {color: '#909aae'}]}>Day</Text>
            </TouchableOpacity>
 */


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
  touchableCalendarBtn: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
    marginRight: 20,
    marginLeft: 20,
    maxWidth: 100
  },
  activeTouchableCalendarBtn: {
    backgroundColor: '#E67D8F',
    elevation: 5,
    borderRadius: 100 / 2
  },
  calendarBtn: {
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold'
  },
  activeCalendarBtn: {
    color: 'white'
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
