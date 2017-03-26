import React, {PropTypes} from 'react'
import chroma from 'chroma-js'
import ColorPicker, {
	ColorInput, 
	ColorRadio, 
	ColorPanel, 
	ColorBar,
	ColorBlock
} from '../../components'


class Chrome extends React.Component {
	static propTypes = {
		color: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
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
	  onCancel: () => {}
	}

	constructor(props) {
		let c = chroma(props.color, props.colorModel)
	  super(props)
		let color = {hex:c.hex(), css:c.css(), rgba:c.rgba()}
	  this.state = {
	  	color: color,
	  	currColor: color
	  }
	}

	handleChange = (newColor) => {
		console.log(newColor)
		this.setState({color: newColor})
		this.props.onChange(newColor)
	}


	render () {
		let {color, currColor} = this.state

		const styles = {
			root: {
				position: 'relative',
				width: 232,
				height: 320,
				boxShadow: 'rgba(0, 0, 0, 0.247059) 0px 0px 0px 1px, rgba(0, 0, 0, 0.14902) 0px 8px 16px',
				background: '#ededed',
				borderRadius: 2,
				fontSize: 'Robot nono Sans-serif'
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
				border: '1px solid #ccc'
			}		
		}
		return (
			<ColorPicker style={styles.root} color={ color.rgba } onChange={(a) => this.handleChange(a) }>	
				<ColorPanel style={ styles.panel }/>
				<ColorBar style={ styles.hueBar } model='hsv.h'/>
				<ColorBar style={ styles.alphaBar } model='alpha'/>
				<ColorBlock style={ styles.block } color={ color.css }/>
				<ColorInput style={ styles.hex } labelStyle={ styles.hexLabel} inputStyle={ styles.hexInput } label={null} model='hex' />
				<div>
					<ColorBlock color='#f44336'/>
				</div>
			</ColorPicker>
		)
	}
}

export default Chrome