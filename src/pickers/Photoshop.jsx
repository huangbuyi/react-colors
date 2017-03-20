import React from 'react'
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
			bar: {
				display: 'inline-block',
				marginLeft: 16
			},
			color: {
				display: 'inline-block',
				width: 60,
				height: 68
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
				display: 'inline-block',
				verticalAlign: 'top'
			},
			input: {
				width: 36,
				height: 19
			} 
		}

		console.log(styles.colorNew)

		return (
			<ColorPicker defaultColor={this.props.color} colorModel='rgb' onChange={ (a) => this.handleChange(a) }>	
				<ColorPanel />
				<div style={ styles.bar } data-color='1'>
					<ColorBar />
				</div>
				<div style={ styles.color }>
					<p>new</p>
					<div style={ styles.colorNew }></div>
					<div style={ styles.colorCurr }></div>
					<p>current</p>
				</div>
				<div style={ styles.inputs } data-color='1'>
					<div data-color='1'><ColorRadio model='hsv.h' /><ColorInput model='hsv.h'/></div>
					<div data-color='1'><ColorRadio model='hsv.s' /><ColorInput model='hsv.s'/></div>
					<div data-color='1'><ColorRadio model='hsv.v' /><ColorInput model='hsv.v'/></div>
					<div data-color='1'><ColorRadio model='rgb.r' /><ColorInput model='rgb.r'/></div>
					<div data-color='1'><ColorRadio model='rgb.g' /><ColorInput model='rgb.g'/></div>
					<div data-color='1'><ColorRadio model='rgb.b' /><ColorInput model='rgb.b'/></div>
				</div>
				<button onClick={ this.handleConfirm }>OK</button>
			</ColorPicker>
		)
	}
}

export default Photoshop