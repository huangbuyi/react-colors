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
		direction: 'vertical',
    InputModel: 'rgb',
    outputModel: 'rgb.r'
	}

	getBackground () {
		let {color, outputModel} = this.props
		let background = {
			'rgb.r': `linear-gradient(to top, rgb(0,${ Math.round(color[1]) },${ Math.round(color[2]) }), 
					rgb(255, ${ Math.round(color[1]) }, ${ Math.round(color[2]) })`,
			'rgb.g': `linear-gradient(to top, rgb(${ Math.round(color[0]) },0,${ Math.round(color[2]) }), 
					rgb(${ Math.round(color[0]) },255,${ Math.round(color[2]) })`,
			'rgb.b': `linear-gradient(to top, rgb(${ Math.round(color[0]) },${ Math.round(color[1]) },0), 
					rgb(${ Math.round(color[0]) },${ Math.round(color[1]) },255)`,	
			'hsv.h': `linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,
          #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`,
      'hsv.s': `linear-gradient(to top,rgba(0,0,0,${1-color[2]}),rgba(0,0,0,${1-color[2]})),
          linear-gradient(to top,hsl(${ color[0] },100%,100%),hsl(${ color[0] },100%,50%))`,
      'hsv.v': `linear-gradient(to top,rgba(0,0,0,1),transparent),
          linear-gradient(to top,hsl(${ color[0] },100%,50%),hsl(${ color[0] },100%,50%))`,
		}
		return background[outputModel]
	}

  getColor (e) {
    let {color, outputModel} = this.props
    let p = calcEventPosition(e, this.refs.container)
    let newColor = {
      'rgb.r': 255 - p.topP * 255,
      'rgb.g': 255 - p.topP * 255,
      'rgb.b': 255 - p.topP * 255,
      'hsv.h': 360 - 360 * p.topP,
      'hsv.s': 1 - p.topP,
      'hsv.v': 1 - p.topP,
    }
    return newColor[outputModel]
  }

  getPosition () {
    let {color, outputModel} = this.props 
    let position = {
      'rgb.r': 1 - color[0] / 255,
      'rgb.g': 1 - color[1] / 255,
      'rgb.b': 1 - color[2] / 255,
      'hsv.h': 1 - color[0] / 360,
      'hsv.s': 1 - color[1],
      'hsv.v': 1 - color[2]
    }
    return position[outputModel]
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
    console.log(top)
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
          cursor: 'default'
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