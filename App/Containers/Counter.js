import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Feather from "react-native-vector-icons/Feather";


export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.startRecording = this.startRecording.bind(this);
  }

  startRecording = seconds => {
    (count = (cc) => {
      this.setState({counter: cc});

      if (cc > 0) setTimeout(function() { count(--cc); }, 1000);
    })(seconds);
  };

  render() {
    return (
      <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity
          onPress={() => this.startRecording(30)}
          style={{width: 50, height: 50, borderRadius: 300, backgroundColor: '#E67D8F', alignItems: 'center', justifyContent: 'center', elevation: 5, marginRight: 30}}>
          {
            this.state.counter === 0 ? (
              <Feather name={"mic"} size={20} color={"white"} />
            ): <Text style={{fontWeight: 'bold', color: 'white', fontSize: 17}}>{this.state.counter}</Text>
          }
        </TouchableOpacity>
      </View>
    )
  }
}
