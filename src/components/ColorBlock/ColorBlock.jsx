import React, { Component, PureComponent, PropTypes } from 'react'
import getTransparentBackground from '../../helpers/getTransparentBackground'



/*function getHue (hsv, num) {
	var i = num, colors = []
	num = num || 12
	while(i > 0){
		colors.push(
			chroma([(hsv[0] + 360 - i*360/num)%360, hsv[1], hsv[2]], 'hsv').hex()
		)
		i--
	}
	return colors
}*/

function ColorBlock ({style, color, onClick, ...props}) {
	const styles = {
		root: Object.assign({}, style, {
			...getTransparentBackground(color)
		})
	}
	return <div 
		style={ styles.root } 
		onClick={e => onClick(color, e)}
		{...props}
	></div>
}

ColorBlock.displayName='ColorBlock'

ColorBlock.defaultProps = {
	color: PropTypes.string.isRequired
}

export default ColorBlock