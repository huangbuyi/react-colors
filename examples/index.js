import React from 'react'
import {render} from 'react-dom'
import ColorPicker from '../src/components/ColorPicker'
import {Photoshop, Chrome} from '../src/pickers'
import getTransparentBackground from '../src/helpers/getTransparentBackground'
import NumberInput from '../src/components/ColorInput/NumberInput'

/* 组合化拾色器组件，让组件自由组合 */

// todo 考虑hex字符串
// 判断document.activeElement 的父辈元素是否为当前组件，不是就将activeModel设为null

class BothDemo extends React.Component {
	state = {
		color: [21,235,245,1],
	}

	handleChange = v => { 
		this.setState({color: v.rgba})
		console.log(v.rgba)
	}

	render () {
		let {color} = this.state

		return (
			<div>
				<Photoshop 
					color={ color } 
					colorModel='rgba'
					onChange={ this.handleChange }
				/> 
				<Chrome 
					color={ color } 
					colorModel='rgba'
					onChange={ this.handleChange }
				/> 
			</div>
			
		)
	}
}


class PsDemo extends React.Component {
	state = {
		color: '#2196F3',
		visible: false
	}

	render () {
		let {color, visible} = this.state
		const style = {
			width: 20,
			height: 20,
			border: '1px solid #fff',
			boxShadow: '#333 0 0 0 1px',
			background: color
		}
		return (
			<div>
				<div style={ style } onClick={() => this.setState({visible: !visible})}></div>
				{ this.state.visible ? <Photoshop 
						color={ color } 
						onAccept={v => this.setState({color: v.hex})}
						onCancel = {() => this.setState({visible: false})}
					/> : null 
				}
			</div>
			
		)
	}
}

class ChromeDemo extends React.Component {
	state = {
		color: [255,99,66,0.5],
		visible: true
	}

	render () {
		let {color, visible} = this.state
		const style = {
			width: 20,
			height: 20,
			border: '1px solid #fff',
			boxShadow: '#333 0 0 0 1px',
			...getTransparentBackground(`rgba(${color[0]},${color[1]},${color[2]},${color[3]})`)
		}
		return (
			<div>
				<div style={ style } onClick={() => this.setState({visible: !visible})}></div>
				{ this.state.visible ? <Chrome 
						color={ color } 
						onChange={v => this.setState({color: v.rgba})}
					/> : null 
				}
			</div>
		)
	}
}


render (
	<BothDemo />,
	document.querySelector('.content')
)

// todo: 将一些样式设为默认值
// todo 组件默认样式
// todo 可配置选框样式
// todo 可配置输入框按钮、标签位置
// todo 默认值，变量类型
