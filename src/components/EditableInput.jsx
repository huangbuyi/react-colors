import React, { Component, PureComponent } from 'react'
import reactCSS from 'reactcss'

export class EditableInput extends (PureComponent || Component) {
  constructor(props) {
    super()
    this.state = {
      value: String(props.value).toUpperCase(),
      blurValue: String(props.value).toUpperCase(),
    }
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
    let label = this.props.label
    if (!!label && label !== '#' && label !== 'hex' ) {
      this.props.onChange({ [this.props.label]: e.target.value }, e)
    } else {
      this.props.onChange({ '#': e.target.value }, e)
    }

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