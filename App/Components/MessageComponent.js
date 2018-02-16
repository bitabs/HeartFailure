import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from "react-native";
import Ionicons from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import {Images} from '../Containers/PreLoadImages';
import TimeAgo from 'react-native-timeago';

export default class MessageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { }

  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  randomIcon = () => {
    switch (this.getRandomInt(0, 2))  {
      case 0  : return (<Ionicons name="monitor" size={15} color="#bccad0" />);
      case 1  : return (<Ionicons name="smartphone" size={15} color="#bccad0" />);
      case 2  : return (<Ionicons name="tablet" size={15} color="#bccad0" />);
      default : return null
    }
  };

  hasWhiteSpace = (s) => {
    return s.indexOf(' ') >= 0;
  };

  dynamicTagColor = (text) => {
    if (!this.hasWhiteSpace(text))
      text.split('').join(' ');

    console.log(this.timeAgo( (new Date('December 17, 1995 03:24:00')) ));
    if (
      ![
        'S T A B L E',
        'A V E R A G E',
        'H I G H'
      ].includes(text)
    ) return;

    switch (text) {
      case 'S T A B L E'    : return '#44C8A6';
      case 'A V E R A G E'  : return '#FB8469';
      case 'H I G H'        : return '#E67D8F';
      default:
        return '';
    }
  };

  timeAgo = (time) => {
    var units = [
      { name: "second", limit: 60, in_seconds: 1 },
      { name: "minute", limit: 3600, in_seconds: 60 },
      { name: "hour", limit: 86400, in_seconds: 3600  },
      { name: "day", limit: 604800, in_seconds: 86400 },
      { name: "week", limit: 2629743, in_seconds: 604800  },
      { name: "month", limit: 31556926, in_seconds: 2629743 },
      { name: "year", limit: null, in_seconds: 31556926 }
    ];

    var diff = (new Date() - new Date(time*1000)) / 1000;
    if (diff < 5) return "now";

    var i = 0, unit;

    while (unit = units[i++]) {
      if (diff < unit.limit || !unit.limit){
        var diff =  Math.floor(diff / unit.in_seconds);
        return diff + " " + unit.name + (diff>1 ? "s" : "");
      }
    }
  };

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image style={styles.userImg} source={Images[this.props.uid]} resizeMode="contain"/>

          <View style={{flex: 1}}>
            <Text numberOfLines={1} style={styles.msgPersonName}>{this.props.name}</Text>
            <TimeAgo style={styles.msgTime} time={'2018-02-15T06:24:44.124Z'} />
          </View>
          <View style={{flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between'}}>
            {this.randomIcon()}

            <View style={[styles.tag, {backgroundColor: this.dynamicTagColor(this.props.healthAlert)} ]}>
              <Text style={{fontSize: 8, color: 'white', fontWeight: 'bold'}}>{this.props.healthAlert}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.msgText} numberOfLines={2}>{this.props.comment}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20, paddingBottom: 10,
    //borderBottomWidth: 1,
    //borderBottomColor: 'rgba(188,202,208, 0.1)'
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: 'red'
  },
  userImg: {
    borderRadius: 400,
    height: 40,
    width: 40,
    marginRight: 10
  },
  msgPersonName: {
    fontSize: 15,
    color: '#bccad0'
  },
  msgTime: {
    fontSize: 12,
    color: 'rgba(188,202,208, 0.7)'
  },
  tag: {
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 3,
    backgroundColor: '#E67D8F'
  },
  msgText: {
    marginTop: 5,
    fontSize: 13,
    color: 'rgba(188,202,208, 0.8)'
  }
});

MessageComponent.propTypes = {
  navigation        : PropTypes.object,
  name              : PropTypes.string.isRequired,
  uid               : PropTypes.string.isRequired,
  comment           : PropTypes.string.isRequired,
  dateTime          : PropTypes.string.isRequired,
  healthAlert       : PropTypes.string.isRequired
};
