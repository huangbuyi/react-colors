import React, {PropTypes} from 'react'
import chroma from 'chroma-js'
import ColorPicker, {
	ColorInput, 
	ColorRadio, 
	ColorPanel, 
	ColorBar,
	ColorBlock
} from '../../components'

// 0:rgba,1:hsla,2:hex
class Chrome extends React.Component {

	static propTypes = {
		color: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
		colors: PropTypes.array,
		title: PropTypes.node,
		onChange: PropTypes.func,
		onAccept: PropTypes.func,
		onCancel: PropTypes.func,
		model: PropTypes.string,
		colorModel: PropTypes.string
	}

	static defaultProps = {
		title: 'Color Picker',
	  color: [255,0,0],
	  onChange: () => {},
	  onAccept: () => {},
	  onCancel: () => {},
	  colors: ['#f44336','#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#03a9f4','#00bcd4',
						 '#009688','#4caf50','#8bc34a','#cddc39','#fffb3b','#ffc107','#ff9800','#ff5722',
						 '#795548','#9e9e9e','#607d8b']
	}

	handleModelToggle = () => this.setState({inputModel: ++this.state.inputModel % 3})

	constructor(props) {
		let c = chroma(props.color, props.colorModel)
	  super(props)
		let color = {hex:c.hex(), css:c.css(), rgba:c.rgba()}
	  this.state = {
	  	color: color,
	  	currColor: color,
	  	inputModel: 0
	  }
	}

	handleChange = (newColor) => {
		console.log(newColor)
		this.setState({color: newColor})
		this.props.onChange(newColor)
	}

	render () {
		let {color, currColor, inputModel} = this.state
		let {colors} = this.props

		const styles = {
			root: {
				position: 'relative',
				width: 232,
				height: 320,
				boxShadow: 'rgba(0, 0, 0, 0.247059) 0px 0px 0px 1px, rgba(0, 0, 0, 0.14902) 0px 8px 16px',
				background: '#ededed',
				borderRadius: 2,
				fontFamily: 'Consolas'
			},
			panel: {
				height: 125
			},
			hueBar: {
				position: 'absolute',
				left: 60,
				top: 140,
				width: 150,
				height: 12
			},
			alphaBar: {
				position: 'absolute',
				left: 60,
				top: 160,
				width: 150,
				height: 12
			},
			block: {
				position: 'absolute',
				left: 18,
				top: 144,
				width: 24,
				height: 24,
				borderRadius: 12
			},
			input: {
				width: 38,
				height: 20
			},
			hex: {
				position: 'absolute',
				left: 18,
				top: 185,
				height: 22,
				width: 175,
			},
			hexLabel: {
        display: 'none',
			},
			hexInput: {
				width: '100%',
				height: 20,
				textAlign: 'center',
				border: '1px solid #ccc',
				fontFamily: 'Consolas'
			},
			hexP: {
				position: 'absolute',
				left: 92,
				top: 210,
				color: '#999',
				textAlign: 'center',
				margin: 0,
				fontSize: 12,
			},
			colors: {
				position: 'absolute',
				bottom: 0,
				padding: '12px 0 0 25px',
				borderTop: '1px solid #ccc',
				marginTop: 9
			},
			card: {
				display: 'inline-block',
				width: 10,
				height: 10,
				margin: '0 9px 9px 0',
				borderRadius: 2,
				border: '1px solid rgba(0,0,0,0.2)'
			}
		}

		return (
			<ColorPicker style={ styles.root } color={ color.rgba } onChange={(a) => this.handleChange(a) }>	
				<ColorPanel style={ styles.panel }/>
				<ColorBar style={ styles.hueBar } model='hsv.h'/>
				<ColorBar style={ styles.alphaBar } model='alpha'/>
				<ColorBlock style={ styles.block } color={ color.css }/>
				{ 
					inputModel === 0 ? 
						<div data-color='1' key='rgb'>
							<ColorInput style={ styles.input } model='rgb.r' /> 
							<ColorInput style={ styles.input } model='rgb.g' /> 
							<ColorInput style={ styles.input } model='rgb.b' /> 
							<ColorInput style={ styles.input } model='alpha' /> 
						</div>
						: 
					inputModel === 1 ? 
						<div data-color='1' key='hsv'>
							<ColorInput style={ styles.input } model='hsv.h' /> 
							<ColorInput style={ styles.input } model='hsv.s' /> 
							<ColorInput style={ styles.input } model='hsv.v' /> 
							<ColorInput style={ styles.input } model='alpha' /> 
						</div>
						:
						<div data-color='1' key='hex'>
							<ColorInput style={ styles.hex } labelStyle={ styles.hexLabel} inputStyle={ styles.hexInput } label={null} model='hex' />
							<p style={ styles.hexP }>HEX</p>
						</div>
				}
				<div onClick={ this.handleModelToggle }>变</div>
				<div data-color='1' style={ styles.colors }>
					{colors.map( color => <ColorBlock key={color} color={color} style={styles.card}/> )}
				</div>
			</ColorPicker>
		)
	}
}

export default Chrome