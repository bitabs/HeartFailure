import React, { Component } from 'react'
import { G, Rect, Text } from 'react-native-svg'
import PropTypes from 'prop-types';

export default class Legend extends Component {

  render () {
    let {names, x, y} = this.props
    return (
      <G fill='none'>
        {names.map(
          (name, i) => <Text
            key={name}
            fill="black"
            stroke="black"
            fontSize='30'
            x={x}
            y={y + i * 30}>
            {name}
          </Text>
        )}
      </G>
    )
  }
}
Legend.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  x: PropTypes.number,
  y: PropTypes.number
}
