import React, {Component} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import ChartView from 'react-native-highcharts';

const Highcharts = "Highcharts";

export default class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type    : "day",
      config  : {},
      options : {}
    }
  }

  componentDidMount() {
    this.chart();
    this.options();
  }


  chart = () => {
    this.setState({
      config: {
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
            color: '#bccad0',
            lineWidth: 2
          },
          line: {
            marker: {
              enabled: false
            }
          }
        },
        series: [{
          data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
          pointStart: Date.UTC(2010, 0, 1),
          pointInterval: 24 * 3600 * 1000 // one day
        }]
      }
    })
  };

  options = () => {
    this.setState({
      options: {
        global: {
          useUTC: false
        }
      }
    })
  };


  render() {
    return(
      <ChartView
        style={{
          height: 400,
          width: 410
        }}
        config={this.state.config}
        options={this.state.options}
        scalesPageToFit={false}
        automaticallyAdjustContentInsets={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    )
  }
}

Chart.propTypes = {
  type: PropTypes.string
};
