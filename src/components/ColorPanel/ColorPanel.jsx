/* 选择色度和明度 */

// todo: 改变样式实现
// todo: 添加x，y轴配置

import React, { Component, PureComponent, PropTypes } from 'react'
import reactCSS from 'reactcss'
import calcEventPosition from '../../helpers/calcEventPosition'
import throttle from 'lodash/throttle'
import CirclePanel from './CirclePointer.jsx'

export class ColorPanel extends (PureComponent || Component) {
  static propTypes = {
    model: PropTypes.oneOf(['rgb.r','rgb.g','rgb.b','hsv.h','hsv.s','hsv.v']),
    pointer: PropTypes.node,
    rgb: PropTypes.object,
    hsv: PropTypes.object,
    onChange: PropTypes.func
  }

  static defaultProps = {
    pointer: <CirclePanel />
  }

  constructor(props) {
    super(props)

    // 50ms内不重复触发,todo 使用
    this.handleChange = throttle(this.handleChange, 50)
  }

  getBackground() {
    let props = this.props
    let background = {
      'rgb.r': `linear-gradient(to top right, rgba(${ Math.round(props.color[0]) },0,0,1),transparent, rgba(${ Math.round(props.color[0]) },255,255,1) ), 
          linear-gradient(to bottom right, rgb(${ Math.round(props.color[0]) },255,0), rgb(${ Math.round(props.color[0]) },0,255) )`,
      'rgb.g': `linear-gradient(to top right, rgba(0,${ Math.round(props.color[1]) },0,1),transparent, rgba(255,${ Math.round(props.color[1]) },255,1) ), 
          linear-gradient(to bottom right, rgb(255,${ Math.round(props.color[1]) },0), rgb(0,${ Math.round(props.color[1]) },255) )`,
      'rgb.b': `linear-gradient(to top right, rgba(0,0,${ Math.round(props.color[2]) },1),transparent, rgba(255,255,${ Math.round(props.color[2]) },1) ), 
          linear-gradient(to bottom right, rgb(0,255,${ Math.round(props.color[2]) }), rgb(255,0,${ Math.round(props.color[2]) }) )`,
      'hsv.h': `linear-gradient(to top, #000, transparent),linear-gradient(to right, #FFF, rgba(255,255,255,0)),
          linear-gradient(to top, hsl(${ props.color[0] }, 100%, 50%), hsl(${ props.color[0] }, 100%, 50%))`,
      'hsv.s': `linear-gradient(to top, #000, transparent), linear-gradient(rgba(255,255,255,${ 1-props.color[1] }), rgba(255,255,255,${ 1-props.color[1] })),
          linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`,
      'hsv.v': `linear-gradient(to top, rgba(0,0,0,${ 1-props.color[2] }), rgba(0,0,0,${ 1-props.color[2] })),linear-gradient(to top, #fff, transparent), 
          linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`
    }

    return background[props.model]
  }

  getColor(e) {
    let {color, model} = this.props
    let p = calcEventPosition(e, this.container)
    let newColor = {
      'rgb.r': [color[0], 255 - p.topP * 255, p.leftP * 255],
      'rgb.g': [255 - p.topP * 255, color[1], p.leftP * 255],
      'rgb.b': [255 - p.topP * 255, p.leftP * 255, color[2]],
      'hsv.h': [color[0], p.leftP, 1 - p.topP],
      'hsv.s': [p.leftP * 360, color[1], 1 - p.topP],
      'hsv.v': [p.leftP * 360, 1 - p.topP, color[2]],
    }
    return newColor[model]
  }

  getPosition () {
    let {color, model} = this.props
    let position = {
      'rgb.r': {
        leftP: color[2] / 255,
        topP: 1 - color[1] / 255
      },
      'rgb.g': {
        leftP: color[2] / 255,
        topP: 1 - color[0] / 255
      },
      'rgb.b': {
        leftP: color[1] / 255,
        topP: 1 - color[0] / 255
      },
      'hsv.h': {
        leftP: color[1],
        topP: 1 - color[2]
      },
      'hsv.s': {
        leftP: color[0] / 360,
        topP: 1 - color[2]
      },
      'hsv.v': {
        leftP: color[0] / 360,
        topP: 1 - color[1]
      }
    }
    return position[model]
  }

  componentWillUnmount() {
    this.unbindEventListeners()
  }

  handleChange = (e) => {
    let c = this.getColor(e)
    this.props.onChange(c, e)
  }

  handleMouseDown = (e) => {
    this.handleChange(e, true)
    window.addEventListener('mousemove', this.handleChange)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseUp = () => {
    this.unbindEventListeners()
  }

  unbindEventListeners() {
    window.removeEventListener('mousemove', this.handleChange)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  render() {
    let {pointer, style, labelStyle} = this.props

    let p = this.getPosition()
    const styles = {
      root: Object.assign({
        position: 'relative',
        height: '100%',
        background: this.getBackground(),
        cursor: 'default'
      }, style),
      pointer: Object.assign({
        position: 'absolute',
        top: p.topP * 100 + '%',
        left: p.leftP * 100 + '%',
      }, labelStyle)
    }

    return (
      <div
        style={ styles.root }
        ref={ node => this.container = node}
        onMouseDown={ this.handleMouseDown }
        onTouchMove={ this.handleChange }
        onTouchStart={ this.handleChange }
      >
        <div style={ styles.pointer }>{ 
          pointer
        }</div>
      </div>
    )
  }
}

export default ColorPanel