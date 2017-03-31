import React from 'react'
import {ColorPicker, ColorPanel} from 'react-colors'

const Model = (props) => (
	<ColorPicker {...props}>
		<ColorPanel model='hsv.h'/>
		<ColorPanel model='hsv.s'/>
		<ColorPanel model='hsv.v'/>
		<ColorPanel model='rgb.r'/>
		<ColorPanel model='rgb.g'/>
		<ColorPanel model='rgb.b'/>
	</ColorPicker>
)

export default Model