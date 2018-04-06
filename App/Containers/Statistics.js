import React, {Component} from 'react'

// predefined component of react
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'

// chart component to view the history
import Chart from "./Chart"

// importing styles for this component
import styles from './Styles/StatisticsStyles.js'

/**
 * This component will represent the history of the user. (i.e.
 * give history of the recordings taken.
 * ==============================================================
 */
export default class Statistics extends Component {
  constructor(props) {
    super(props);

    /**
     * Each graph is grouped based on day, month and year.
     * They visualise of min/max and average of the data
     * @type {{type: string, current: string, graphType: [null,null,null]}}
     */
    this.state = {
      type: 'Day',
      current: 'Day',
      graphType: [
        { type: 'Day',   onPress: () => this.setState({current: "Day"})},
        { type: 'Month', onPress: () => this.setState({current: "Month"})},
        { type: 'Year',  onPress: () => this.setState({current: "Year"})}]
    }
  }

  /**
   * This graph will represent the data summarised by day
   * ==============================================================
   * @constructor
   */
  DayConfig = () => {
    return {
      title: {text: '', style: {display: 'none'}},
      xAxis: {
        title                 : {text: ''},
        type                  : 'datetime',
        dateTimeLabelFormats  : {day: '%e of %b'},
        lineWidth             : 0,
        minorGridLineWidth    : 0,
        minorTickLength       : 0,
        tickLength            : 0,
        lineColor             : 'transparent',
        labels                : {style: {color: '#959bad'}},
      },
      yAxis: {
        title                 : {text: ''},
        labels                : {style: {color: '#959bad'}},
        gridLineColor         : 'rgba(188, 202, 208, 0.5)'
      },
      legend                  : {enabled: false},
      exporting               : {enabled: false},
      credits                 : {enabled: false},
      plotOptions             : {
        series  : { color: '#E67D8F', lineWidth: 2, shadow: true},
        line    : { marker: {enabled: true}}
      },
      series: [{
        type          : 'spline',
        data          : [
          29.9  , 71.5  , 106.4, 129.2, 144.0,
          176.0 , 135.6 , 148.5, 216.4, 194.1,
          95.6, 54.4
        ],
        pointStart    : Date.UTC(2010, 0, 1),
        pointInterval : 24 * 3600 * 1000 // one day
      }]
    }
  };

  /**
   * This graph will represent the data summarised by month
   * ==============================================================
   * @constructor
   */
  MonthConfig = () => {
    return {
      title: {text: '', style: {display: 'none'}},
      xAxis: {
        title                 : {text: ''},
        type                  : 'datetime',
        tickInterval          : 30 * 24 * 3600 * 1000,
        min                   : Date.UTC(2017, 1, 1),
        max                   : Date.UTC(2017, 2, 1),
        dateTimeLabelFormats  : {month: '%b \'%y'},
        lineWidth             : 0,
        minorGridLineWidth    : 0,
        minorTickLength       : 0,
        tickLength            : 0,
        lineColor             : 'transparent',
        labels                : {style: {color: '#959bad'}},
      },
      yAxis: {
        title                 : {text: ''},
        labels                : {style: {color: '#959bad'}},
        gridLineColor         : 'rgba(188, 202, 208, 0.5)'
      },
      legend                  : {enabled: false},
      exporting               : {enabled: false},
      credits                 : {enabled: false},
      plotOptions             : {
        series  : { color: '#E67D8F', lineWidth: 2, shadow: true },
        line    : { marker: {enabled: true} }
      },
      series: [{
        type: 'spline',
        data:[
          [Date.UTC(2017, 1, 1), 50],   [Date.UTC(2017, 1, 2), 60],
          [Date.UTC(2017, 1, 3), 70],   [Date.UTC(2017, 1, 4), 80],
          [Date.UTC(2017, 1, 5), 55],   [Date.UTC(2017, 1, 6), 66],
          [Date.UTC(2017, 1, 7), 67],   [Date.UTC(2017, 1, 8), 89],
          [Date.UTC(2017, 1, 9), 78],   [Date.UTC(2017, 1, 10), 91],
          [Date.UTC(2017, 1, 11), 100], [Date.UTC(2017, 1, 12), 110],
          [Date.UTC(2017, 1, 13), 87],  [Date.UTC(2017, 1, 14), 55],
          [Date.UTC(2017, 1, 15), 58],  [Date.UTC(2017, 1, 16), 60],
          [Date.UTC(2017, 1, 17), 70],  [Date.UTC(2017, 1, 18), 89],
          [Date.UTC(2017, 1, 19), 80],  [Date.UTC(2017, 1, 20), 90],
          [Date.UTC(2017, 1, 21), 100], [Date.UTC(2017, 1, 22), 80],
          [Date.UTC(2017, 1, 23), 50],  [Date.UTC(2017, 1, 24), 90],
          [Date.UTC(2017, 1, 25), 55],  [Date.UTC(2017, 1, 26), 110],
          [Date.UTC(2017, 1, 27), 68],  [Date.UTC(2017, 1, 28), 72],
          [Date.UTC(2017, 2, 1), 60]
        ]
      }]
    }
  };

