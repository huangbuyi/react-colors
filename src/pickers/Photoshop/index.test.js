import React from 'react'
import Photoshop from './Photoshop.jsx'
import { mount, render } from 'enzyme'
import { renderToJson } from 'enzyme-to-json'

describe('ColorHexInput', () => {
	it('render correctly', () => {
		const wrapper = render(<Photoshop color='#2196F3'/>)
		expect(renderToJson(wrapper)).toMatchSnapshot()
	})
})