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
    model: PropTypes.oneOf(['hex','css']),
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

  render() {
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