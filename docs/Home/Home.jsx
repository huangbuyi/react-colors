import React from 'react'
import {docList, navList} from '../docs'
import Docs from './Docs'
import prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import marked from 'marked'
import './myMarkdown.css'
import 'prismjs/themes/prism.css'

var renderer = new marked.Renderer() 
// make marked support multi language header id
renderer.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[\s\r\n]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

marked.setOptions({
	gfm: true,
	highlight: function(code) {
		return Prism.highlight(code, Prism.languages.jsx)
	}
})



class Home extends React.Component {

	getList (list) {
		let newList = []
		let tmp = ''
		list.map( (item, i) => {
			if( typeof item !== 'string') {
				newList.push(
					<div 
						key={'doc' + i}
						dangerouslySetInnerHTML={{__html: marked(tmp, {renderer})}}
					></div>
				)
				newList.push(React.createElement(item.default, {
					key: 'comp' + i
				}))
				item = ''
			}
			tmp += '\n' + item
		})

		return newList
	}

	render () {
		return (
			<div className='doc'>
				{ this.getList(docList.zhCN) }
			</div>
		)
	}
}

export default Home