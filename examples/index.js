import React from 'react'
import {render} from 'react-dom'
import ColorPicker from '../src/components/ColorPicker.jsx'
import {Photoshop} from '../src/pickers'

/* 组合化拾色器组件，让组件自由组合 */

// todo 考虑hex字符串

class Demo extends React.Component {
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


render (
	<Demo />,
	document.querySelector('.content')
)

// todo: 将一些样式设为默认值
// todo 组件默认样式
// todo 可配置选框样式
// todo 可配置输入框按钮、标签位置
// todo 默认值，变量类型
