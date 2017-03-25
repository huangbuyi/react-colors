import React from 'react'
import ColorRadio from './ColorRadio.jsx'
import { mount, render } from 'enzyme'
import { renderToJson } from 'enzyme-to-json'

describe('ColorRadio correctly', () => {
	it('render correctly', () => {
		const wrapper = render(<ColorRadio model='rgb.r'/>)
		expect(renderToJson(wrapper)).toMatchSnapshot()
	})
})