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
import chroma from 'chroma-js'

/*function colorType (props, propName, componentName) {
    if ( props[propName] && !color.isValid(props[propName])) {
     	return new Error(
       		'Invalid color prop `' + propName + '` supplied to' +
        	' `' + componentName + '`. Validation failed.'
      	);
    }
}*/

class ColorPicker extends React.Component {
	static propTypes = {
		// 监听颜色变化
		onChange: PropTypes.func,
		// 容器样式
		style: PropTypes.object,
		// 默认颜色
		// defaultColor: colorType,
		// 设置颜色
		// color: colorType,
		colorModel: PropTypes.oneOf(['rgb','hsl','hsv','...'])
	}	


	static defaultProps = {
		onChange: () => {},
		defaultColor: 'red'
	}

	constructor(props) {
		super(props);

		this.chroma = chroma(props.defaultColor, props.colorModel)
		this.state = {
			// data format:[r,g,b] i.e: [0,0,255]
			rgb: this.chroma.rgb(),
		}
	}

	componentWillReceiveProps(nextProps) {
		nextProps.color && this.setState({
			rgb: chroma(nextProps.color, nextProps.colorModel)
		})
	}

	shouldComponentUpdate(nextProps, nextState) {
		return true
	}

	handleChange (color, model, e) {

		this.chroma.set(model, color)
		let newRgb = this.chroma.rgb()
		this.setState({rgb: newRgb})
		this.props.onChange(newRgb, e)
	}


	render () {
		const styles = reactCSS({
		    'default': {
		   		root: {
		      		display: 'inline-block',
		      		boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
		      		padding: '6px',
		      		background: 'rgb(83,83,83)'
		    	},
		  	},
		  	'custom': {
		    	root: this.props.style
		    },
		}, {
			'custom': this.props.style
		})

		let { children } = this.props
		let chroma = this.chroma.set('rgb',this.state.rgb)
		// 为子组件传入新属性
		let newChildren = React.Children.map(children, child => {
			let model = child.props.model.split('.')[0] || 'rgb'
			return React.cloneElement(child, {
				onChange: (v, e) => {
					this.handleChange(v, model, e)
					child.props.onChange && child.props.onChange(v, e)
				},
				color: chroma.get(model)
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
