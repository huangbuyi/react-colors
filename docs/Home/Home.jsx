import React from 'react'
import {docList, navList} from '../docs'
import Docs from './Docs'

class Home extends React.Component {

	getList (list) {
		let newList = []
		let tmp = ''
		list.map( item => {
			if( typeof item !== 'string') {
				newList.push(<div>{ tmp }</div>)
				newList.push(React.createElement(item.default))
				item = ''
			}
			tmp += item
		})

		return newList
	}

	render () {
		return (
			<div>
				{ this.getList(docList.zhCN) }
			</div>
		)
	}
}

export default Home