import React, { Component, PureComponent } from 'react'
import reactCSS from 'reactcss'
import * as hue from '../helpers/hue'

export class Hue extends (PureComponent || Component) {
  componentWillUnmount() {
    this.unbindEventListeners()
  }

  handleChange = (e, skip) => {
    const change = hue.calculateChange(e, skip, this.props, this.refs.container)
    change && this.props.onChange(change, e)
  }

  handleMouseDown = (e) => {
    this.handleChange(e, true)
    window.addEventListener('mousemove', this.handleChange)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseUp = () => {
    this.unbindEventListeners()
  }

  unbindEventListeners() {
    window.removeEventListener('mousemove', this.handleChange)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  render() {
    const styles = reactCSS({
      'default': {
        root: {
          position: 'relative',
          display: 'inline-block',
          width: 20,
          height: 256,
          background: `linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%,
            #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`,
          borderRadius: this.props.radius,
          boxShadow: this.props.shadow,
        },
        container: {
          margin: '0 2px',
          position: 'relative',
          height: '100%',
        },
        pointer: {
          position: 'absolute',
          left: `${ (this.props.hsl.h * 100) / 360 }%`,
        },
        slider: {
          width: '4px',
          borderRadius: '1px',
          height: '8px',
          boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
          background: '#fff',
          transform: 'translate(-2px, -4px)',
        },
      },
      'vertical': {
        root: {
          background: `linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,
            #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`,
        },
        pointer: {
          left: '0px',
          top: `${ -((this.props.hsl.h * 100) / 360) + 100 }%`,
        },
      },
      'custom': {
        ...this.props.style
      }
    }, { vertical: this.props.direction === 'vertical', 'custom': !!this.props.style})

    return (
      <div style={ styles.root }>
        <div
          style={ styles.container }
          ref="container"
          onMouseDown={ this.handleMouseDown }
          onTouchMove={ this.handleChange }
          onTouchStart={ this.handleChange }
        >
          <div style={ styles.pointer }>
            { this.props.pointer ? (
              <this.props.pointer { ...this.props } />
            ) : (
              <div style={ styles.slider } />
            ) }
          </div>
        </div>
      </div>
    )
  }
}

export default Hue