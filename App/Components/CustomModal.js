import React, { Component } from 'react';
import {Modal, Text, TouchableHighlight, View} from "react-native";
import Ionicons from "react-native-vector-icons/Feather";
import { StyleSheet } from 'react-native';

class CustomModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false
    }
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  toggleModal = () => {
    this.setState({
      isVisible: !this.state.isVisible
    })
  };

  render() {
    return (
      <Modal
        visible={this.state.isVisible}
        animationType={'fade'}
        transparent={true}
        onRequestClose={() => this.closeModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <TouchableHighlight activeOpacity={1.0} underlayColor="rgba(253,138,94,0)" onPress={this.toggleModal}>
              <Ionicons name="x" size={22} color="#bccad0"/>
            </TouchableHighlight>
            <Text>This is content inside of modal component</Text>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  innerContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    height: 300,
    justifyContent: 'flex-start',
    padding: 20,
    width: 350,
  },
});

export default CustomModal;
