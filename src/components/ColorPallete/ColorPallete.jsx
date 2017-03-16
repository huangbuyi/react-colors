import React, { Component, PureComponent, PropTypes } from 'react'
import chroma from 'chroma-js'

function getHue (hsv, num) {
	var i = num, colors = []
	num = num || 12
	while(i > 0){
		colors.push(
			chroma([(hsv[0] + 360 - i*360/num)%360, hsv[1], hsv[2]], 'hsv').hex()
		)
		i--
	}
	return colors
}

function ColorPallete ({color}) {
	let hsv = chroma(color).hsv()
	let colors = getHue(hsv,36)

	return <div>
		{ 
			colors.map( (c,i) => (
				<span key={i} style={{
					display:'inline-block',
					width:18,
					height:18,
					backgroundColor:c,
					margin: '0 6px 6px 0',
					borderRadius: 2
				}}></span>
			))
		}
	</div>
}

ColorPallete.defaultProps = {
	model: 'rgb'
}

export default ColorPallete