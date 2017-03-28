/* 颜色属性输入 */

// todo: 添加propTypes和defaultProps
// todo: debug拖动改数功能
// todo: 客制化标签
// todo: 配置小数点位数
// todo: Lab值变化bug
// todo: fix cmyk.k

import React, { Component, PureComponent, PropTypes } from 'react'
import ColorNumberInput from './ColorNumberInput.jsx'
import ColorHexInput from './ColorHexInput.jsx'
import ColorAlphaInput from './ColorAlphaInput.jsx'

export class ColorInput extends (PureComponent || Component) {
  static propTypes = {
    model: PropTypes.oneOf(['rgb.r','rgb.g','rgb.b','hsv.h','hsv.s','hsv.v','lab.l','lab.a','lab.b','cmyk.c','cmyk.m','cmyk.y','cmyk.k','hex','alpha']),
  }

  render () {
    let {model, style, labelStyle, rightLabelStyle, inputStyle, ...props} = this.props
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

    if(model === 'hex') {
      return <ColorHexInput styles={styles} {...props} />
    }

    if(model === 'alpha') {

      return <ColorAlphaInput styles={styles} {...props} />
    }

    return (
      <ColorNumberInput model={model} styles={styles} {...props} />
    )
  }
}

export default ColorInput