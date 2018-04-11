import React, { Component } from 'react'

// predefined components of react
import {View, StyleSheet} from "react-native"

// vector icon set
import Feather from 'react-native-vector-icons/Feather'

// fading animation
import Fade from '../Components/Fade'

/**
 * This component will act as a loading component which will be
 * showing during a computation
 * ==============================================================
 */
export default class OpeningLogoLoader extends Component {
  constructor() {
    super();
    this.state = {
      loading: false
    }
  }

  /**
   * When the component loads, show that is ready
   * ==============================================================
   */
  componentDidMount() {
    this.setState({loading: true});
  }

  /**
   * When the component is ready, show the animation
   * ==============================================================
   * @return {XML}
   */
  render() {
    return(
      <View style={styles.container}>
        <Fade visible={this.state.loading}>
          <Feather
            name="activity"
            size={33}
            color="#8F9CAE"
          />
        </Fade>
      </View>
    )
  }
}

/**
 * styles for this component
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
