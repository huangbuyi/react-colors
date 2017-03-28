

import React, { Component, PureComponent, PropTypes } from 'react'

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

  componentWillReceiveProps(nextProps) {
    const input = this.input

    let newValue = (Number(nextProps.color[3]).toFixed(2))
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

  handleBlur = e => {
    if (this.state.blurValue) {
      this.setState({ value: this.state.blurValue, blurValue: null })
    }
  }

  handleChange = (value, e, call) => {
    let {color} = this.props
    value = value > 1 ? 1 : value 
    value = value < 0 ? 0 : value
    console.log('change ' + value)
    if( !isNaN(Number(value)) || !value ) {
      this.props.onChange([color[0],color[1],color[2],value], e)
      this.setState({ value: value }, call)
    }
  }

  handleKeyDown = (e) => {
    let { step } = this.props
    let num = Number(e.target.value)
    console.log('num' + num)
    console.log('num' + (num + step) )
    if (e.keyCode === 38) {
      e.preventDefault()
      this.handleChange((num + step).toFixed(2), e, () => this.input.select())
    }

    // Down
    if (e.keyCode === 40) {
      e.preventDefault()
      this.handleChange((num - step).toFixed(2), e, () => this.input.select())
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
    let {styles, label, rightLabel} = this.props

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

export default ColorAlphaInput