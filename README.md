# 可组合拾色器

组件部分参考自[casesandberg/react-color](https://github.com/casesandberg/react-color)。相比react-color，该组件更加组合化和客制化，可以任意选择需要的组件进行组合，调整布局，设置各组件样式，并允许添加自定义组件。

## 示例代码

```
class ColorPickerExample extends React.Component {

	handleChange (colorObj) {
		console.log(colorObj)
	}

	render () {

		return (
			<ColorPicker color='blue' onChange={ (a) => this.handleChange(a) }>				
				<Saturation/>
				<Hue style={ style.hueStyle } direction='vertical'/>
				<Fields style={ style.fields }>
					<EditableInput style={ style.inputStyle } label='r'/>
					<EditableInput style={ style.inputStyle } label='g'/>
					<EditableInput style={ style.inputStyle } label='b'/>
					<div style={ style.divider }></div>
					<EditableInput style={ style.inputStyle } label='h'/>
					<EditableInput style={ style.inputStyle } label='s'/>
					<EditableInput style={ style.inputStyle } label='l'/>
				</Fields>
			</ColorPicker>
		)
	}
}
```

## 其它链接

[react-color-picker](http://4bin.cn/projects/react-color-picker/)

## 参考

- [casesandberg/react-color](https://github.com/casesandberg/react-color)
- [TinyColor](https://github.com/bgrins/TinyColor)
- [Wikipedia: HSL and HSV](https://en.wikipedia.org/wiki/HSL_and_HSV)
- [二维拾色CSS样式](http://codepen.io/huangbuyi/pen/gmbvov)