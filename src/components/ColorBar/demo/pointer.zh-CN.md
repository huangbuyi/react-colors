`pointer` 传入用户指针组件，取代默认指针。注意调整指针偏移，保证所指位置准确。

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