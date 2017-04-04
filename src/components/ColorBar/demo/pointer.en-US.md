`pointer` set user defined componnet, replace of default. Notice that adjust translate to right place.

```
import React from 'react'
import {ColorPicker, ColorBar} from 'react-colors'

const style = {width: 200,height: 20 }
const Pointer = () => <div>X</div>

const PointerExample = (props) => (
	<ColorPicker {...props}>
		<ColorBar model='hsv.h' pointer={ <Pointer/> } style={ style }/>
	</ColorPicker>
)
```