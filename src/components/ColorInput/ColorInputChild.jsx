/* 颜色属性输入 */

// todo: 添加propTypes和defaultProps
// todo: debug拖动改数功能
// todo: 客制化标签
// todo: 配置小数点位数
// todo: Lab值变化bug
// todo: fix cmyk.k
// 
// todo: 使用pos 0 1 2 3代替 getColor 和 getValue

// 抽离出对象部分

import React, { Component, PureComponent, PropTypes } from 'react'
import NumberInput from './NumberInput'
import HexInput from './HexInput'

export class ColorInputChild extends (PureComponent || Component) {
  static propTypes = {
    color: PropTypes.oneOfType([PropTypes.array,PropTypes.string]),
    model: PropTypes.oneOf(['rgb.r','rgb.g','rgb.b','hsv.h','hsv.s','hsv.v','lab.l','lab.a','lab.b','cmyk.c','cmyk.m','cmyk.y','cmyk.k','alpha','hex']),
    value: PropTypes.number,
    fixed: PropTypes.number,
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    scale: PropTypes.number
  }

  static defaultProps = {
    scale: 1
  }

  constructor(props) {
    super()
    this.state = {
      value: null,
    }
  }

  getAttr (attr) {
    let {model} = this.props
    let map = {min:0,max:1,step:2,fixed:3,pos:4}
    let attrs = {
      'rgb.r': [0, 255, 1, 0, 0],
      'rgb.g': [0, 255, 1, 0, 1],
      'rgb.b': [0, 255, 1, 0, 2],
      'hsv.h': [0, 360, 1, 0, 0],
      'hsv.s': [0, 1, 0.01, 2, 1],
      'hsv.v': [0, 1, 0.01, 2, 2],
      'lab.l': [0, 100, 1, 0, 0],
      'lab.a': [-128, 127, 1, 0, 1],
      'lab.b': [-128, 127, 1, 0, 2],
      'cmyk.c': [0, 1, 0.01, 2, 0],
      'cmyk.m': [0, 1, 0.01, 2, 1],
      'cmyk.y': [0, 1, 0.01, 2, 2],
      'cmyk.k': [0, 1, 0.01, 2, 3],
      'alpha': [0, 1, 0.01, 2, 3],
      'hex': [0,16777215,1,null, null]
    }
    return this.props[attr] || attrs[model][ map[attr] ]
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps(nextProps) {
    let pos = this.getAttr('pos')
    this.setState({ 
      value: typeof pos === 'number' ? nextProps.color[this.getAttr('pos')] : nextProps.color
    })
  }

  handleChange = (value, e) => {
    let {color} = this.props
    let newColor = color
    let pos = this.getAttr('pos')
    if(typeof pos === 'number') newColor[pos] = value 
    else newColor = value
    this.props.onChange(newColor, e)
    this.setState({ value: value })
  }

  render() {
    let {style,model,fixed,scale,sharp,placeholder} = this.props 
    if( model === 'hex') {
      return (
        <HexInput
          step={ this.getAttr('step') }
          style={ style }
          sharp={ sharp }
          value={ this.state.value }
          onChange={ this.handleChange }
          placeholder={ placeholder }
        />
      )
    }

    if( !fixed ){
      fixed = parseInt(this.getAttr('fixed') - Math.log10(scale))
      fixed < 0 ? 0 : fixed
    } 

    return (
     <NumberInput
        min={ this.getAttr('min') }
        max={ this.getAttr('max') }
        step={ this.getAttr('step') }
        fixed={ fixed }
        style={ style }
        value={ this.state.value }
        scale={ scale }
        onChange={ this.handleChange }
        placeholder={ placeholder }
      />   
    )
  }
}

export default ColorInputChild

/*
  handleDrag = (e) => {
    if (this.props.dragLabel) {
      const newValue = Math.round(this.props.value + e.movementX)
      if (newValue >= 0 && newValue <= this.props.dragMax) {
        this.props.onChange({ [this.props.label]: newValue }, e)
      }
    }
  }

  handleMouseDown = (e) => {
    if (this.props.dragLabel) {
      e.preventDefault()
      this.handleDrag(e)
      window.addEventListener('mousemove', this.handleDrag)
      window.addEventListener('mouseup', this.handleMouseUp)
    }
  }

  handleMouseUp = () => {
    this.unbindEventListeners()
  }

  unbindEventListeners = () => {
    window.removeEventListener('mousemove', this.handleDrag)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }*/
