import React, { Component, PureComponent, PropTypes } from 'react'
import reactCSS from 'reactcss'
import calcEventPosition from '../../helpers/calcEventPosition'
import PsPointer from './PsPointer.jsx'
import RectPointer from './RectPointer.jsx'
// todo 完善v

class ColorBar extends (PureComponent || Component) {
	static defaultProps = {
		model: PropTypes.oneOf(['rgb.r','rgb.g','rgb.b','hsv.h','hsv.s','hsv.v']),
		pointer: PropTypes.node,
		rgb: PropTypes.object,
    hsv: PropTypes.object,
    onChange: PropTypes.func
	}

	static defaultProps = {
		pointer: <RectPointer />,
		direction: 'vertical',
	}

	getBackground () {
		let {color, model} = this.props
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
		return background[model]
	}

  getColor (e) {
    let {color, model} = this.props
    let p = calcEventPosition(e, this.container)
    let newColor = {
      'rgb.r': [255 - p.topP * 255, color[1], color[2]],
      'rgb.g': [color[0], 255 - p.topP * 255, color[2]],
      'rgb.b': [color[0], color[1], 255 - p.topP * 255],
      'hsv.h': [360 - 360 * p.topP, color[1], color[2]],
      'hsv.s': [color[0], 1 - p.topP, color[2]],
      'hsv.v': [color[0], color[1], 1 - p.topP],
    }
    return newColor[model]
  }

  getPosition () {
    let {color, model} = this.props 
    let position = {
      'rgb.r': 1 - color[0] / 255,
      'rgb.g': 1 - color[1] / 255,
      'rgb.b': 1 - color[2] / 255,
      'hsv.h': 1 - color[0] / 360,
      'hsv.s': 1 - color[1],
      'hsv.v': 1 - color[2]
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
    this.handleChange(e)
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
          background: this.getBackground(),
          borderRadius: this.props.radius,
          boxShadow: this.props.shadow,
          cursor: 'default',
        },
        pointer: {
          position: 'absolute',
          left: 0,
          top: top + '%',
        }
      },
    })

    return (
      <div 
        style={ styles.root }
        ref={node => this.container = node}
        onMouseDown={ this.handleMouseDown }
        onTouchMove={ this.handleChange }
        onTouchStart={ this.handleChange }
      >
        <div style={ styles.pointer }>
          { this.props.pointer }
        </div>
      </div>
    )
  }
}

export default ColorBar