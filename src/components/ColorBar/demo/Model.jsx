import React from 'react'
import { ColorPicker, ColorBar } from 'react-colors' 

const style = { display: 'inline-block',width: 20,height: 200,boxShadow:'0 1px 4px rgba(0,0,0,0.28)',margin:'0 24px 4px 0'}

const ModelExample = (props) => (
	<ColorPicker {...props}>
		<ColorBar model='hsv.h' style={ style } direction='vertical'/>
		<ColorBar model='hsv.s' style={ style } direction='vertical'/>
		<ColorBar model='hsv.v' style={ style } direction='vertical'/>
		<ColorBar model='rgb.r' style={ style } direction='vertical'/>
		<ColorBar model='rgb.g' style={ style } direction='vertical'/>
		<ColorBar model='rgb.b' style={ style } direction='vertical'/>
	</ColorPicker>
)

export default ModelExample