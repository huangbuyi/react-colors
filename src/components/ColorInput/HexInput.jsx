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
import padStart from '../../helpers/padStart'

const isStrict16 = v => { 
  let hexRgx = /^[0-9a-fA-F]{0,9}$/
  v = v.replace('#', '')
  return hexRgx.test(v)
}
const formatHex = (hexStr) => {
  const max = 16777215
  const min = 0
  hexStr = hexStr.replace('#', '')
  let num = parseInt(hexStr, 16) 
  let newValue = num > max ? 'ffffff' : hexStr
  newValue = num < min ? '000000' : newValue
  return '#' + padStart(newValue, 6, '0')
}
const _16To10 = v => parseInt(v, 16)
const _10To16 = v => Number(v).toString(16)


export class HexInput extends (PureComponent || Component) {
  static propTypes = {
    style: PropTypes.object,
    value: PropTypes.string.isRequired,
    step: PropTypes.number,
    sharp: PropTypes.bool,
    onChange: PropTypes.func
  }

  static defaultProps = {
    label: <span>#</span>,
    step: 1,
    sharp: false,
    onChange: () => {}
  }

  constructor(props) {
    super()
    let newValue = props.value.replace('#', '')
    if(props.sharp) newValue = '#' + newValue
    this.state = {
      value: newValue,
      blurValue: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    const input = this.input
    let newValue = nextProps.value.replace('#', '')
    if(nextProps.sharp) newValue = '#' + newValue

    if (newValue !== this.state.value) {
      if (input === document.activeElement) {
        this.setState({ blurValue: newValue })
      } else {
        this.setState({ value: newValue })
      }
    }
  }

  handleBlur = () => {
    if (this.state.blurValue) {
      this.setState({ value: this.state.blurValue, blurValue: null })
    }
  }

  handleChange = (newValue, e, call) => {

    if( isStrict16(newValue) || !newValue || newValue == '#' ) {
      this.props.onChange(formatHex(newValue), e)
      this.setState({value: newValue}, call)
    } 
  }

  handleKeyDown = (e) => {
    let { step } = this.props
    let newValue = e.target.value.replace('#', '')
    let num = parseInt(newValue, 16)
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

  render() {
    // todo 后部标签
    let {style, model} = this.props

    return (
      <input
        style={ style }
        ref={ node => this.input = node }
        value={ this.state.value }
        style={ style }
        onKeyDown={ this.handleKeyDown }
        onChange={ e => this.handleChange(e.target.value, e) }
        onBlur={ this.handleBlur }
        placeholder={ this.props.placeholder }
      />   
    )
  }
}

export default HexInput