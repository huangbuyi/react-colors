import React from 'react'
import ColorPicker from '../../ColorPicker'
import ColorPanel from '../ColorPanel' 

const Pointer = () => <div>X</div>

const Model = (props) => (
	<ColorPicker {...props}>
		<ColorPanel model='hsv.h' pointer={ <Pointer/> }/>
	</ColorPicker>
)

export default Model