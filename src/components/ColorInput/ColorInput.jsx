/* 颜色属性输入 */

// todo: 添加propTypes和defaultProps
// todo: debug拖动改数功能
// todo: 客制化标签
// todo: 配置小数点位数

import React, { Component, PureComponent, PropTypes } from 'react'
import reactCSS from 'reactcss'

export class ColorInput extends (PureComponent || Component) {
  static propTypes = {
    color: PropTypes.array,
    model: PropTypes.oneOf(['rgb.r','rgb.g','rgb.b','hsv.h','hsv.s','hsv.v']),
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
    }
    return this.props[attr] || attrs[model][ map[attr] ]
  }

  getColor (value) {
    let {color, model} = this.props
    let newColor = {
      'rgb.r': [value, color[1], color[2]],
      'rgb.g': [color[0], value, color[2]],
      'rgb.b': [color[0], color[1], value],
      'hsv.h': [value, color[1], color[2]],
      'hsv.s': [color[0], value, color[2]],
      'hsv.v': [color[0], color[1], value],
    }
    return newColor[model]
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
    }
    return Number(values[model])
  }

  componentWillReceiveProps(nextProps) {
    const input = this.refs.input
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
    let newValue = Number(e.target.value)
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
      this.setState({ value: newValue }, () => {
        this.refs.input.select()
      })
      let newColor = this.getColor(newValue)
      this.props.onChange(newColor, e)
    }

    // Down
    if (e.keyCode === 40) {
      e.preventDefault()
      let newValue = this.state.value - this.getAttr('step')
      if(newValue < this.getAttr('min')) {
        return 
      }
      this.setState({ value: newValue }, () => {
        this.refs.input.select()
      })
      let newColor = this.getColor(newValue)
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
    const styles = reactCSS({
      'default': {
        root: {
          position: 'relative',
          marginBottom: 4,
          height: 36,
          display: 'flex',
          alignItems: 'center'
        },
        label: {
          position: 'relative',
          fontSize: 16,
          textAlign: 'center',
          display: 'inline-block',
          width: 30
        },
        input: {
          boxSizing: 'border-box',
          height: '100%'
        }
      },
      'user-override': {
        root: this.props.style && this.props.style.root ? this.props.style.root : {},
        input: this.props.style && this.props.style.input ? this.props.style.input : {},
        label: this.props.style && this.props.style.label ? this.props.style.label : {},
      },
      'dragLabel-true': {
        label: {
          cursor: 'ew-resize',
        },
      },
    }, {
      'user-override': true,
    }, this.props)

    let {label, rightLabel} = this.props
    let value = this.state.value.toFixed(this.getAttr('fixed'))
    let labelNode = label || <span style={ styles.label }>{ this.getAttr('label') }</span>
    return (
      <div style={ styles.root }>
        { labelNode }
        <input
          style={ styles.input }
          ref="input"
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