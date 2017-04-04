`pointer` 传入用户指针组件，取代默认指针。注意调整指针偏移，保证所指位置准确。

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