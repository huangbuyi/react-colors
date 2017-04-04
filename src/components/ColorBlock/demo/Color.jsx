import React from 'react'
import {ColorPicker, ColorBlock} from 'react-colors'

const style = {display: 'inline-block', width: 18, height: 18, border: '1px solid #fff', boxShadow: '#666 0 0 0 1px', margin: '0 12px 12px 0', borderRadius: 2,}
const colors = ['#f44336','#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#03a9f4','#00bcd4','#009688','#4caf50','#8bc34a','#cddc39','#fffb3b','#ffc107','#ff9800','#ff5722','#795548','#9e9e9e','#607d8b']
const ColorExample = (props) => (
	<ColorPicker {...props}>
		{
			colors.map(color => <ColorBlock color={color} style={style} key={color}/>)
		}
	</ColorPicker>
)

export default ColorExample