import React, {Component, PropTypes} from 'react'

export default function CirclePointer(props) {
	let { style, ...p } = props
	const root = Object.assign({
    width: '4px',
    height: '4px',
    boxShadow: `0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),
      0 0 1px 2px rgba(0,0,0,.4)`,
    borderRadius: '50%',
    transform: 'translate(-2px, -2px)',
	}, style)

	return (
		<div style={ root } {...p}></div>
	)
}

CirclePointer.propTypes = {
	style: PropTypes.object
}
