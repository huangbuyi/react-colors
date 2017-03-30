import React from 'react'
import {render} from 'react-dom'
import ColorPicker from '../src/components/ColorPicker'
import ColorPanel from '../src/components/ColorPanel'
import ColorBlock from '../src/components/ColorBlock'

/* 组合化拾色器组件，让组件自由组合 */

// todo 考虑hex字符串

class Demo extends React.Component {
	state = {
		color: '#2196F3',
		visible: false
	}

	render () {
		const styles = {
			root: {
				width: 200,
				height: 200,
				border: '1px solid #fff',
				boxShadow: '#333 0 0 0 1px',
			}
		}
		return (
			<ColorPicker style={styles.root}>
				<ColorPanel />
				<ColorBlock color='#2196F3'/>
			</ColorPicker>
			
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
