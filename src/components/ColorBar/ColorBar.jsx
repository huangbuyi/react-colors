import React, { Component, PureComponent, PropTypes } from 'react'
import throttle from 'lodash/throttle'
import calcEventPosition from '../../helpers/calcEventPosition'
import RectPointer from './RectPointer.jsx'

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
		direction: '',
	}

  constructor(props) {
    super(props)
    this.handleChange = throttle(this.handleChange, 50)
  }

	getBackground () {
		let {color, model, direction} = this.props
    let direct = direction === 'vertical' ? 'top' : 'left'
		let background = {
			'rgb.r': `linear-gradient(to ${ direct }, rgb(0,${ Math.round(color[1]) },${ Math.round(color[2]) }), 
					rgb(255, ${ Math.round(color[1]) }, ${ Math.round(color[2]) })`,
			'rgb.g': `linear-gradient(to ${ direct }, rgb(${ Math.round(color[0]) },0,${ Math.round(color[2]) }), 
					rgb(${ Math.round(color[0]) },255,${ Math.round(color[2]) })`,
			'rgb.b': `linear-gradient(to ${ direct }, rgb(${ Math.round(color[0]) },${ Math.round(color[1]) },0), 
					rgb(${ Math.round(color[0]) },${ Math.round(color[1]) },255)`,	
			'hsv.h': `linear-gradient(to ${ direct }, #f00 0%, #ff0 17%, #0f0 33%,
          #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`,
      'hsv.s': `linear-gradient(to ${ direct },rgba(0,0,0,${1-color[2]}),rgba(0,0,0,${1-color[2]})),
          linear-gradient(to ${ direct },hsl(${ color[0] },100%,100%),hsl(${ color[0] },100%,50%))`,
      'hsv.v': `linear-gradient(to ${ direct },rgba(0,0,0,1),transparent),
          linear-gradient(to ${ direct },hsl(${ color[0] },100%,50%),hsl(${ color[0] },100%,50%))`,
      'alpha': `linear-gradient(to ${ direct }, transparent, rgb(${ Math.round(color[0]) },${ Math.round(color[1]) },${ Math.round(color[2]) })),linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), 
linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)`
		}
		return background[model]
	}

  getColor (e) {
    let {color, model, direction} = this.props
    let p = calcEventPosition(e, this.container)
    let distance = direction === 'vertical' ? p.topP : p.leftP
    let newColor = {
      'rgb.r': [255 - distance * 255, color[1], color[2]],
      'rgb.g': [color[0], 255 - distance * 255, color[2]],
      'rgb.b': [color[0], color[1], 255 - distance * 255],
      'hsv.h': [360 - 360 * distance, color[1], color[2]],
      'hsv.s': [color[0], 1 - distance, color[2]],
      'hsv.v': [color[0], color[1], 1 - distance],
      'alpha': [color[0], color[1], color[2], distance]
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
      'hsv.v': 1 - color[2],
      'alpha': color[3]
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
    let {pointer, style, pointerStyle, direction, model} = this.props
    let position = this.getPosition() * 100

    const styles = {
      'root': Object.assign({
        position: 'relative',
        height: '100%',
        backgroundImage: this.getBackground(),
        curosr: 'default',
        backgroundSize: model === 'alpha' ? '100% 100%,12px 12px,12px 12px' : null,
        backgroundPosition: model === 'alpha' ? '0 0,0 0,6px 6px' : null,
        backgroundColor: model === 'alpha' ? '#fff' : null,
      }, style),
      'pointer': Object.assign({
        position: 'absolute',
        [direction === 'vertical'?'top':'left']: position + '%',
      }, pointerStyle)
    }

    return (
      <div 
        style={ styles.root }
        ref={node => this.container = node}
        onMouseDown={ this.handleMouseDown }
        onTouchMove={ this.handleChange }
        onTouchStart={ this.handleChange }
      >
        <div style={ styles.pointer }>
          { pointer }
        </div>
      </div>
    )
  }
}

export default ColorBar