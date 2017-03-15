/* 颜色属性输入 */

// todo: 添加propTypes和defaultProps
// todo: debug拖动改数功能
// todo: 客制化标签
// todo: 配置小数点位数

import React, { Component, PureComponent, PropTypes } from 'react'
import reactCSS from 'reactcss'

export class EditableInput extends (PureComponent || Component) {
  static propTypes = {
    color: PropTypes.array,
    model: PropTypes.oneOf(['rgb.r','rgb.g','rgb.b','hsv.h','hsv.s','hsv.v'])
  }

  static defaultProps = {
    model: 'rgb.r'
  }


  constructor(props) {
    super()
    this.state = {
      value: props.color[0],
      blurValue: props.color[0],
    }
  }

  getColor (v) {
    let value = Number(v)
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

  componentWillReceiveProps(nextProps) {
    const input = this.refs.input
    if (nextProps.value !== this.state.value) {

      if (input === document.activeElement) {
        this.setState({ blurValue: String(nextProps.value).toUpperCase() })
      } else {
        this.setState({ value: String(nextProps.value).toUpperCase() })
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
    let newColor = this.getColor(e.target.value)
    this.props.onChange(newColor, e)

    this.setState({ value: e.target.value })
  }

  handleKeyDown = (e) => {
    const number = Number(e.target.value)
    if (number) {
      const amount = this.props.arrowOffset || 1

      // Up
      if (e.keyCode === 38) {
        if (this.props.label !== null) {
          console.log(this.props.onChange)
          this.props.onChange({ [this.props.label]: number + amount }, e)
        } else {
          this.props.onChange(number + amount, e)
        }

        this.setState({ value: number + amount })
      }

      // Down
      if (e.keyCode === 40) {
        if (this.props.label !== null) {
          this.props.onChange({ [this.props.label]: number - amount }, e)
        } else {
          this.props.onChange(number - amount, e)
        }

        this.setState({ value: number - amount })
      }
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
        },
        label: {
          height: 34,
          width: 20,
          display: 'inline-block'
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

    let label = this.props.label
    let value = !!label && label !== '#' && label !== 'hex' ? Number(Number(this.state.value).toFixed(2)) : this.state.value
    return (
      <div style={ styles.root }>
        { this.props.label ? (
          <div style={ styles.label } onMouseDown={ this.handleMouseDown }>
            { this.props.label.toUpperCase() }
          </div>
        ) : null }
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

export default EditableInput