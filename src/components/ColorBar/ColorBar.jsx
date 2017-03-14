import React, { Component, PureComponent, PropTypes } from 'react'
import reactCSS from 'reactcss'
import * as hue from '../../helpers/hue'

class ColorBar extends (PureComponent || Component) {
	static defaultProps = {
		model: PropTypes.oneOf(['r','g','b','h','s','l']),
		pointer: PropTypes.node,
		rgb: PropTypes.object,
    hsv: PropTypes.object,
    onChange: PropTypes.func
	}

	static defaultProps = {
		model: 'r',
		pointer: '',
		direction: 'vertical'
	}

	getBackground () {
		let props = this.props 
		let background = {
			r: `linear-gradient(to top, rgb(0,${ props.rgb.g },${ props.rgb.b }), 
					rgb(255, ${ props.rgb.g }, ${ props.rgb.b })`,
			g: `linear-gradient(to top, rgb(${ props.rgb.r },0,${ props.rgb.b }), 
					rgb(${ props.rgb.r },255,${ props.rgb.b })`,
			b: `linear-gradient(to top, rgb(${ props.rgb.g },${ props.rgb.b },0), 
					rgb(${ props.rgb.g },${ props.rgb.b },255)`,	
			h: `linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,
          #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`,
      s: `linear-gradient(to top,rgba(0,0,0,${1-props.hsv.v}),rgba(0,0,0,${1-props.hsv.v})),
          linear-gradient(to top,hsl(${ props.hsl.h },100%,100%),hsl(${ props.hsl.h },100%,50%))`,
      v: `linear-gradient(to top, hsl(${ props.hsl.h },${ props.hsl.s*100 }%,0%), 
					hsl(${ props.hsl.h },${ props.hsl.s*100 },100%)`,
		}
    console.log(background[props.model])
		return background[props.model]
	}

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
          background: this.getBackground(),
        },
        pointer: {
          left: '0px',
          top: `${ -((this.props.hsl.h * 100) / 360) + 100 }%`,
        },
      },
      'custom': {
        ...this.props.style
      }
    }, { 
        vertical: this.props.direction === 'vertical', 
        custom: !!this.props.style
    })

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

export default ColorBar