import React from 'react'
import ColorPicker from '../../ColorPicker'
import ColorBar from '../' 

const Model = (props) => (
	<ColorPicker {...props}>
		<ColorBar model='hsv.h'/>
		<ColorBar model='hsv.s'/>
		<ColorBar model='hsv.v'/>
		<ColorBar model='rgb.r'/>
		<ColorBar model='rgb.g'/>
		<ColorBar model='rgb.b'/>
	</ColorPicker>
)

export default Model