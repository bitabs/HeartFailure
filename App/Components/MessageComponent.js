import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from "react-native";
import Ionicons from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import {Images} from '../Containers/PreLoadImages';

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


  render() {
    return(
      <View style={{marginBottom: 20}}>
        <View style={styles.topContainer}>
          <Image style={styles.userImg} source={Images[this.props.uid]} resizeMode="contain"/>

          <View style={{flex: 1}}>
            <Text numberOfLines={1} style={styles.msgPersonName}>{this.props.name}</Text>
            <Text style={styles.msgTime}>{this.props.dateTime}</Text>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between'}}>
            {this.randomIcon()}

            <View style={styles.tag}><Text style={{fontSize: 8, color: 'white', fontWeight: 'bold'}}>{this.props.healthAlert}</Text></View>
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
