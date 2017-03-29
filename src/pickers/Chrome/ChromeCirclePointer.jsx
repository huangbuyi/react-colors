import React, {Component, PropTypes} from 'react'

export default function ChromeCirclePointer(props) {
	let { style, ...p } = props
	const root = Object.assign({
    width: '10px',
    height: '10px',
    boxShadow: `0 0 0 1px #fff,0 0 1px 1px rgba(0,0,0,.4)`,
    borderRadius: '50%',
    transform: 'translate(-5px, -5px)',
	}, style)

	return (
		<div style={ root } {...p}></div>
	)
}

ChromeCirclePointer.propTypes = {
	style: PropTypes.object
}
