
# Customizable color picker

[![](https://img.shields.io/travis/huangbuyi/react-freecolor.svg)](https://travis-ci.org/huangbuyi/react-freecolor)
[![Codecov](https://img.shields.io/codecov/c/github/huangbuyi/react-freecolor.svg)](https://codecov.io/github/huangbuyi/react-freecolor)
[![NPM downloads](https://img.shields.io/npm/dt/react-freecolor.svg)](https://www.npmjs.com/package/react-freecolor)
[![NPM downloads](https://img.shields.io/npm/v/react-freecolor.svg)](https://www.npmjs.com/package/react-freecolor)
[![NPM downloads](https://img.shields.io/npm/l/react-freecolor.svg)](https://www.npmjs.com/package/react-freecolor)

## Install

```js
npm install react-colors
```

## Usage

### Assembled Components 

```jsx
import React from 'react'
import {Chrome} from 'react-colors/lib/pickers'

const Picker = () =>  <Chrome />
```

So far, you can import `ChromeP` `Photoshop`.All assembled picker assemble from customizable components.

### Custom color picker 
```jsx
import React from 'react'
import {ColorPicker, ColorPanel, ColorBar} from 'react-colors'

const styles = {
	pandelDiv: {width: 255, height: 255},
	barDiv: {width: 20, height: 255, marginLeft: 20}
}

const MyPicker = () => (
	<ColorPicker>
		<div data-color={true} style={ styles.pandelDiv }>
			<ColorPanel />	
		</div>
		<div data-color={true} style={ styles.barDiv }>
			<ColorBar />
		</div>
	</ColorPicker>
)
```
There are a container components and 5 differents child components. You can style and layout them through any label marked `data-color` as `true` value, or pass style props in.  

- `ColorBar`: One-dimensional color picker. Suppot Red, Green, Blue, Hue, Saturation, Value(Brightness) channel. 
- `ColorPanel`: Two-dimensional color picker. Support Red-Green, Green-Blue, Red-Blue, Saturation-Value, Hue-Value, Hue-Saturation model.
- `ColorInput`: Number input. Support RGB, HSV, Lab, CMYK, Alpha color model. 
- `ColorRadio`: A radio to toggle color model. 
- `ColorBlock`: A color block fill a color.



