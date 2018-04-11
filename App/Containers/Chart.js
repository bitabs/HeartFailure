import React, {Component} from 'react'

// predefined component of react
import {Dimensions} from 'react-native'

// strict types for props
import PropTypes from 'prop-types'

// we need the highcharts support in react native
import ChartView from 'react-native-highcharts'

// this is important, the name should be specified as below
const Highcharts = "Highcharts"

/**
 * This component will take the config object from the props, and
 * pass it to highcharts to visualise. The object must of the
 * same structure as highcharts predefined obj
 * ==============================================================
 */
export default class Chart extends Component {
  constructor(props) {
    super(props);

    /**
     * Let us identify unique props for this component
     * @type {{
     *  type        : string, height  : Number, config: Object,
     *  chartLoading: boolean, options: {global: {useUTC: boolean}}
     * }}
     */
    this.state = {
      // the default type for the graph is day
      type: "day",

      // the chart needs to have specific height
      height: this.props.height,

      // this is the object that comes from other components
      config: this.props.config,

      // important for checking if the graph has loaded
      chartLoading: true,

      // highcharts default params for options
      options: {
        global: {
          useUTC: false
        }
      }
    }
  };

  /**
   * When the component loads, tell others that the component is
   * ready
   * ==============================================================
   */
  componentDidMount() {
    this.setState({loading: true});
  }

  /**
   * Default params for highcharts
   * ==============================================================
   */
  options = () => {
    this.setState({
      options: {
        global: {
          useUTC: false
        }
      }
    })
  };


  /**
   * When the component is ready, pass it to highcharts for
   * visualisation
   * ==============================================================
   * @return {XML}
   */
  render() {
    return(
      <ChartView
        style={{
          height: this.props.height,
          width: this.props.width || Dimensions.get('window').width
        }}
        config={this.props.config}
        options={this.props.options}
        // important if we want the chart to have scrollbar
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

// let us define some types for our props
Chart.propTypes = {
  height        : PropTypes.number.isRequired,
  config        : PropTypes.object.isRequired,
};