  /**
   * This graph will represent the data summarised by year
   * ==============================================================
   * @constructor
   */
  YearConfig = () => {
    return {
      title: {text: '', style: {display: 'none'}},
      xAxis: {
        title                 : {text: ''},
        type                  : 'datetime',
        tickInterval          : 30 * 24 * 3600 * 1000,
        min                   : Date.UTC(2017, 1, 1),
        max                   : Date.UTC(2017, 2, 1),
        dateTimeLabelFormats  : {month: '%b \'%y', year: '%Y'},
        lineWidth             : 0,
        minorGridLineWidth    : 0,
        minorTickLength       : 0,
        tickLength            : 0,
        lineColor             : 'transparent',
        labels                : {style: {color: '#959bad'}},
      },
      yAxis                   : {
        title                 : {text: ''},
        labels                : {style: {color: '#959bad'}},
        gridLineColor         : 'rgba(188, 202, 208, 0.5)'
      },
      legend                  : {enabled: false},
      exporting               : {enabled: false},
      credits                 : {enabled: false},
      plotOptions             : {
        series                : {color: '#E67D8F',lineWidth: 2,shadow: true},
        line                  : {marker: {enabled: true}}
      },
      series: [{
        type: 'spline',
        data:[
          [Date.UTC(2016, 1, 1), 50],   [Date.UTC(2016, 2, 10), 60],
          [Date.UTC(2016, 2, 20), 70],  [Date.UTC(2016, 3, 4), 80],
          [Date.UTC(2016, 3, 10), 55],  [Date.UTC(2016, 4, 2), 66],
          [Date.UTC(2016, 4, 10), 67],  [Date.UTC(2016, 5, 1), 89],
          [Date.UTC(2016, 6, 6), 78],   [Date.UTC(2016, 7, 1), 91],
          [Date.UTC(2016, 8, 13), 100], [Date.UTC(2016, 9, 10), 110],
          [Date.UTC(2016, 10, 10), 87], [Date.UTC(2016, 11, 13), 55],
          [Date.UTC(2016, 12, 10), 58], [Date.UTC(2017, 1, 1), 60]
        ]
      }]
    }
  };

  /**
   * It will call the graphs and show it to the user
   * ==============================================================
   * @return {XML}
   */
  render() {
    // let us see which graph should be shown
    const {current} = this.state;

    // the button to which we toggle from day, month to year
    let topBtns = this.state.graphType.map((graph, key) => {
      return (
        <TouchableOpacity
          style={[
            styles.touchableCalendarBtn,
            graph.type === current
              ? styles.activeTouchableCalendarBtn
              : ''
          ]}
          onPress={graph.onPress} key={key}>
          <Text style={[
            styles.calendarBtn,
            graph.type === current
              ? {color: 'white'}
              : {color: '#909aae'}
          ]}>{graph.type}</Text>
        </TouchableOpacity>
      )
    });

    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.calendarBtnContainer}>
            {topBtns}
          </View>

          {this.state.current === "Day" ? (
            <Chart
              style={styles.chartContainer}
              type={"day"}
              height={300}
              config={this.DayConfig()}
            />
          ): this.state.current === "Month" ? (
            <Chart
              style={styles.chartContainer}
              type={"day"}
              height={300}
              config={this.MonthConfig()}
            />
          ): this.state.current === "Year" ? (
            <Chart
              style={styles.chartContainer}
              type={"day"}
              height={300}
              config={this.YearConfig()}
            />
          ): null}
          <View style={styles.calendarBtnContainer}>
            <View style={styles.calculationContainer}>
              <Text style={styles.calculation}>Min</Text>
              <Text style={[
                styles.calculation, styles.overrideCalculation
              ]}>50</Text>
            </View>
            <View style={styles.calculationContainer}>
              <Text style={styles.calculation}>Max</Text>
              <Text style={[
                styles.calculation, styles.overrideCalculation
              ]}>150</Text>
            </View>
            <View style={styles.calculationContainer}>
              <Text style={styles.calculation}>Avg</Text>
              <Text style={[
                styles.calculation, styles.overrideCalculation
              ]}>112</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
