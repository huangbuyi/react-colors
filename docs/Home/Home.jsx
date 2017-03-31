import React from 'react'
import {docList, navList} from '../docs'
import Docs from './Docs'

class Home extends React.Component {

	render () {
		console.log(docList)
		console.log(navList)
		return (
			<div>
				HOME
			</div>
		)
	}
}

export default Home