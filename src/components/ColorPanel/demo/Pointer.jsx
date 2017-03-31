import React from 'react'
import {ColorPicker, ColorPanel} from 'react-colors'
console.log(ColorPicker)

const style = {
	width: 200,
	height: 200
}

const MyPointer = () => <div>X</div>

const Pointer = (props) => (
	<ColorPicker {...props}>
		<ColorPanel model='hsv.h' pointer={ <MyPointer/> } style={ style }/>
	</ColorPicker>
)

export default Pointer