model change x y


```
import React from 'react'
import ColorPicker from '../../ColorPicker'
import ColorPanel from '../ColorPanel' 

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
```


