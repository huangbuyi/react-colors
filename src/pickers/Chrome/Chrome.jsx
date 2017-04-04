import React, {PropTypes} from 'react'
import chroma from 'chroma-js'
import ColorPicker, {
	ColorInput, 
	ColorRadio, 
	ColorPanel, 
	ColorBar,
	ColorBlock
} from '../../components'
import ChromeCirclePointer from './ChromeCirclePointer'
import ChromeDiscPointer from './ChromeDiscPointer'
import ChromeToggleIcon from './ChromeToggleIcon'

// 0:rgba,1:hsla,2:hex
class Chrome extends React.Component {

	static propTypes = {
		color: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
		colors: PropTypes.array,
		onChange: PropTypes.func,
		colorModel: PropTypes.string
	}

	static defaultProps = {
	  color: [255,0,0,1],
	  onChange: () => {},
	  colors: ['#f44336','#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#03a9f4','#00bcd4',
						 '#009688','#4caf50','#8bc34a','#cddc39','#fffb3b','#ffc107','#ff9800','#ff5722',
						 '#795548','#9e9e9e','#607d8b']
	}

	constructor(props) {
		let c = chroma(props.color, props.colorModel)
	  super(props)
		let color = {css:c.css(), rgba:c.rgba()}
	  this.state = {
	  	color: color,
	  	currColor: color,
	  	inputModel: 0
	  }
	}

	componentWillReceiveProps(nextProps) {
		let c = chroma(nextProps.color, nextProps.colorModel)
		let color = {css:c.css(), rgba:c.rgba()}
		this.setState({color: color})
	}


	handleModelToggle = () => this.setState({inputModel: ++this.state.inputModel % 3})

	handleChange = (v, e) => {
		this.props.onChange(v, e)
		this.setState({color: v})
	}

	render () {
		let {color, currColor, inputModel} = this.state
		let {colors} = this.props

		return (
			<ColorPicker style={ styles.root } color={ color.rgba } onChange={(a) => this.handleChange(a) }>	
				<ColorPanel style={ styles.panel } pointer={ <ChromeCirclePointer/> }/>
				<ColorBar style={ styles.hueBar } model='hsv.h' pointer={ <ChromeDiscPointer/> }/>
				<ColorBar style={ styles.alphaBar } model='alpha' pointer={ <ChromeDiscPointer/> }/>
				<ColorBlock style={ styles.block } color={ color.css }/>
				{ 
					inputModel === 0 ? 
						<div style={ styles.inputsDiv } data-color='1' key='rgb'>
							<ColorInput inputStyle={ styles.input } labelStyle={ styles.inputLabel } model='rgb.r' /> 
							<ColorInput inputStyle={ styles.input } labelStyle={ styles.inputLabel } model='rgb.g' /> 
							<ColorInput inputStyle={ styles.input } labelStyle={ styles.inputLabel } model='rgb.b' /> 
							<ColorInput inputStyle={ styles.input } labelStyle={ styles.inputLabel } label='A' model='alpha' /> 
						</div>
						: 
					inputModel === 1 ? 
						<div style={ styles.inputsDiv } data-color='1' key='hsv'>
							<ColorInput inputStyle={ styles.input } labelStyle={ styles.inputLabel } model='hsv.h' /> 
							<ColorInput inputStyle={ styles.input } labelStyle={ styles.inputLabel } model='hsv.s' scale={100}/> 
							<ColorInput inputStyle={ styles.input } labelStyle={ styles.inputLabel } model='hsv.v' scale={100}/> 
							<ColorInput inputStyle={ styles.input } labelStyle={ styles.inputLabel } label='A' model='alpha' /> 
						</div>
						:
						<div style={ styles.inputsDiv } data-color='1' key='hex'>
							<ColorInput inputStyle={ styles.hexInput } labelStyle={ styles.hexLabel } label='HEX' model='hex' sharp={true}/>
						</div>
				}
				<div style={ styles.toggle } onClick={ this.handleModelToggle }>
					<ChromeToggleIcon />
				</div>
				<div data-color='1' style={ styles.colors }>
					{colors.map( color => <ColorBlock key={color} color={color} style={styles.card}/> )}
				</div>
				<div style={ styles.tail }></div>
				<div style={ styles.tail2 }></div>
			</ColorPicker>
		)
	}
}

const styles = {
	root: {
		position: 'relative',
		width: 232,
		height: 320,
		boxShadow: 'rgba(0, 0, 0, 0.24) 0px 2px 4px, rgba(0, 0, 0, 0.24) 0px 6px 12px',
		background: '#fff',
		borderRadius: 2,
		fontFamily: 'Consolas'
	},
	panel: {
		height: 125,
		overflow: 'hidden'
	},
	hueBar: {
		position: 'absolute',
		left: 60,
		top: 140,
		width: 150,
		height: 12,
		borderRadius: 2
	},
	alphaBar: {
		position: 'absolute',
		left: 60,
		top: 160,
		width: 150,
		height: 12,
		borderRadius: 2
	},
	block: {
		position: 'absolute',
		left: 18,
		top: 144,
		width: 24,
		height: 24,
		borderRadius: 12
	},
	inputsDiv: {
		position: 'absolute',
		left: 16,
		top: 185,
		fontSize: 0
	},
	input: {
		width: 40,
		height: 22,
		textAlign: 'center',
		border: '1px solid #ccc',
		fontFamily: 'Consolas',
		borderRadius: 2
	},
	inputLabel: {
		position: 'absolute',
		color: '#999',
		left: 15,
		top: 24
	},
	hexLabel: {
		position: 'absolute',
		color: '#999',
		left: 76,
		top: 24
	},
	hexInput: {
		width: 172,
		height: 22,
		textAlign: 'center',
		border: '1px solid #ccc',
		fontFamily: 'Consolas',
		borderRadius: 2
	},
	colors: {
		position: 'absolute',
		bottom: 0,
		padding: '12px 0 0 12px',
		borderTop: '1px solid #ccc',
		marginTop: 9,
		fontSize: 0
	},
	card: {
		display: 'inline-block',
		width: 10,
		height: 10,
		margin: '0 12px 12px 0',
		borderRadius: 2,
		border: '1px solid rgba(0,0,0,0.2)'
	},
	toggle: {
		position: 'absolute',
		left: 203,
		top: 196
	},
	tail: {
		position: 'absolute',
		top: 321,
		left: 13,
		borderWidth: 7,
		borderColor: 'rgba(0,0,0,0.15) transparent transparent transparent',
		borderStyle: 'solid',
	},
	tail2: {
		position: 'absolute',
		top: 320,
		left: 13,
		borderWidth: 7,
		borderColor: '#fff transparent transparent transparent',
		borderStyle: 'solid',
	}
}

export default Chrome