import React from 'react'
import ColorPanel from './ColorPanel.jsx'
import { mount, render } from 'enzyme'
import { renderToJson } from 'enzyme-to-json'

describe('ColorPanel renders correctly', () => {
	it('render correctly', () => {
		const wrapper = render(<ColorPanel color={[255,0,0]} model='rgb.r'/>)
		expect(renderToJson(wrapper)).toMatchSnapshot()
	})

	it('show color correctly', () => {
		const wrapper = mount(<ColorPanel color={[255,127.5,127.5]} model='rgb.r'/>)
		expect(parseInt(wrapper.childAt(0).getNode().style.top)).toBe(50)
		expect(parseInt(wrapper.childAt(0).getNode().style.left)).toBe(50)
	})

	it('mousedown set color correctly', () => {
		const colorPanel = mount(<ColorPanel color={[255,0,0]} model='rgb.r' onChange={newColor => {
			newColor[1] = Math.round(newColor[1])
			newColor[2] = Math.round(newColor[2])
			expect(newColor).toEqual([255,155,100])
		}}/>).find(ColorPanel)

		colorPanel.getNode().container = {
			clientWidth: 256,
			clientHeight: 256,
			getBoundingClientRect: function () {
				return { left: 100, top: 100 }
			}
		}	
		colorPanel.simulate('mouseDown',{
			pageX: 200,
			pageY: 200
		})
	})
})


