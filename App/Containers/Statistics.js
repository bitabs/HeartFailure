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

  DayConfig = () => {
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
        type: 'spline',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        pointStart: Date.UTC(2010, 0, 1),
        pointInterval: 24 * 3600 * 1000 // one day
      }]
    }
  };

  MonthConfig = () => {
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
        tickInterval: 30 * 24 * 3600 * 1000,
        min: Date.UTC(2017, 1, 1),
        max: Date.UTC(2017, 2, 1),
        dateTimeLabelFormats: { // don't display the dummy year
          month: '%b \'%y'
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
        type: 'spline',
        data:[
          [Date.UTC(2017, 1, 1), 50],
          [Date.UTC(2017, 1, 2), 60],
          [Date.UTC(2017, 1, 3), 70],
          [Date.UTC(2017, 1, 4), 80],
          [Date.UTC(2017, 1, 5), 55],
          [Date.UTC(2017, 1, 6), 66],
          [Date.UTC(2017, 1, 7), 67],
          [Date.UTC(2017, 1, 8), 89],
          [Date.UTC(2017, 1, 9), 78],
          [Date.UTC(2017, 1, 10), 91],
          [Date.UTC(2017, 1, 11), 100],
          [Date.UTC(2017, 1, 12), 110],
          [Date.UTC(2017, 1, 13), 87],
          [Date.UTC(2017, 1, 14), 55],
          [Date.UTC(2017, 1, 15), 58],
          [Date.UTC(2017, 1, 16), 60],
          [Date.UTC(2017, 1, 17), 70],
          [Date.UTC(2017, 1, 18), 89],
          [Date.UTC(2017, 1, 19), 80],
          [Date.UTC(2017, 1, 20), 90],
          [Date.UTC(2017, 1, 21), 100],
          [Date.UTC(2017, 1, 22), 80],
          [Date.UTC(2017, 1, 23), 50],
          [Date.UTC(2017, 1, 24), 90],
          [Date.UTC(2017, 1, 25), 55],
          [Date.UTC(2017, 1, 26), 110],
          [Date.UTC(2017, 1, 27), 68],
          [Date.UTC(2017, 1, 28), 72],
          [Date.UTC(2017, 2, 1), 60]
        ]
      }]
    }
  };

  YearConfig = () => {
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
        tickInterval: 30 * 24 * 3600 * 1000,
        min: Date.UTC(2016, 1, 1),
        max: Date.UTC(2017, 1, 1),
        dateTimeLabelFormats: { // don't display the dummy year
          month: '%b \'%y',
          year: '%Y'
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
        type: 'spline',
        data:[
          [Date.UTC(2016, 1, 1), 50],
          [Date.UTC(2016, 2, 10), 60],
          [Date.UTC(2016, 2, 20), 70],
          [Date.UTC(2016, 3, 4), 80],
          [Date.UTC(2016, 3, 10), 55],
          [Date.UTC(2016, 4, 2), 66],
          [Date.UTC(2016, 4, 10), 67],
          [Date.UTC(2016, 5, 1), 89],
          [Date.UTC(2016, 6, 6), 78],
          [Date.UTC(2016, 7, 1), 91],
          [Date.UTC(2016, 8, 13), 100],
          [Date.UTC(2016, 9, 10), 110],
          [Date.UTC(2016, 10, 10), 87],
          [Date.UTC(2016, 11, 13), 55],
          [Date.UTC(2016, 12, 10), 58],
          [Date.UTC(2017, 1, 1), 60]
        ]
      }]
    }
  };

  render() {
    var topBtns = this.state.graphType.map((graph, key) => {
      return <TouchableOpacity style={[styles.touchableCalendarBtn, graph.type === this.state.current ? styles.activeTouchableCalendarBtn : '']} onPress={graph.onPress} key={key}>
        <Text style={[styles.calendarBtn, graph.type === this.state.current ? {color: 'white'} : {color: '#909aae'}]}>{graph.type}</Text>
      </TouchableOpacity>
    });

    const currentConfig = (type) => {
      if (type === "Day") return this.DayConfig();
      if (type === "Month") return this.MonthConfig();
    }

    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.calendarBtnContainer}>
            {topBtns}
          </View>

          {this.state.current === "Day" ? (
            <Chart style={styles.chartContainer} type={"day"} height={300} config={this.DayConfig()} component={"Statistics"}/>
          ): this.state.current === "Month" ? (
            <Chart style={styles.chartContainer} type={"day"} height={300} config={this.MonthConfig()} component={"Statistics"}/>
          ): this.state.current === "Year" ? (
            <Chart style={styles.chartContainer} type={"day"} height={300} config={this.YearConfig()} component={"Statistics"}/>
          ): null}
          <View style={styles.calendarBtnContainer}>
            <View style={styles.calculationContainer}>
              <Text style={styles.calculation}>Min</Text>
              <Text style={[styles.calculation, {marginTop: 10, fontSize: 29, color: '#d0d4db'}]}>50</Text>
            </View>
            <View style={styles.calculationContainer}>
              <Text style={styles.calculation}>Max</Text>
              <Text style={[styles.calculation, {marginTop: 10, fontSize: 29, color: '#d0d4db'}]}>150</Text>
            </View>
            <View style={styles.calculationContainer}>
              <Text style={styles.calculation}>Avg</Text>
              <Text style={[styles.calculation, {marginTop: 10, fontSize: 29, color: '#d0d4db'}]}>112</Text>
            </View>
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
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  calendarBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
    flexDirection: 'column',
    marginBottom: 30,
    marginRight: 20,
    marginLeft: 20,
    padding: 10,
  },
  calculation: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#909aae',
    fontSize: 19
  }
});
