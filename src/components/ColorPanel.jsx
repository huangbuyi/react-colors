/* 选择色度和明度 */

// todo: 添加propTypes和defaultProps
// todo: 将div叠加修改为梯度背景色的叠加
// todo: 使用梯度和filter，添加其他二维选择功能
// todo: 客制化选框

import React, { Component, PureComponent, PropTypes } from 'react'
import reactCSS from 'reactcss'
import * as saturation from '../helpers/saturation'
import throttle from 'lodash/throttle'

export class ColorPanel extends (PureComponent || Component) {
  static propTypes = {
    color: PropTypes.string,
    colorModel: PropTypes.oneOf(['r','g','b','h','s','v']),
  }

  static defaultProps = {
    xAxis: 'h',
  }

  constructor(props) {
    super(props)

    // 50ms内不重复触发
    this.throttle = throttle((fn, data, e) => {
      fn(data, e)
    }, 50)
  }

  getBackground( model ) {
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

    return background[model]
  }



  componentWillUnmount() {
    this.unbindEventListeners()
  }

  handleChange = (e, skip) => {
    this.props.onChange(saturation.calculateChange(e, skip, this.props, this.refs.container), e)
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
    const styles = reactCSS({
      'default': {
        root: {
          position: 'relative',
          display: 'inline-block',
          width: '256px',
          height: '256px',
          background: this.getBackground(props.colorModel),
        },
        white: {
          absolute: '0px 0px 0px 0px',
          background: 'linear-gradient(to right, #fff, rgba(255,255,255,0))',
        },
        black: {
          absolute: '0px 0px 0px 0px',
          background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
        },
        pointer: {
          position: 'absolute',
          top: `${ -(this.props.hsv.v * 100) + 100 }%`,
          left: `${ this.props.hsv.s * 100 }%`,
          cursor: 'default',
        },
        circle: {
          width: '4px',
          height: '4px',
          boxShadow: `0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),
            0 0 1px 2px rgba(0,0,0,.4)`,
          borderRadius: '50%',
          cursor: 'hand',
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
      </div>
    )
  }
}

export default ColorPanel