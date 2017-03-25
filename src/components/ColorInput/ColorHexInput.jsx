/* 颜色属性输入 */

// todo: 添加propTypes和defaultProps
// todo: debug拖动改数功能
// todo: 客制化标签
// todo: 配置小数点位数
// todo: Lab值变化bug
// todo: fix cmyk.k
// todo: 把number input抽象出来，number input组件接口为通用接口，可以使用任意其它组件替换，包裹到colorInput中都可以使用
// todo: this === active 时，不merge值

import React, { Component, PureComponent, PropTypes } from 'react'
import reactCSS from 'reactcss'

const isStrict16 = v => !(isNaN(parseInt(v, 16)) || isNaN(parseInt(v.split('').reverse().join(''), 16)))
const formatHex = (hexStr) => {
  const max = 16777215
  const min = 0
  let num = parseInt(hexStr, 16) 
  let newValue = num > max ? 'ffffff' : hexStr
  newValue = num < min ? '000000' : newValue
  return newValue.padStart(6, '0')
}
const _16To10 = v => parseInt(v, 16)
const _10To16 = v => Number(v).toString(16)


export class ColorInput extends (PureComponent || Component) {
  static propTypes = {
    color: PropTypes.string,
    model: PropTypes.oneOf(['hex']),
    value: PropTypes.number,
    fixed: PropTypes.number,
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number
  }

  static defaultProps = {
    label: <span>#</span>,
    step: 1
  }

  constructor(props) {
    super()
    let value = props.color.replace('#', '')
    this.state = {
      value: value,
      blurValue: value,
    }
  }

  componentWillReceiveProps(nextProps) {
    const input = this.input
    let newValue = nextProps.color.replace('#', '')
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

  handleChange = (value, e, call) => {
    if( isStrict16(value) || !value ) {
      this.props.onChange(value, e)
      this.setState({ value: value }, call)
    }
  }

  handleKeyDown = (e) => {
    let { step } = this.props
    let num = parseInt(e.target.value, 16)
    // Up
    if (e.keyCode === 38) {
      e.preventDefault()
      this.handleChange(formatHex(_10To16(num + step)), e, () => this.input.select())
    }

    // Down
    if (e.keyCode === 40) {
      e.preventDefault()
      this.handleChange(formatHex(_10To16(num - step)), e, () => this.input.select())
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
    let {style, labelStyle, label, inputStyle, rightLabelStyle, rightLabel, model} = this.props

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
        width: 20
      }, labelStyle),
      rightLabel: Object.assign({
        display: 'inline-block',
        height: '100%',
        fontSize: 13,
        verticalAlign: 'top',
        paddingLeft: 4
      }, rightLabelStyle),
      input: Object.assign({
        verticalAlign: 'top',
        width: 40,
        boxSizing: 'border-box',
        height: '100%',
        padding: '0 2px',
        fontSize: 12
      }, inputStyle)
    }

    return (
      <div style={ styles.root }>
        <div style={ styles.label }>
          { label }
        </div>
        <input
          style={ styles.input }
          ref={ node => this.input = node }
          value={ this.state.value }
          onKeyDown={ this.handleKeyDown }
          onChange={ e => this.handleChange(e.target.value, e) }
          onBlur={ this.handleBlur }
          placeholder={ this.props.placeholder }
        />   
        <div style={ styles.rightLabel }>
          { rightLabel }
        </div>
      </div>
    )
  }
}

export default ColorInput