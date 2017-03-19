
# 可组合拾色器

<p>
  <a href="https://circleci.com/gh/vuejs/vue/tree/dev"><img src="https://img.shields.io/circleci/project/vuejs/vue/dev.svg" alt="Build Status"></a>
  <a href="https://codecov.io/github/vuejs/vue?branch=dev"><img src="https://img.shields.io/codecov/c/github/vuejs/vue/dev.svg" alt="Coverage Status"></a>
  <a href="https://www.npmjs.com/package/react-freecolor"><img src="https://img.shields.io/npm/dt/react-freecolor.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/react-freecolor"><img src="https://img.shields.io/npm/v/react-freecolor.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/react-freecolor"><img src="https://img.shields.io/npm/l/react-freecolor.svg" alt="License"></a>
</p>

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