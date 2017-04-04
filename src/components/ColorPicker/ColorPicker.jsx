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
import chroma from 'chroma-js'
import padStart from '../../helpers/padStart'
import contains from '../../helpers/contains'


const formatHex = (hexStr) => {

	const max = 16777215
  const min = 0
  let num = parseInt(hexStr, 16) 
	let newValue = num > max ? 'ffffff' : hexStr
  newValue = num < min ? '0' : newValue
  return padStart(newValue, 6, '0')
}

const format = colors => colors.map(c => Number(c))

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
		colorModel: PropTypes.oneOf(['rgb','hsl','hsv','hex','rgba'])
	}	


	static defaultProps = {
		onChange: () => {},
		onModelChange: () => {},
		color: '#ff9966',
	}

	constructor(props) {
		super(props);

		this._chroma = chroma(props.color, props.colorModel)
		this.state = {
			// data format:[r,g,b] i.e: [0,0,255]
			color: props.color,
			model: 'hsv.h',
			activeModel: props.colorModel
		}
	}

	componentWillReceiveProps(nextProps) {
		nextProps.color && this.formateColor(nextProps.color, nextProps.colorModel)
		if( !contains(this.container, document.activeElement) ) {
			this.setState({activeModel: null})
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return true
	}

	handleChange (color, model, e) {
		this.setState({color: color, activeModel: model})
		this.props.onChange(this.formateColor(color, model), e)
	}

	handleModelChange (nextModel, e) {
		this.setState({model: nextModel})
		this.props.onModelChange(nextModel, e)
	}

	formateColor (color, model) {
		// keep alpha, because alpha would reset to 1 when chroma set color
		let alpha = model === 'rgba' ? Number(color[3]) : this._chroma.alpha()
		let _chroma = this._chroma = chroma(color, model).alpha(alpha)
		return {
			rgb: _chroma.rgb(),
			rgba: _chroma.rgba(),
			hsl: _chroma.hsl(),
			hsv: _chroma.hsv(),
			lab: _chroma.lab(),
			lch: _chroma.lch(),
			hcl: _chroma.hcl(),
			cmyk: _chroma.cmyk(),
			css: _chroma.css(),
			hex: _chroma.hex(),
			temperature: _chroma.temperature(),
			a: _chroma.alpha(),
			alpha: _chroma.alpha(),
		}
	}

	getChildren (children) {
		// 为子组件传入新属性
		let {activeModel, model, color} = this.state

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

			if(compName === 'ColorBlock') {
				return React.cloneElement(child, {
					onClick: (v, e) => {
						this.handleChange(v, 'hex', e)
						child.props.onChange && child.props.onChange(v, e)
					}
				})
			}

			if(['ColorPanel','ColorBar','ColorInput','ColorRadio'].indexOf(compName) > -1) {
				let model = child.props.model || this.state.model
				let type = model.split('.')[0] || 'rgb'
				type = type === 'alpha' ? 'rgba' : type

				// error!!!!!!!!!!!!!!!!!!!!!!!
				return React.cloneElement(child, {
					onChange: (v, e) => {
						this.handleChange(v, type, e)
						child.props.onChange && child.props.onChange(v, e)
					},
					color: type === activeModel ? this.state.color : this._chroma.get(type),
					model: model
				})
			}

			if(child.props['data-user-color']){
			
				return React.cloneElement(child, {
					color: this.formateColor(color, activeModel),
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
		const root = Object.assign({
			position: 'relative'
		}, style)

		return (
			<div style={ root } ref={ node => {this.container = node} }>
				{this.getChildren(children)}
			</div>
		)
	}
}

export default ColorPicker
