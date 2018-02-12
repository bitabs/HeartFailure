import React, {Component} from 'react';
import {Text, View, TouchableHighlight, StyleSheet} from "react-native";

export default class CustomHeart extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <View style={{position: 'relative'}}>
        <View style={styles.heart}>
          <View style={[styles.heartShape, styles.leftHeart]} />
          <View style={[styles.heartShape, styles.rightHeart]} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heart: {
    width: 290,
    height: 290,
  },
  heartShape: {
    width: 90,
    height: 130,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 50,
    elevation: 20,
    borderTopRightRadius: 50,
    backgroundColor: '#E67D8F',
  },
  leftHeart: {
    transform: [
      {rotate: '-50deg'}
    ],
    left: 79
  },
  rightHeart: {
    transform: [
      {rotate: '50deg'}
    ],
    right: 79
  }
});
