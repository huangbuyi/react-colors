支持 hex 模式


```
import React from 'react'
import {ColorPicker, ColorBlock} from 'react-colors'

const ColorExample = (props) => (
	<ColorPicker {...props}>
		<ColorBlock color='#2196F3'/>
	</ColorPicker>
)
```