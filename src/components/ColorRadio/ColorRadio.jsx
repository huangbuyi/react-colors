import React from 'react'

function ColorRadio ({model, ...props}) {
	return <input type='radio' {...props} />
}

ColorRadio.displayName='ColorRadio'

export default ColorRadio