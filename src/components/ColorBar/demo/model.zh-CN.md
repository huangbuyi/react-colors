`model` 指定组件的拾色模式，格式为 `colorSpace.coord`，`colorSpace` 为色彩空间，目前支持 rgb 和 hsv，`coord` 指定色彩空间中的坐标，该坐标作为可变值。

```
import React from 'react'
import { ColorPicker, ColorBar } from 'react-colors' 

const style = { width: 20, height: 200}

const ModelExample = (props) => (
	<ColorPicker {...props}>
		<ColorBar model='hsv.h' style={ style }/>
		<ColorBar model='hsv.s' style={ style }/>
		<ColorBar model='hsv.v' style={ style }/>
		<ColorBar model='rgb.r' style={ style }/>
		<ColorBar model='rgb.g' style={ style }/>
		<ColorBar model='rgb.b' style={ style }/>
	</ColorPicker>
)
```