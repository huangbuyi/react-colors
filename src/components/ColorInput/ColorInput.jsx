/* 颜色属性输入 */

// todo: 添加propTypes和defaultProps
// todo: debug拖动改数功能
// todo: 客制化标签
// todo: 配置小数点位数
// todo: Lab值变化bug
// todo: fix cmyk.k

import React, { Component, PureComponent, PropTypes } from 'react'
import reactCSS from 'reactcss'
import ColorNumberInput from './ColorNumberInput.jsx'
import ColorHexInput from './ColorHexInput.jsx'

export class ColorInput extends (PureComponent || Component) {
  static propTypes = {
    model: PropTypes.oneOf(['rgb.r','rgb.g','rgb.b','hsv.h','hsv.s','hsv.v','lab.l','lab.a','lab.b','cmyk.c','cmyk.m','cmyk.y','cmyk.k', 'hex']),
  }

  render () {
    let props = this.props

    if(props.model === 'hex') {
      return <ColorHexInput {...props} />
    }

    return (
      <ColorNumberInput {...props} />
    )
  }
}

export default ColorInput