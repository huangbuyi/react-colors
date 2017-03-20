import React from 'react'
import {render} from 'react-dom'
import ColorPicker from '../src/components/ColorPicker.jsx'
import ColorPanel from '../src/components/ColorPanel'
import ColorBar from '../src/components/ColorBar'
import ColorInput from '../src/components/ColorInput'
import ColorPallete from '../src/components/ColorPallete'
import ColorRadio from '../src/components/ColorRadio'
import Photoshop from '../src/pickers'

/* 组合化拾色器组件，让组件自由组合 */

// todo 考虑hex字符串

const style = {
	divider: {
		height: 1,
		background: '#ccc',
		margin: '8px 0'
	},
	fields: {
		padding: '0 12px' 
	},
	inputStyle: {
		root: {
			marginBottom: 8
		},
		input: {
			boxSizing: 'border-box',
			paddingLeft: 6,
			height: 34,
			width: 80,
			border: '1px solid #ccc',
			borderRadius: 2,
			verticalAlign: 'top'
		},
		label: {
			height: 34,
			lineHeight: '34px',
			width: 20,
		}
	},
	hueStyle: {
		root: {
			marginLeft: 8
		}
	},
	radio: {
		marginTop: 20
	},
	colorBar: {
		marginLeft: 16
	}
}


render (
	<Photoshop />,
	document.querySelector('.content')
)

// todo: 将一些样式设为默认值
// todo 组件默认样式
// todo 可配置选框样式
// todo 可配置输入框按钮、标签位置
// todo 默认值，变量类型

/*

<ColorPicker defaultColor={[255,0.5,0.5]} colorModel='rgb' onChange={ (a) => this.handleChange(a) }>	
				<ColorBar />	
				<ColorPanel />	
				<span data-color='2' style={ style.colorBar }>	
					<ColorBar />	
				</span>
				<ColorPallete />
				<ColorInput model='rgb.r'/>
				<ColorInput model='rgb.g'/>
				<ColorInput model='rgb.b'/>
				<ColorInput model='hsv.h'/>
				<ColorInput model='hsv.s'/>
				<ColorInput model='hsv.v'/>
				<div data-color='1' style={ style.radio }>
					<ColorRadio model='rgb.r'/>
					<ColorRadio model='rgb.g'/>
					<ColorRadio model='rgb.b'/>
					<ColorRadio model='hsv.h'/>
					<ColorRadio model='hsv.s'/>
					<ColorRadio model='hsv.v'/>
				</div>
			</ColorPicker>
*/