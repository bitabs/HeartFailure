import React, { Component } from 'react';
import { Text, View } from 'react-native';

import './global';

// import cryptoExample from './crypto_example';
// import bitcoinExample from './bitcoin_example';
// import httpExample from './http_example';
// import cytonExample from './cyton_example';

export default class ReactNativeExamples extends Component {

  state = {
    //crypto: null,
    // bitcoin: null,
    // http: null,
    cyton: null
  };

  componentDidMount() {
    process.nextTick(() => {
      // cryptoExample().then((crypto) => this.setState({crypto}));
      // bitcoinExample().then((bitcoin) => this.setState({bitcoin}));
      // httpExample().then((http) => this.setState({http}));
      // cytonExample().then((cyton) => this.setState({cyton}))
    });
  }

  _renderResult(result) {
    if (result === null) {
      return 'waiting...';
    }
    if (result) {
      return 'success!';
    }
    return 'failed.';
  }

  render() {
    return (
      <View>
        <Text>Cyton: {this._renderResult(this.state.cyton)}</Text>
      </View>
    );
  }
}
