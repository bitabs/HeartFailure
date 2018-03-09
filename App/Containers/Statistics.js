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

  config = () => {
    return {
      title: {
        text: '',
        style: {
          display: 'none'
        }
      },
      xAxis: {
        title: {
          text: ''
        },
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%e of %b'
        },
        lineWidth: 0,
        minorGridLineWidth: 0,
        minorTickLength: 0,
        tickLength: 0,
        lineColor: 'transparent',
        labels: {
          style: {
            color: '#959bad'
          }
        },
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
          style: {
            color: '#959bad'
          }
        },
        gridLineColor: 'rgba(188, 202, 208, 0.5)'
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          color: '#E67D8F',
          lineWidth: 2,
          shadow: true
        },
        line: {
          marker: {
            enabled: true
          }
        }
      },
      series: [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        pointStart: Date.UTC(2010, 0, 1),
        pointInterval: 24 * 3600 * 1000 // one day
      }]
    }
  };

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
          <Chart style={styles.chartContainer} type={"day"} height={300} config={this.config()} component={"Statistics"}/>
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
