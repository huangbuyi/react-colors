import React from 'react'
import {Chrome, Photoshop} from 'react-colors/pickers'
import './header.css'

const Header = (props) => (
	<div className='header'>
		<div className='pickers'>
			<div className='chrome'><Chrome {...props}/></div>
			<div className='photoshop'><Photoshop {...props}/></div>
		</div>
		
	</div>	
)

export default Header