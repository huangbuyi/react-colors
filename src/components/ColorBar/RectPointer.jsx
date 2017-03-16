import React from 'react'

function RectPointer () {
	const style = {
    width: '4px',
    borderRadius: '1px',
    height: '8px',
    boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
    background: '#fff',
    transform: 'translateY(-4px)',
  }

	return <div style={ style } />
}

export default RectPointer