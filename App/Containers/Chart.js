import React, {Component} from 'react';
import {View, Text, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import ChartView from 'react-native-highcharts';

const Highcharts = "Highcharts";

export default class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "day",
      height: this.props.height,
      config: this.props.config,
      chartLoading: true,
      options: {
        global: {
          useUTC: false
        }
      }
    }
  };

  componentDidMount() {
    this.setState({loading: true});
  }

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
        style={{height: this.props.height, width: this.props.width || Dimensions.get('window').width}}
        config={this.props.config}
        options={this.props.options}
        stock={this.props.stock || false}
        scalesPageToFit={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    )
  }
}

Chart.propTypes = {
  height        : PropTypes.number.isRequired,
  config        : PropTypes.object.isRequired,
  component     : PropTypes.string.isRequired
};
