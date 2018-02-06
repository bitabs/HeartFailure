import React, { Component } from 'react'
import { G, Line, Path, Rect, Text } from 'react-native-svg'
import * as d3scale from 'd3-scale'
import PropTypes from 'prop-types';

export default class Axis extends Component {

  render () {
    let { width, ticks, x, y, startVal, endVal, vertical } = this.props
    const TICKSIZE = width / 35
    x = x || 0
    y = y || 0
    let endX = vertical ? x : x + width
    let endY = vertical ? y - width : y
    let scale = this.props.scale
    if (!scale) {
      scale = typeof startVal === 'number' ? d3scale.scaleLinear() : d3scale.scaleTime()
      scale.domain(vertical ? [y, endY] : [x, endX]).range([startVal, endVal])
    }
    let tickPoints = vertical ? this.getTickPoints(vertical, y, endY, ticks)
      : this.getTickPoints(vertical, x, endX, ticks)
    return (
      <G fill='none'>
        <Line
          stroke='#000'
          strokeWidth='3'
          x1={x}
          x2={endX}
          y1={y}
          y2={endY} />
        {tickPoints.map(
          pos => <Line
            key={pos}
            stroke='#000'
            strokeWidth='3'
            x1={vertical ? x : pos}
            y1={vertical ? pos : y}
            x2={vertical ? x - TICKSIZE : pos}
            y2={vertical ? pos : y + TICKSIZE} />
        )}
        {tickPoints.map(
          pos => <Text
            key={pos}
            fill='#000'
            stroke='#000'
            fontSize='30'
            textAnchor='middle'
            x={vertical ? x - 2 * TICKSIZE : pos}
            y={vertical ? pos : y + 2 * TICKSIZE}>
            {Math.round(scale(pos), 2)}
          </Text>
        )}
      </G>
    )
  }

  getTickPoints (vertical, start, end, numTicks) {
    let res = []
    let ticksEvery = Math.floor(this.props.width / (numTicks - 1))
    if (vertical) {
      for (let cur = start; cur >= end; cur -= ticksEvery) res.push(cur)
    } else {
      for (let cur = start; cur <= end; cur += ticksEvery) res.push(cur)
    }
    return res
  }
}

Axis.propTypes = {
  width: PropTypes.number.isRequired,
  ticks: PropTypes.number.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  startVal: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  endVal: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  vertical: PropTypes.bool,
  scale: PropTypes.func // if scale is specified use that scale
};
