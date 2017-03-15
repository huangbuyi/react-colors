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
    model: PropTypes.oneOf(['r','g','b','h','s','v']),
    pointer: PropTypes.node,
    rgb: PropTypes.object,
    hsv: PropTypes.object,
    onChange: PropTypes.func
  }

  static defaultProps = {
    inputModel: 'rgb',
    outputModel: 'rgb.gb',
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
      'rgb.gb': `linear-gradient(to top right, rgba(${ Math.round(props.color[0]) },0,0,1),transparent, rgba(${ Math.round(props.color[0]) },255,255,1) ), 
          linear-gradient(to bottom right, rgb(${ Math.round(props.color[0]) },255,0), rgb(${ Math.round(props.color[0]) },0,255) )`,
      'rgb.rb': `linear-gradient(to top right, rgba(0,${ Math.round(props.color[1]) },0,1),transparent, rgba(255,${ Math.round(props.color[1]) },255,1) ), 
          linear-gradient(to bottom right, rgb(255,${ Math.round(props.color[1]) },0), rgb(0,${ Math.round(props.color[1]) },255) )`,
      'rgb.rg': `linear-gradient(to top right, rgba(0,0,${ Math.round(props.color[2]) },1),transparent, rgba(255,255,${ Math.round(props.color[2]) },1) ), 
          linear-gradient(to bottom right, rgb(0,255,${ Math.round(props.color[2]) }), rgb(255,0,${ Math.round(props.color[2]) }) )`,
      'hsv.sv': `linear-gradient(to top, #000, transparent),linear-gradient(to right, #FFF, rgba(255,255,255,0)),
          linear-gradient(to top, hsl(${ props.color[0] }, 100%, 50%), hsl(${ props.color[0] }, 100%, 50%))`,
      'hsv.hv': `linear-gradient(to top, #000, transparent), linear-gradient(rgba(255,255,255,${ 1-props.color[1] }), rgba(255,255,255,${ 1-props.color[1] })),
          linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`,
      'hsv.hs': `linear-gradient(to top, rgba(0,0,0,${ 1-props.color[1] }), rgba(0,0,0,${ 1-props.color[1] })),linear-gradient(to top, #fff, transparent), 
          linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`
    }

    return background[props.outputModel]
  }

  getColor(e) {
    let props = this.props
    let p = calcEventPosition(e, this.refs.container)
    let newColor = {
      'rgb.gb': [255 - p.topP * 255, p.leftP * 255],
      'rgb.rb': [255 - p.topP * 255, p.leftP * 255],
      'rgb.rg': [255 - p.topP * 255, p.leftP * 255, props.color[2]],
      'hsv.sv': [p.leftP, 1 - p.topP],
      'hsv.hv': [p.leftP * 360, 1 - p.topP],
      'hsv.hs': [p.leftP * 360, 1 - p.topP],
    }
    return newColor[props.outputModel]
  }

  getPosition () {
    let props = this.props
    let position = {
      'rgb.gb': {
        leftP: props.color[2] / 255,
        topP: 1 - props.color[1] / 255
      },
      'rgb.rb': {
        leftP: props.color[2] / 255,
        topP: 1 - props.color[0] / 255
      },
      'rgb.rg': {
        leftP: props.color[1] / 255,
        topP: 1 - props.color[0] / 255
      },
      'hsv.sv': {
        leftP: props.color[1],
        topP: 1 - props.color[2]
      },
      'hsv.hv': {
        leftP: props.color[0] / 360,
        topP: 1 - props.color[2]
      },
      'hsv.hs': {
        leftP: props.color[0] / 360,
        topP: 1 - props.color[1]
      }
    }
    return position[props.outputModel]
  }

  componentWillUnmount() {
    this.unbindEventListeners()
  }

  handleChange = (e) => {
    let c = this.getColor(e)
    console.log(c)
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
    let props = this.props
    let p = this.getPosition()
    console.log(this.getBackground())
    const styles = reactCSS({
      'default': {
        root: {
          position: 'relative',
          display: 'inline-block',
          width: '256px',
          height: '256px',
          background: this.getBackground(),
          cursor: 'default',
        },
        pointer: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: `translate(${ p.leftP * 100 }%, ${ p.topP * 100 }%)`,
         
        },
        circle: {
          width: '4px',
          height: '4px',
          boxShadow: `0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),
            0 0 1px 2px rgba(0,0,0,.4)`,
          borderRadius: '50%',
          transform: 'translate(-2px, -2px)',
        },
      },
      'custom': {
        ...this.props.style
      },
    }, { 'custom': !!this.props.style })

    return (
      <div
        style={ styles.root }
        ref="container"
        onMouseDown={ this.handleMouseDown }
        onTouchMove={ this.handleChange }
        onTouchStart={ this.handleChange }
      >
        <div style={ styles.pointer }>{ 
          props.pointer
        }</div>
      </div>
    )
  }
}

export default ColorPanel