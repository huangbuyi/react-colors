As a container component, response for color conversion and API unification. `color` support multi ways input，such as`red`, `[255,0,0]`, `#ff0000` and so on，other color space input should set `ColorModel`. `onChang` is a callback function of color change, return a object:

```
import React from 'react';
import { ColorPicker } from 'react-colors';

class Component extends React.Component {

  handleChange(color, e) {
  	/* color = {
			rgb: [80, 134, 144],
			rgba: [80, 134, 144, 0.572],
			hsl: [189.38, 0.286, 0.439],
			hsv: [189.38, 0.444, 0.565],
			lab: [52.69, -15.13, -10.98],
			lch: [52.69, 18.69, 215.96],
			hcl: [215.95, 18.69, 52.69],
			cmyk: [0.444, 0.0694, 0, 0.435],
			css: "rgba(80,134,144,0.5723760738357511)",
			hex: "#508690",
			temperature: 40000,
			a: 0.572,
			alpha: 0.572,
		} */
  }

  render() {
    return (
    	<ColorPicker onChange={ this.handleChange }>{ // some children }</ColorPicker>
  }
}
```

Color conversion library modified from [chroma-js](http://gka.github.io/chroma.js/#chroma)
