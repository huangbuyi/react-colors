model 

Set `model` as a string like `colorSpace.coord`. `colorSpace` is color space, support rgb and hsv, `coord` is coordinate in color space. `coord` is mutable in `ColorBar` component


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


