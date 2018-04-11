// predefined components from react
import React, { Component } from 'react'

// animated library from react to animate components
import {Animated} from 'react-native';

/**
 * This component will give fading animation to components
 */
export default class Fade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  };

  /**
   * When the component has been mounted, give a default value
   * for the animation initial state
   * ==============================================================
   */
  componentWillMount() {
    this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
  }

  /**
   * When the component gets new props, start the animation, and
   * when it is done, tell the component that the animation has
   * finished
   * ==============================================================
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) this.setState({ visible: true });

    // start the animation with the visibility
    Animated.timing(this._visibility, {
      toValue: nextProps.visible ? 1 : 0,
      duration: 300,
    }).start(() => {
      this.setState({ visible: nextProps.visible });
    });
  }

  /**
   * Show the component when it is ready
   * ==============================================================
   * @return {XML}
   */
  render() {
    const {style, children, ...rest } = this.props;

    // let us define the fading props here by giving opacity
    const containerStyle = {
      opacity: this._visibility.interpolate({
        inputRange: [0, 1], outputRange: [0, 1],
      }),
      transform: [{
        scale: this._visibility.interpolate({
          inputRange: [0, 1], outputRange: [1.1, 1]
        })
      }],
    };

    // merge them together
    const combinedStyle = [containerStyle, style];

    // return it
    return (
      <Animated.View style={this.state.visible ? combinedStyle : containerStyle} {...rest}>
        {this.state.visible ? children : null}
      </Animated.View>
    );
  }
}
