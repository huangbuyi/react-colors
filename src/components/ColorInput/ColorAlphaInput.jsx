

import React, { Component, PureComponent, PropTypes } from 'react'
import NumberInput from './NumberInput.jsx'

// todo:设置小数点属性

export class ColorAlphaInput extends (PureComponent || Component) {
  static propTypes = {
    color: PropTypes.array,
    model: PropTypes.oneOf(['alpha']),
    value: PropTypes.number,
    fixed: PropTypes.number,
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number
  }

  static defaultProps = {
    label: <span>#</span>,
    step: 0.01
  }

  constructor(props) {
    super()
    this.state = {
      value: props.color[3],
      blurValue: props.color[3],
    }
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      value: nextProps.color[3]
    })
  }

  handleChange = (value, e) => {
    let {color} = this.props

    this.props.onChange([color[0],color[1],color[2],value], e)
    this.setState({ value: value })
  }

  render() {
    // todo 后部标签
    let {styles, label, rightLabel, placeholder} = this.props

    return (
      <div style={ styles.root }>
        <div style={ styles.label }>
          { label }
        </div>
        <NumberInput
          min={ 0 }
          max={ 1 }
          step={ 0.01 }
          fixed={ 2 }
          style={ styles.input }
          value={ this.state.value }
          onChange={ (value, e) => this.handleChange(value, e) }
          placeholder={ placeholder }
        />
        <div style={ styles.rightLabel }>
          { rightLabel }
        </div>
      </div>
    )
  }
}

export default ColorAlphaInput