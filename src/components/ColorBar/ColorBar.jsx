import React, { Component, PureComponent, PropTypes } from 'react'
import reactCSS from 'reactcss'
import calcEventPosition from '../../helpers/calcEventPosition'

// todo 完善v

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
      v: `
          linear-gradient(to top,hsl(${ props.hsl.h },100%,0%),hsl(${ props.hsl.h },100%,50%))`,
		}
    console.log(background[props.model])
		return background[props.model]
	}

  getColor (e) {
    let {rgb, hsv, model} = this.props
    let p = calcEventPosition(e, this.refs.container)
    let newColor = {
      r: {
        r: 255 - p.topP * 255,
        g: rgb.g,
        b: rgb.b
      },
      g: {
        r: rgb.r,
        g: 255 - p.topP * 255,
        b: rgb.b
      },
      b: {
        r: rgb.r,
        g: rgb.g,
        b: 255 - p.topP * 255
      },
      h: {
        h: 360 - 360 * p.topP,
        s: hsv.s,
        v: hsv.v
      },
      s: {
        h: hsv.h,
        s: 1 - p.topP,
        v: hsv.v
      },
      v: {
        h: hsv.h,
        s: hsv.s,
        v: 1 - p.topP
      }
    }
    return newColor[model]
  }

  getPosition () {
    let {rgb, hsv, model} = this.props 
    let position = {
      r: 1 - rgb.r / 255,
      g: 1 - rgb.g / 255,
      b: 1 - rgb.b / 255,
      h: 1 - hsv.h / 360,
      s: 1 - hsv.s,
      v: 1 - hsv.v
    }
    return position[model]
  }

  componentWillUnmount() {
    this.unbindEventListeners()
  }

  handleChange = (e) => {
    let newColor = this.getColor(e)
    this.props.onChange(newColor, e)
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
    let top = this.getPosition() * 100
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
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          transform: `translateY(${ top }%)`
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