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
		onModelChange: () => {},
		defaultColor: 'red',
		history: []
	}

	constructor(props) {
		super(props);

		this.chroma = chroma(props.defaultColor, props.colorModel)
		this.state = {
			// data format:[r,g,b] i.e: [0,0,255]
			rgb: this.chroma.rgb(),
			model: 'rgb.r'
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

	handleModelChange (nextModel, e) {
		this.setState({model: nextModel})
		this.props.onModelChange(nextModel, e)
	}

	getChildren (children) {
		// 为子组件传入新属性
		return React.Children.map(children, child => {
			let compName = child.type.name

			if(child.props['data-color']) {
				let divChildren = child.props.children 

				return React.cloneElement(child, {
					children: this.getChildren(divChildren)
				})
			}

			if(compName === 'ColorRadio') {
				return React.cloneElement(child, {
					checked: this.state.model === child.props.model,
					onChange: (m, e) => { 
						this.handleModelChange(child.props.model, e)
					}
				})
			}

			if(['ColorPanel','ColorBar','ColorInput','ColorPallete','ColorRadio'].indexOf(compName) > -1) {
				let model = child.props.model || this.state.model
				let type = model.split('.')[0] || 'rgb'
				return React.cloneElement(child, {
					onChange: (v, e) => {
						this.handleChange(v, type, e)
						child.props.onChange && child.props.onChange(v, e)
					},
					color: this.chroma.get(type),
					model: model
				})
			}

			if(/*自定义组件传入所有属性color,model*/false){
				let color = {
					rgb: [],
					hsv: [],
					model: [],
				}
				return React.cloneElement(child, {
					color: color,
					onChange: (value, type) => { 
						this.handleCustomChange(value, type, e)
					}
				})
			}

			return React.cloneElement(child)
		})
	}

	render () {
		let { children, style } = this.props
		this.chroma.set('rgb', this.state.rgb)
		const root = Object.assign({
			position: 'relative'
		}, style)

		return (
			<div style={ root }>
				{this.getChildren(children)}
			</div>
		)
	}
}

export default ColorPicker
