import React, {PropTypes} from 'react'
import reactCSS from 'reactcss'
import color from '../helpers/color'

function colorType (props, propName, componentName) {
    if ( props[propName] && !color.isValid(props[propName])) {
     	return new Error(
       		'Invalid color prop `' + propName + '` supplied to' +
        	' `' + componentName + '`. Validation failed.'
      	);
    }
}

class ColorPicker extends React.Component {
	static propTypes = {
		onChange: PropTypes.func,
		style: PropTypes.object,
		defaultColor: colorType,
		color: colorType
	}

	static defaultProps = {
		onChange: () => {},
		defaultColor: 'red'
	}

	constructor(props) {
		super(props);
		this.state = {
			color: color.toState(props.color || props.defaultColor)
		}
	}

	componentWillReceiveProps(nextProps) {
		nextProps.color && this.setState({
			color: color.toState(nextProps.color)
		})
	}

	handleChange (v, e) {
		let newColor = color.toState(v)
		this.setState({color: newColor})
		this.props.onChange(newColor, e)
	}


	render () {
		const styles = reactCSS({
		    'default': {
		   		root: {
		      		display: 'inline-block',
		      		boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
		      		padding: '6px',
		    	},
		  	},
		  	'custom': {
		    	root: this.props.style
		    },
		}, {
			'custom': this.props.style
		})

		let { children } = this.props
		let newChildren = React.Children.map(children, child => {
			return React.cloneElement(child, {
				onChange: (v, e) => {
					this.handleChange(v, e)
					child.props.onChange && child.props.onChange(v, e)
				},
				...this.state.color
			})
		})

		return (
			<div style={ styles.root }>
				{newChildren}
			</div>
		)
	}
}

export default ColorPicker
