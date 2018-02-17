import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet, Image, Animated, Easing} from "react-native";
import Chart from "./Chart";
import PropTypes from 'prop-types';
import {Images} from './PreLoadImages';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class PatientBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wait: true,
    };
    this.animatedValue = new Animated.Value(1)
  }

  componentDidMount() {
    this.spin();
  }

  spin () {
    this.animatedValue.setValue(1);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 0,
        duration: 4000,
        delay: 2000,
        easing: Easing.linear
      }
    ).start( () => this.setState({wait: false}));
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
          lineWidth: 1.5,
          marker: {
            enabled: false
          },
        },
        line: {
          marker: {
            enabled: false
          },
          states: {
            select: {
              lineWidth: 1.5
            }
          },
          events: {
            click: function() {
              this.setState(this.state === 'select' ? '' : 'select');
            }
          }
        }
      },
      yAxis: {
        visible: false
      },
      tooltip: { enabled: false },
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
          data = $this.props.Patient.ecg;
          return data;
        }()),
        pointStart: Date.now() - 10 * 100,
        pointInterval: 10,
      }]
    }
  };

  render() {
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1]
    });

    let returnThis = (
      <View style={[styles.box, {position: 'relative'}]}>
        <View style={{flexWrap: 'wrap', alignItems: 'center'}}>
          <View style={{position: 'relative'}}>
            <Image style={styles.userImg} source={Images[this.props.uid]} resizeMode="contain"/>
            <View style={{position: 'absolute', bottom: 0, backgroundColor: '#59D0D0', padding: 2, width: 20,
              height: 20, borderRadius: 100/2, alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons style={{fontWeight: '900'}} name="md-checkmark" size={15} color="white" />
            </View>
          </View>
          <Text style={{marginTop: 10, fontSize: 16, color: '#909aae'}}>{this.props.Patient.name}</Text>
          <Text style={{marginTop: 3, fontSize: 13, opacity: 0.5, color: 'rgba(144, 154, 174, 0.8)'}}>{this.props.Patient.profession}</Text>
        </View>
        <View>
          <Chart type={"day"} height={100} config={this.config()} component={"ListOfPatients"} showsHorizontalScrollIndicator={false} />

          <View style={styles.infoContainer}>
            <View style={[styles.infoBox]}>
              <Ionicons style={{marginRight: 10, opacity: 0.5}} name="md-heart" size={15} color="#bccad0" />
              <Text style={{fontSize: 30, color: "#909aae"}}>{this.props.Patient.health.bpm}
                <Text style={{fontSize: 13, fontWeight: 'bold', color: 'rgba(144, 154, 174, 0.5)'}}>bpm</Text>
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Ionicons style={{marginRight: 10, opacity: 0.5}} name="md-flame" size={15} color="#bccad0" />
              <Text style={{fontSize: 30, color: "#909aae"}}>{this.props.Patient.health.calories}
                <Text style={{fontSize: 13, fontWeight: 'bold', color: 'rgba(144, 154, 174, 0.5)'}}>cal</Text>
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Ionicons style={{marginRight: 10, opacity: 0.5}} name="md-thermometer" size={15} color="#bccad0" />
              <Text style={{fontSize: 30, color: "#909aae"}}>{this.props.Patient.health.thermometer}°</Text>
            </View>
          </View>

        </View>
        {
          this.state.wait ? (
            <Animated.View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'white', opacity} } />
          ) : null
        }
      </View>
    );

    return(
      <View>
        {
          returnThis
        }
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
  uid    : PropTypes.string.isRequired,
  Patient: PropTypes.object.isRequired
};
