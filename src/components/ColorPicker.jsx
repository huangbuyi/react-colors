/* 
	容器组件，将颜色属性和onChange事件传递给每个子组件，并作为设定颜色和获取颜色的接口 
	颜色输入格式：任何合法的颜色格式
	颜色输出格式 {
	  hsl: { a: 1, h: 0, l: 0.5, s: 1 },
	  hex: '#ff0000',
	  rgb: { r: 255, g: 0, b: 0, a: 1 },
	  hsv: { h: 0, s: 1, v: 1, a: 1 },
	  oldHue: 0
	}
	参考https://github.com/bgrins/TinyColor
*/

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
		// 监听颜色变化
		onChange: PropTypes.func,
		// 容器样式
		style: PropTypes.object,
		// 默认颜色
		defaultColor: colorType,
		// 设置颜色
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

		// 为子组件传入新属性
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
