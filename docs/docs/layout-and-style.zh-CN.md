包裹子组件的元素，应标记`data-color`为一个真实值，容器组件会为其传入属性。因此，可以使用被标记的原生元素和自定义组件添加布局和样式。

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