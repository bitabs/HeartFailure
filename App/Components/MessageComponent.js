// We need to extend our component
import React, {Component} from 'react';

// predefined component from react
import {View, Text, StyleSheet, Image} from "react-native";

// vector icons
import Feather from 'react-native-vector-icons/Feather';

// prop types for our props
import PropTypes from 'prop-types';

// static images of the users
import {Images} from '../Containers/PreLoadImages';

// 3rd party component to get the time ago feature
import TimeAgo from 'react-native-timeago';

/**
 * This component will render each message. It is the child
 * component of the <MessagingComponent />
 */
export default class MessageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
   * Randomly return one of the icons
   * @return {*}
   */
  randomIcon = () => {
    switch (this.getRandomInt(0, 2))  {
      case 0  : return (<Feather name="monitor"    size={15} color="#bccad0" />);
      case 1  : return (<Feather name="smartphone" size={15} color="#bccad0" />);
      case 2  : return (<Feather name="tablet"     size={15} color="#bccad0" />);
      default : return null
    }
  };

  /**
   * Check to see if there are any white spaces on a sgiven string
   * @param string
   */
  hasWhiteSpace = string => string.indexOf(' ') >= 0;

  /**
   * change the text by addding spaces between each char and
   * converting it to uppercase
   * @param text
   * @return {string}
   */
  formatText = (text) => {
    let txt = text;
    if (!this.hasWhiteSpace(txt))
      txt = txt.split('').join(' ');
    return txt.toUpperCase();
  };

  /**
   * Based on the text, return its predefined color code
   * @param text
   * @return {*}
   */
  dynamicTagColor = (text) => {

    text = this.formatText(text);

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

  /**
   * Return the styled component when it is ready
   * @return {XML}
   */
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.topContainer}>
          {Images[this.props.uid] ? (
            <Image
              style={styles.userImg}
              source={Images[this.props.uid]}
              resizeMode="contain"
            />
          ) : (
            <View style={[
              styles.userImg, {
              alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#E67D8F'
            }]}>
              <Feather name={"user"} size={20} color={"white"}/>
            </View>
          )}


          <View style={{flex: 1}}>
            <Text numberOfLines={1} style={styles.msgPersonName}>
              {this.props.name}
            </Text>
            <TimeAgo
              style={styles.msgTime}
              time={this.props.timeStamp}
            />
          </View>
          <View style={{
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'space-between'
          }}>{this.randomIcon()}

            {this.props.type === "Doctor" ? (
              <View style={[styles.tag, {
                backgroundColor: this.dynamicTagColor(this.props.healthAlert),
                  elevation: 2
              }]}>
                <Text style={{
                  fontSize: 8,
                  color: 'white',
                  fontWeight: 'bold'
                }}>{this.formatText(this.props.healthAlert)}
                </Text>
              </View>
            ): null}
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
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    paddingTop: 3,
    paddingBottom: 4,
    paddingLeft: 5,
    paddingRight: 5,
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
  navigation  : PropTypes.object,
  name        : PropTypes.string.isRequired,
  uid         : PropTypes.string.isRequired,
  comment     : PropTypes.string.isRequired,
  timeStamp   : PropTypes.string.isRequired,
  healthAlert : PropTypes.string,
  type    : PropTypes.string.isRequired

};
