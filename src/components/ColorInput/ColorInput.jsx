/* 颜色属性输入 */

// todo: 添加propTypes和defaultProps
// todo: debug拖动改数功能
// todo: 客制化标签
// todo: 配置小数点位数
// todo: Lab值变化bug

import React, { Component, PureComponent, PropTypes } from 'react'
import reactCSS from 'reactcss'

export class ColorInput extends (PureComponent || Component) {
  static propTypes = {
    color: PropTypes.array,
    model: PropTypes.oneOf(['rgb.r','rgb.g','rgb.b','hsv.h','hsv.s','hsv.v','lab.l','lab.a','lab.b','cmyk.c','cmyk.m','cmyk.y','cmyk.k']),
    value: PropTypes.number,
    fixed: PropTypes.number,
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number
  }

  static defaultProps = {
    
  }

  constructor(props) {
    super()
    this.state = {
      value: this.getValue(props),
      blurValue: this.getValue(props),
    }
  }

  getAttr (attr) {
    let {model} = this.props
    let map = {min:0,max:1,step:2,fixed:3,label:4}
    let attrs = {
      'rgb.r': [0, 255, 1, 0, 'R'],
      'rgb.g': [0, 255, 1, 0, 'G'],
      'rgb.b': [0, 255, 1, 0, 'B'],
      'hsv.h': [0, 360, 1, 0, 'H'],
      'hsv.s': [0, 1, 0.01, 2, 'S'],
      'hsv.v': [0, 1, 0.01, 2, 'V'],
      'lab.l': [0, 100, 1, 0, 'L'],
      'lab.a': [-128, 127, 1, 0, 'a'],
      'lab.b': [-128, 127, 1, 0, 'b'],
      'cmyk.c': [0, 1, 0.01, 2, 'C'],
      'cmyk.m': [0, 1, 0.01, 2, 'M'],
      'cmyk.y': [0, 1, 0.01, 2, 'Y'],
      'cmyk.k': [0, 1, 0.01, 2, 'K'],
    }
    return this.props[attr] || attrs[model][ map[attr] ]
  }

  getColor (value) {
    let {color, model} = this.props
    console.log('getColor' + color)
    return {
      'rgb.r': [value, color[1], color[2]],
      'rgb.g': [color[0], value, color[2]],
      'rgb.b': [color[0], color[1], value],
      'hsv.h': [value, color[1], color[2]],
      'hsv.s': [color[0], value, color[2]],
      'hsv.v': [color[0], color[1], value],
      'lab.l': [value, color[1], color[2]],
      'lab.a': [color[0], value, color[2]],
      'lab.b': [color[0], color[1], value],
      'cmyk.c': [value, color[1], color[2], color[3]],
      'cmyk.m': [color[0], value, color[2], color[3]],
      'cmyk.y': [color[0], color[1], value, color[3]],
      'cmyk.k': [color[0], color[1], color[3], value],
    }[model]
  }

  getValue (props) {
    let {color, model} = props
    let values = {
      'rgb.r': color[0],
      'rgb.g': color[1],
      'rgb.b': color[2],
      'hsv.h': color[0],
      'hsv.s': color[1],
      'hsv.v': color[2],
      'lab.l': color[0],
      'lab.a': color[1],
      'lab.b': color[2],
      'cmyk.c': color[0],
      'cmyk.m': color[1],
      'cmyk.y': color[2],
      'cmyk.k': color[3],
    }
    return parseFloat(values[model])
  }

  componentWillReceiveProps(nextProps) {
    const input = this.input
    let newValue = this.getValue(nextProps)
    if (newValue !== this.state.value) {
      if (input === document.activeElement) {
        this.setState({ blurValue: newValue })
      } else {
        this.setState({ value: newValue })
      }
    }
  }

  componentWillUnmount() {
    this.unbindEventListeners()
  }

  handleBlur = () => {
    if (this.state.blurValue) {
      this.setState({ value: this.state.blurValue, blurValue: null })
    }
  }

  handleChange = (e) => {
    let newValue = parseFloat(e.target.value)
    let newColor = this.getColor(newValue)
    if( !isNaN(newValue) ) {
      this.props.onChange(newColor, e)
      this.setState({ value: newValue })
    }
   
  }

  handleKeyDown = (e) => {

    // Up
    if (e.keyCode === 38) {
      e.preventDefault()
      let newValue = this.state.value + this.getAttr('step')
      if(newValue > this.getAttr('max')) {
        return 
      }
      let newColor = this.getColor(newValue)
      this.setState({ value: newValue }, () => {
        this.input.select()
      })
      
      this.props.onChange(newColor, e)
    }

    // Down
    if (e.keyCode === 40) {
      e.preventDefault()
      let newValue = this.state.value - this.getAttr('step')
      if(newValue < this.getAttr('min')) {
        return 
      }
      let newColor = this.getColor(newValue)
      this.setState({ value: newValue }, () => {
        this.input.select()
      })
     
      this.props.onChange(newColor, e)
    }
  }

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
  }

  render() {
    // todo 后部标签
    let {style, labelStyle, inputStyle, model} = this.props

    const styles = {
      root: Object.assign({
        display: 'inline-block',
        position: 'relative',
        marginBottom: 4,
        height: '100%',
      }, style),
      label: Object.assign({
        display: 'inline-block',
        height: '100%',
        fontSize: 13,
        verticalAlign: 'top',
        width: 30
      }, labelStyle),
      input: Object.assign({
        verticalAlign: 'top',
        width: 40,
        boxSizing: 'border-box',
        height: '100%'
      }, inputStyle)
    }

    let {label, rightLabel} = this.props
    let value = this.state.value.toFixed(this.getAttr('fixed'))
    let labelNode = label || <span style={ styles.label }>{ this.getAttr('label') }</span>
    return (
      <div style={ styles.root }>
        <div style={ styles.label }>
          { labelNode }
        </div>
        <input
          style={ styles.input }
          ref={ node => this.input = node }
          value={ value }
          onKeyDown={ this.handleKeyDown }
          onChange={ this.handleChange }
          onBlur={ this.handleBlur }
          placeholder={ this.props.placeholder }
        />   
      </div>
    )
  }
}

export default ColorInput