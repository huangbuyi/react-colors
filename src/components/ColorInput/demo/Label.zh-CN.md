自定义标签

```
import React from 'react'
import {ColorPicker, ColorInput} from 'react-colors'

const inputStyle = {width: 80, height: 20, fontFamily: 'Consolas', paddingLeft: 6}

const LabelExample = (props) => (
	<ColorPicker {...props}>
		<ColorInput model='cmyk.c' label='青' rightLabel='%' scale={100} inputStyle={inputStyle}/>
	</ColorPicker>
)

```