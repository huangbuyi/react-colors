/* 
  Fields组件用于包裹EditableInput组件 
*/

// todo: 改为es6组件
// todo: 添加propTypes和defaultProps
import React from 'react'
import reactCSS from 'reactcss'
import color from '../helpers/color'

export const Fields = (props) => {
  let { onChange, rgb, hsv, hsl, hex, style, children } = props
  const styles = reactCSS({
    'default': {
      fields: {
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'top',
        padding: '0 12px'
      }
    },
    'custom': {
      fields: style
    }
  }, {
    'custom': style
  })

  const handleChange = (data, e) => {
    
    // 将返回值整合为合法的颜色值
    if (data['#']) {
      color.isValidHex(data['#']) && onChange({
        hex: data['#'],
        source: 'hex',
      }, e)
    } else if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        source: 'rgb',
      }, e)
    } else if (data.h || data.s || data.v) {
      onChange({
        h: data.h || hsv.h,
        s: data.s || hsv.s,
        v: data.v || hsv.v,
        source: 'hsv',
      }, e)
    } else if (data.l){
      onChange({
        h: data.h || hsv.h,
        s: data.s || hsv.s,
        l: data.l || hsv.l,
        source: 'hsl',
      }, e)
    }
  }

  // 根据EditableInput组件的label值传入属性
  const values = {
    r: rgb.r,
    g: rgb.g,
    b: rgb.b,
    h: hsv.h,
    s: hsv.s,
    v: hsv.v,
    l: hsl.l,
    hex: hex,
    a: rgb.a,
    '#': hex
  }

  let newChildren = React.Children.map(children, child => {

    let newProps = {
      value: (child.props.label && values[child.props.label] !== undefined) ? values[child.props.label] : hex,
      onChange: (...p) => handleChange(...p)
    }

    return React.cloneElement(child, newProps)
  })


  return (
    <div style={ styles.fields }>
      { newChildren }
    </div>
  )
}

export default Fields