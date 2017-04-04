作为容器的组件，对子组件进行色彩空间转换，添加统一接口。`color` 为颜色值，支持多种输入方式，如`red`,`[255,0,0]`,`#ff0000`等，其它色彩空间输入应指定`ColorModel`。`onChange` 为子组件颜色值变化的回调，返回一个颜色值对象：

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
    return <ColorPicker onChange={ this.handleChange }>{ // some children }</ColorPicker>
  }
}
```

色彩转换使用的是[chroma-js](http://gka.github.io/chroma.js/#chroma)库，略作修改。

