import React from 'react'
import ColorInput from './ColorInput.jsx'
import { mount, render } from 'enzyme'
import { renderToJson } from 'enzyme-to-json'


describe('ColorInput renders correctly', () => {
	it('render correctly', () => {
		const wrapper = render(<ColorInput color={[255,0,0]} model='rgb.r'/>)
		expect(renderToJson(wrapper)).toMatchSnapshot()
	})

	it('show color correctly', () => {
		const input = mount(<ColorInput color={[123,0,0]} model='rgb.r'/>).find('input')
		expect(input.getNode().value).toBe('123')
	})

	describe('value change set color', () => {
		it('chang input', () => {
			const input = mount(<ColorInput color={[255,0,0]} model='rgb.r' onChange={newColor => {
				expect(newColor).toEqual([123,0,0])
			}}/>).find('input')

			input.simulate('change',{
				target: {
					value: 123
				}
			})
		})
		
		it('key down DOWN', () => {
			const input = mount(<ColorInput color={[123,0,0]} model='rgb.r' onChange={newColor => {
				expect(newColor).toEqual([122,0,0])
			}}/>).find('input')

			input.simulate('keyDown',{
				keyCode: 40
			})
		})
		
		it('key down UP', () => {
			const input = mount(<ColorInput color={[123,0,0]} model='rgb.r' onChange={newColor => {
				expect(newColor).toEqual([124,0,0])
			}}/>).find('input')

			input.simulate('keyUp',{
				keyCode: 38
			})
		})
	})
})