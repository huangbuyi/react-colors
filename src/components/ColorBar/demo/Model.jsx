import React from 'react'
import { ColorPicker, ColorBar } from 'react-colors' 

const style = {
	width: 20,
	height: 200
}

const Model = (props) => (
	<ColorPicker {...props}>
		<ColorBar model='hsv.h' style={ style }/>
		<ColorBar model='hsv.s' style={ style }/>
		<ColorBar model='hsv.v' style={ style }/>
		<ColorBar model='rgb.r' style={ style }/>
		<ColorBar model='rgb.g' style={ style }/>
		<ColorBar model='rgb.b' style={ style }/>
	</ColorPicker>
)

export default Model