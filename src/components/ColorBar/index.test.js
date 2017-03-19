import React from 'react'
import ColorPicker from '../ColorPicker.jsx'
import ColorBar from './ColorBar.jsx'
import { mount } from 'enzyme'


describe('ColorBar renders correctly', () => {

	it('show color', () => {
		const wrapper = mount(<ColorBar color={[127.5,0,0]} model='rgb.r'/>)
		expect(parseInt(wrapper.childAt(0).getNode().style.top)).toBe(50)
	})

	it('mousedown set color', () => {
		const colorBar = mount(<ColorBar color={[255,0,0]} model='rgb.r' onChange={(newColor) => {
			newColor[0] = parseInt(newColor[0])
			expect(newColor).toEqual([155,0,0])
		}}/>).find(ColorBar)

		colorBar.getNode().container = {
			clientWidth: 20,
			clientHeight: 256,
			getBoundingClientRect: function () {
				return { left: 100, top: 100 }
			}
		}	
		colorBar.simulate('mouseDown',{
			pageX: 105,
			pageY: 200
		})
	})
})