// predefined components of react
import React, {Component} from 'react'

// import highcharts
import ChartView from 'react-native-highcharts'

// strict types for the props of the component
import PropTypes from 'prop-types'

/**
 * This component will act a holder for ECG. Current it uses
 * dummy data
 * ==============================================================
 */
export default class ECG extends Component {
  constructor(props) {
    super(props);

    // some default ECG values
    this.state = {
      data: [
        0, 0, 0, 0, 0.0000050048828125, 0.0000137939453125,
        0.000049560546875, 0.00008740234375, 0.00015966796875,
        0.000262451171875, 0.0003975830078125, 0.0005687255859375,
        0.0007802734375, 0.001037353515625, 0.0013468017578125,
        0.00172119140625, 0.0021756591796875, 0.0027232666015625,
        0.0033880615234375, 0.004206787109375, 0.0052380371093750005,
        0.006586181640625, 0.008400146484375001, 0.010904296875,
        0.0144892578125, 0.0196798095703125, 0.049684204101562504,
        0.0886883544921875, 0.11185363769531251, 0.134164306640625,
        0.137352294921875, 0.1160369873046875, 0.08516308593750001,
        0.0539765625, 0.014997436523437501, -0.015882568359375,
        -0.0387554931640625, -0.06125732421875, -0.0745780029296875,
        -0.07479357910156251, -0.0725338134765625, -0.0418538818359375,
        0.08582861328125001, 0.397717529296875, 0.8136408691406251,
        1.2295617980957032, 0.9944150390625001, 0.2824605712890625,
        -0.38949267578125, -0.597251220703125, -0.425675537109375,
        -0.1537947998046875, -0.0500914306640625, -0.0111041259765625,
        0.0027451171875, 0.0071739501953125, 0.008443359375,
        0.0094327392578125, 0.012530517578125, 0.0176046142578125,
        0.0300162353515625, 0.0433489990234375, 0.056962646484375004,
        0.0704832763671875, 0.0770511474609375, 0.0898175048828125,
        0.10311853027343751, 0.117046142578125, 0.1312630615234375,
        0.1529300537109375, 0.167607177734375, 0.1899068603515625,
        0.2124422607421875, 0.235044677734375, 0.2575535888671875,
        0.2724073486328125, 0.286978271484375, 0.3007579345703125,
        0.3067425537109375, 0.3106370849609375, 0.303756103515625,
        0.2897236328125, 0.25916931152343753, 0.2200599365234375,
        0.1728209228515625, 0.133416259765625, 0.086224853515625,
        0.05493408203125, 0.02409423828125, 0.00922607421875,
        -0.0043409423828125, -0.0097349853515625, -0.013127685546875,
        -0.01423095703125, -0.013834716796875, -0.012556030273437501,
        -0.010675048828125, -0.00835888671875, -0.0057305908203125,
        -0.0000562744140625
      ]
    };
  }

  /**
   * Show the chart when the component is ready
   * ==============================================================
   * @return {XML}
   */
  render() {

    // local reference to `this`
    const self = this;

    // the name of the chart will be used as a function call
    let Highcharts = 'Highcharts';

    // the object that will be passed to highcharts with options
    let conf = {
      chart: {
        type: 'line',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
          /**
           * This method is called when the graph gets updated
           */
          load: function () {
            // we need the data that already exists from the series
            const series = this.series[0];
            // split it
            const data = series.options.data.slice();

            // update our x and y based on the current time
            let closure = (() => {
              let _x = -1;
              return () => {
                _x = (_x + 1) % data.length;
                return {
                  x: Date.now(),
                  y: data[_x]
                };
              };
            })();

            /**
             * For smooth animation, we shall update the data every
             * 10 milliseconds
             */
            setInterval(() => {
              // pass the new values from the default values of ECG
              series.addPoint(
                [closure().x, closure().y],
                true, true, false
              );
            }, 10);
          }
        }
      },
      title: {text: '', style: {display: 'none'}},
      xAxis: {visible: false},
      plotOptions: {
        series: {color: 'rgba(188, 202, 208, 0.5)', lineWidth: 1.5}
        },
      yAxis: {visible: false},
      tooltip: {
        formatter: function() {
          return '<b>' + this.series.name + '</b><br/>' +
            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
            Highcharts.numberFormat(this.y, 2);
        }
      },
      legend: {enabled: false},
      exporting: {enabled: false},
      credits: {enabled: false},
      series: [{
        type: 'spline',
        name: 'Random data',
        data: (function() {
          let data = [];
          data = self.state.data;
          return data;
        }()),
        pointStart: Date.now() - 10 * 100,
        pointInterval: 10,
      }]
    };
    const options = {global: {useUTC: false}};

    return(
      <ChartView
        style={{
          height: this.props.height,
          width: this.props.width
        }}
        config={conf}
        options={options}
        scalesPageToFit={false}
        automaticallyAdjustContentInsets={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    )

  }
}

// some prop types for our props
ECG.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};
