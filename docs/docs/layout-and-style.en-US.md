Element contain component marked `data-color` a true value, container component would set props automatically. You can style and layout component via marked element. 

```
import React from 'react'
import {ColorPicker, ColorBlock} from 'react-colors'

const style={width: 20, height: 20}
const Example = () =>  (
	<ColorPicker>
		<div className='cls' data-coor='1'><ColorBlock color='#ff9966'/></div>
		<span style={style} data-coor={ true }><ColorBlock color='#ff6699'/></span>
		<ul data-color='1'>
			<li data-color='1'><ColorBlock color='#99ff66'/></li>
		</ul>
	</ColorPicker>
)
```