import React from 'react'
import PsPointer from './PsPointer.jsx'
import ColorPicker, {
	ColorInput, 
	ColorRadio, 
	ColorPanel, 
	ColorBar
} from '../components'


class Photoshop extends React.Component {
	static defaultProps = {
	  color: [255,0,0]
	}

	constructor(props) {
	  super(props)
	
	  this.state = {
	  	color: props.color,
	  	currColor: props.color
	  }
	}

	handleChange = (newColor) => {
		console.log(newColor)
		this.setState({color: newColor})
	}

	handleConfirm = () => {
		this.setState({currColor: this.state.color})
	}

	render () {
		let {color, currColor} = this.state

		const styles = {
			root: {
				width: 567,
				height: 354,
				boxShadow: 'rgba(0, 0, 0, 0.247059) 0px 0px 0px 1px, rgba(0, 0, 0, 0.14902) 0px 8px 16px',
				background: '#ededed'
			},
			title: {
				boxSizing: 'border-box',
				position: 'absolute',
				color: '#666',
				left: 0,
				top: 0,
				width: '100%',
				height: 26,
				lineHeight: '26px',
				paddingLeft: 4, 
				fontSize: 13,
				background: '#fff'
			},
			panel: {
				position: 'absolute',
				left: 12,
				top: 57,
				width: 255,
				height: 255
			},
			bar: {
				display: 'absolute',
				left: 280,
				top: 57,
				width: 20,
				height: 255
			},
			color: {
				position: 'absolute',
				left: 315,
				top: 44,
				width: 60,
				height: 68,
			},
			colorP: {
				margin: 0,
				fontSize: 13,
				textAlign: 'center'
			},
			buttons: {
				position: 'absolute',
				left: 436,
				top: 36
			},
			colorNew: {
				height: 34,
				background: `rgb(${Math.round(color[0])},${Math.round(color[1])},${Math.round(color[2])})`
			},
			colorCurr: {
				height: 34,
				background: `rgb(${Math.round(currColor[0])},${Math.round(currColor[1])},${Math.round(currColor[2])})`
			},
			inputs: {
				position: 'absolute',
				left: 315,
				top: 167,
			},
			input: {
				marginBottom: 4,
				width: 100,
				height: 19
			} 
		}

		return (
			<ColorPicker style={ styles.root } defaultColor={this.props.color} colorModel='rgb' onChange={ (a) => this.handleChange(a) }>	
				<div style={ styles.title }>Color Picker</div>
				<ColorPanel style={ styles.panel }/>
				<ColorBar pointer={ <PsPointer /> } style={ styles.bar }/>
				<div style={ styles.color }>
					<p style={ styles.colorP }>new</p>
					<div style={ styles.colorNew }></div>
					<div style={ styles.colorCurr }></div>
					<p style={ styles.colorP }>current</p>
				</div>
				<div style={ styles.buttons }>
					<button onClick={ this.handleConfirm }>OK</button>
				</div>
				<div style={ styles.inputs } data-color='1'>
					<div data-color='1' style={ styles.input }><ColorRadio model='hsv.h' /><ColorInput label='H:' model='hsv.h'/></div>
					<div data-color='1' style={ styles.input }><ColorRadio model='hsv.s' /><ColorInput label='S:' model='hsv.s'/></div>
					<div data-color='1' style={ styles.input }><ColorRadio model='hsv.v' /><ColorInput label='V:' model='hsv.v'/></div>
					<div style={{height: 4}}></div>
					<div data-color='1' style={ styles.input }><ColorRadio model='rgb.r' /><ColorInput label='R:' model='rgb.r'/></div>
					<div data-color='1' style={ styles.input }><ColorRadio model='rgb.g' /><ColorInput label='G:' model='rgb.g'/></div>
					<div data-color='1' style={ styles.input }><ColorRadio model='rgb.b' /><ColorInput label='B:' model='rgb.b'/></div>
				</div>
			</ColorPicker>
		)
	}
}

export default Photoshop