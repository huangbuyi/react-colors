support rgb, hsv, lab and cmyk color space.


```
import React from 'react'
import {ColorPicker, ColorInput} from 'react-colors'

const inputStyle = {width: 80, height: 20, fontFamily: 'Consolas', paddingLeft: 6}

const ModelExample = (props) => (
	<ColorPicker {...props}>
		<ColorInput model='hsv.h' inputStyle={ inputStyle }/>
		<ColorInput model='hsv.s' inputStyle={ inputStyle }/>
		<ColorInput model='hsv.v' inputStyle={ inputStyle }/>
		<ColorInput model='rgb.r' inputStyle={ inputStyle }/>
		<ColorInput model='rgb.g' inputStyle={ inputStyle }/>
		<ColorInput model='rgb.b' inputStyle={ inputStyle }/>
		<ColorInput model='lab.l' inputStyle={ inputStyle }/>
		<ColorInput model='lab.a' inputStyle={ inputStyle }/>
		<ColorInput model='lab.b' inputStyle={ inputStyle }/>
		<ColorInput model='cmyk.c' inputStyle={ inputStyle }/>
		<ColorInput model='cmyk.m' inputStyle={ inputStyle }/>
		<ColorInput model='cmyk.y' inputStyle={ inputStyle }/>
		<ColorInput model='cmyk.k' inputStyle={ inputStyle }/>
		<ColorInput model='hex' inputStyle={ inputStyle }/>
		<ColorInput model='alpha' inputStyle={ inputStyle }/>
	</ColorPicker>
)
```


