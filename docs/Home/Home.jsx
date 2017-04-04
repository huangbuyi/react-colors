import React from 'react'
import {docList, navList} from '../docs'
import Docs from './Docs'
import prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import marked from 'marked'
import './home.css'
import 'prismjs/themes/prism.css'
import Header from './Header'

import getTransparentBackground from 'react-colors/helpers/getTransparentBackground'

var renderer = new marked.Renderer() 
const NAV_TOP = 400
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
	constructor(props) {
		super(props)
		let color = [Math.round(Math.random()*255),Math.round(Math.random()*255),Math.round(Math.random()*255),Math.random()]
		this.state = {
			color: color,
			shouldFix: false,
			language: 'English',
			isDark: false
		}
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll)
	}

	handleScroll = () => {
		let shouldFix = (document.body.scrollTop - NAV_TOP) >= 0
		if(this.state.shouldFix !== shouldFix) {
			this.setState({shouldFix: shouldFix})
		}
	}

	toggleLanguage = () => this.setState({language: this.state.language === 'English' ? '中文' : 'English'})

	handleColorChange = (v) => { 
		console.log(v)
		this.setState({color: v.rgba, isDark: v.hsl[2] < 0.5 && v.rgba[3] > 0.5}) 
	}

	getList (list) {
		let newList = []
		let tmp = ''
		list.map( (item, i) => {
			if(typeof item !== 'string') {
				newList.push(
					<div 
						className='doc-item'
						key={'doc' + i}
						dangerouslySetInnerHTML={{__html: marked(tmp, {renderer})}}
					></div>
				)
				newList.push(
					<div 
						className='demo-item'
						key={'demo' + i}
					>
					{ React.createElement(item.default, {
						color: this.state.color,
						onChange: this.handleColorChange
					}) }
					</div>
				)
				tmp = ''
			} else {
				tmp += '\n' + item
			}
			
		})

		tmp && newList.push(
			<div 
				className='doc-item'
				key={'doc-end'}
				dangerouslySetInnerHTML={{__html: marked(tmp, {renderer})}}
			></div>
		)

		return newList
	}

	getNav (navs) {
		let id = 1
		return navs.map( (nav, i) => (
			<div 
				key={ nav[0] } 
				className={ 'nav-' + nav[1] }
			>
				{ nav[1] === 1 ? <span>{ '0' + id++ }</span> : null }
				<a href={ '#' + nav[0].toLowerCase() }>{ nav[0] }</a>
			</div>
		))
	}

	render () {
		let { color, shouldFix, isDark, language } = this.state
		let backColor = `rgba(${Math.round(color[0])},${Math.round(color[1])},${Math.round(color[2])},${color[3]})`
		const homeStyle = {
			...getTransparentBackground(backColor, 24)
		}
		const navStyle = {
			position: shouldFix ? 'fixed' : 'absolute'
		}

		let lan = language === 'English' ? 'zhCN' : 'enUS'
		let clsName = isDark ? 'nav dark' : 'nav light'
		return (
			<div className='home' style={homeStyle}>
				<Header onChange={this.handleColorChange} color={color}/>
				<div className='markdown'>
					{ this.getList(docList[lan]) }
					<div className={ clsName } ref={ node => this.nav=node } style={ navStyle }>
						{ this.getNav(navList[lan]) }
					</div>
				</div>
				<div className='language' onClick={ this.toggleLanguage }>
					{ language }
				</div>
			</div>
		)
	}
}

export default Home