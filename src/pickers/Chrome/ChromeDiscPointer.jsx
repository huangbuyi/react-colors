import React, {Component, PropTypes} from 'react'

export default function ChromeDiscPointer(props) {
	let { style, ...p } = props
	const root = Object.assign({
    width: '14px',
    height: '14px',
    boxShadow: '0 1px 2px rgba(0,0,0,.32)',
    background: '#f8f8f8',
    borderRadius: '50%',
    transform: 'translate(-5px, -1px)',
    cursor: 'pointer'
	}, style)

	return (
		<div style={ root } {...p}></div>
	)
}

ChromeDiscPointer.propTypes = {
	style: PropTypes.object
}
