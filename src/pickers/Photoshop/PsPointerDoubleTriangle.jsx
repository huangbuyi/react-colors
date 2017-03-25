import React from 'react'

function PsSVGPointer (props) {
	return (
		<svg width="10px" height="10px" version="1.1" xmlns="http://www.w3.org/2000/svg"  {...props}>
		  <path d="M0 5 L6 1 L8 1 A2 2 0 0 1 9 2 L9 8 A2 2 0 0 1 8 9 L6 9 L0 5"/>
		</svg> 
	)
}

PsSVGPointer.defaultProps = {
	fill: "#fff",
	stroke: "#666",
}

function PsPointerDoubleTriangle () {
	const style = {
		root: {
			position: 'absolute',
			width: 40,
			transform: 'translate(-10px, -5px)' 
		},
		left: {
			float: 'left',
			transform: 'rotate(180deg)'
		},
		right: {
			float: 'right'
		}
	}

	return (
		<div style={ style.root }>
			<PsSVGPointer style={style.left}/>
			<PsSVGPointer style={style.right}/>
		</div>
	)
}

export default PsPointerDoubleTriangle