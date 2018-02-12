import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet, Image} from "react-native";
import Chart from "./Chart";
import PropTypes from 'prop-types';
import {Images} from './PreLoadImages';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class PatientBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  config = () => {
    const $this = this;
    return {
      title: {
        text: '',
        style: {
          display: 'none'
        }
      },
      xAxis: {
        visible: false,
      },
      plotOptions: {
        series: {
          color: 'rgba(230, 125, 143, 0.4)',
          lineWidth: 1.5
        }
      },
      yAxis: {
        visible: false
      },
      tooltip: {
        formatter: function() {
          return '<b>' + this.series.name + '</b><br/>' +
            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
            Highcharts.numberFormat(this.y, 2);
        }
      },
      scrollbar: {
        enabled: false
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
      series: [{
        name: 'Random data',
        data: (function() {
          let data = [];
          data = $this.props.ecg;
          return data;
        }()),
        pointStart: Date.now() - 10 * 100,
        pointInterval: 10,
      }]
    }
  };

  render() {

    return(
      <View style={styles.box}>
        <View style={{flexWrap: 'wrap', alignItems: 'center'}}>
          <Image style={styles.userImg} source={Images[this.props.uid]} resizeMode="contain"/>
          <Text style={{marginTop: 10, fontSize: 16, color: '#909aae'}}>{this.props.name}</Text>
          <Text style={{marginTop: 3, fontSize: 13, opacity: 0.5}}>{this.props.profession}</Text>
        </View>
        <View>
          <Chart type={"day"} height={100} config={this.config()} component={"ListOfPatients"} showsHorizontalScrollIndicator={false} />

          <View style={styles.infoContainer}>
            <View style={[styles.infoBox]}>
              <Ionicons style={{marginRight: 10, opacity: 0.5}} name="md-heart" size={15} color="#bccad0" />
              <Text style={{fontSize: 35, color: "#909aae"}}>{this.props.history.bpm}
                <Text style={{fontSize: 13, fontWeight: 'bold', color: 'rgba(144, 154, 174, 0.5)'}}>bpm</Text>
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Ionicons style={{marginRight: 10, opacity: 0.5}} name="md-flame" size={15} color="#bccad0" />
              <Text style={{fontSize: 35, color: "#909aae"}}>{this.props.history.calories}
                <Text style={{fontSize: 13, fontWeight: 'bold', color: 'rgba(144, 154, 174, 0.5)'}}>cal</Text>
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Ionicons style={{marginRight: 10, opacity: 0.5}} name="md-thermometer" size={15} color="#bccad0" />
              <Text style={{fontSize: 35, color: "#909aae"}}>{this.props.history.thermometer}°</Text>
            </View>
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    //elevation: 0.5,
    minWidth: 360
  },
  userImg: {
    marginTop: 40,
    borderRadius: 300,
    height: 70,
    width: 70
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  infoBox: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
    position: 'relative'
  }
});


PatientBox.propTypes = {
  uid         : PropTypes.string.isRequired,
  name        : PropTypes.string.isRequired,
  profilePic  : PropTypes.string.isRequired,
  profession  : PropTypes.string.isRequired,
  history     : PropTypes.object.isRequired,
  ecg         : PropTypes.array.isRequired,
  heartsound  : PropTypes.array.isRequired
};
