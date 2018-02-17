import React, {Component} from 'react';
import {View, StyleSheet} from "react-native";
import HeartBeat from "../Components/HeartBeat";
import ECG from "./ECG";
import Statistics from "./Statistics";
import PropTypes from 'prop-types';

export default class Patient extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {

    let ret = (this.props.index === 0 ?
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
          <HeartBeat/>
          <ECG height={230} width={380}/>
        </View>
      : <Statistics/>);

    return(
      <View>
        {ret}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

Patient.propTypes = {
  index   : PropTypes.number.isRequired
};
