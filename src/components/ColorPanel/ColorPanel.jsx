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
    model: 'r',
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
      r: `linear-gradient(to top right, rgba(${ props.rgb.r },0,0,1),transparent, rgba(${ props.rgb.r },255,255,1) ), 
          linear-gradient(to bottom right, rgb(${ props.rgb.r },255,0), rgb(${ props.rgb.r },0,255) )`,
      g: `linear-gradient(to top right, rgba(0,${ props.rgb.g },0,1),transparent, rgba(255,${ props.rgb.g },255,1) ), 
          linear-gradient(to bottom right, rgb(255,${ props.rgb.g },0), rgb(0,${ props.rgb.g },255) )`,
      b: `linear-gradient(to top right, rgba(0,0,${ props.rgb.b },1),transparent, rgba(255,255,${ props.rgb.b },1) ), 
          linear-gradient(to bottom right, rgb(0,255,${ props.rgb.b }), rgb(255,0,${ props.rgb.b }) )`,
      h: `linear-gradient(to top, #000, transparent),linear-gradient(to right, #FFF, rgba(255,255,255,0)),
          linear-gradient(to top, hsl(${ props.hsv.h }, 100%, 50%), hsl(${ props.hsv.h }, 100%, 50%))`,
      s: `linear-gradient(to top, #000, transparent), linear-gradient(rgba(255,255,255,${ 1-props.hsv.s }), rgba(255,255,255,${ 1-props.hsv.s })),
          linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`,
      v: `linear-gradient(to top, rgba(0,0,0,${ 1-props.hsv.v }), rgba(0,0,0,${ 1-props.hsv.v })),linear-gradient(to top, #fff, transparent), 
          linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`
    }

    return background[props.model]
  }

  getColor(e) {
    let props = this.props
    let p = calcEventPosition(e, this.refs.container)
    let newColor = {
      r: {
        r: props.rgb.r,
        g: 255 - p.topP * 255,
        b: p.leftP * 255
      },
      g: {
        r: 255 - p.topP * 255,
        g: props.rgb.g,
        b: p.leftP * 255
      },
      b: {
        r: 255 - p.topP * 255,
        g: p.leftP * 255,
        b: props.rgb.b
      },
      h: {
        h: props.hsv.h,
        s: p.leftP,
        v: 1 - p.topP
      },
      s: {
        h: p.leftP * 360,
        s: props.hsv.s,
        v: 1 - p.topP
      },
      v: {
        h: p.leftP * 360,
        s: 1 - p.topP,
        v: props.hsv.v
      }
    }
    return newColor[props.model]
  }

  getPosition () {
    let props = this.props
    let position = {
      r: {
        leftP: props.rgb.b / 255,
        topP: 1 - props.rgb.g / 255
      },
      g: {
        leftP: props.rgb.b / 255,
        topP: 1 - props.rgb.r / 255
      },
      b: {
        leftP: props.rgb.g / 255,
        topP: 1 - props.rgb.r / 255
      },
      h: {
        leftP: props.hsv.s,
        topP: 1 - props.hsv.v
      },
      s: {
        leftP: props.hsv.h / 360,
        topP: 1 - props.hsv.v
      },
      v: {
        leftP: props.hsv.h / 360,
        topP: 1 - props.hsv.s
      }
    }
    return position[props.model]
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
    let props = this.props
    let p = this.getPosition()
    const styles = reactCSS({
      'default': {
        root: {
          position: 'relative',
          display: 'inline-block',
          width: '256px',
          height: '256px',
          background: this.getBackground(props.colorModel),
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