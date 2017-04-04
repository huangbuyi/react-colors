`pointer` set user defined componnet, replace of default. Notice that adjust translate to right place.

```
import React from 'react'
import {ColorPicker, ColorPanel} from 'react-colors'

const style = {width: 200,height: 200}
const MyPointer = () => <div>X</div>

const PointerExample = (props) => (
	<ColorPicker {...props}>
		<ColorPanel model='hsv.h' pointer={ <MyPointer/> } style={ style }/>
	</ColorPicker>
)
```