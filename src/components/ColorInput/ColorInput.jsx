/* 颜色属性输入 */

// todo: 添加propTypes和defaultProps
// todo: debug拖动改数功能
// todo: 客制化标签
// todo: 配置小数点位数
// todo: Lab值变化bug
// todo: fix cmyk.k

import React, { Component, PureComponent, PropTypes } from 'react'
import ColorInputChild from './ColorInputChild'

export class ColorInput extends (PureComponent || Component) {
  static displayName = 'ColorInput'
  static propTypes = {
    model: PropTypes.oneOf(['rgb.r','rgb.g','rgb.b','hsv.h','hsv.s','hsv.v','lab.l','lab.a','lab.b','cmyk.c','cmyk.m','cmyk.y','cmyk.k','hex','alpha']),
    style: PropTypes.object,
    label: PropTypes.node,
    rightLabel: PropTypes.node,
    labelStyle: PropTypes.object,
    rightLabelStyle: PropTypes.object,
    inputStyle: PropTypes.object,
  }

  getDefaultLabel(model) {
    return {
      'rgb.r':'R',
      'rgb.g':'G',
      'rgb.b': 'B',
      'hsv.h': 'H',
      'hsv.s': 'S',
      'hsv.v':'V',
      'lab.l':'L',
      'lab.a':'a',
      'lab.b':'b',
      'cmyk.c': 'C',
      'cmyk.m': 'M',
      'cmyk.y':'Y',
      'cmyk.k': 'K',
      'alpha': 'a',
      'hex': '#'
    }[model]
  }

  render () {
    let {
      style, 
      label,
      rightLabel,
      labelStyle, 
      rightLabelStyle, 
      inputStyle, 
      ...props
    } = this.props

    const styles = {
      root: Object.assign({
        display: 'inline-block',
        position: 'relative',
        marginBottom: 4,
      }, style),
      label: Object.assign({
        display: 'inline-block',
        height: '100%',
        fontSize: 13,
        verticalAlign: 'top',
        width: 20,
        lineHeight: '20px'
      }, labelStyle),
      rightLabel: Object.assign({
        display: 'inline-block',
        height: '100%',
        fontSize: 13,
        verticalAlign: 'top',
        paddingLeft: 4,
        lineHeight: '20px'
      }, rightLabelStyle),
      input: Object.assign({
        verticalAlign: 'top',
        width: 40,
        boxSizing: 'border-box',
        height: 20,
        padding: '0 2px',
        fontSize: 12
      }, inputStyle)
    }

    return (
      <div style={ styles.root }>
        <span style={ styles.label }>
          { label || this.getDefaultLabel(props.model) }
        </span>
        <ColorInputChild style={styles.input} {...props} />
        <span style={ styles.rightLabel }>
          { rightLabel }
        </span>
      </div>
      
    )
  }
}

export default ColorInput