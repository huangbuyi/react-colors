 const docs = [
	{ 
		title: ['About', '简介'],
		text: [require('./index.en-US.md'), require('./index.zh-CN.md')]  
	},
	{ 
		title: ['Components', '组件'],
		children: [ 
			{ 
				title: ['ColorPanel', 'ColorPanel'],
				text: [require('components/Colorpanel/index.en-US.md'), 
							 require('components/Colorpanel/index.zh-CN.md')],
				api: [require('components/Colorpanel/API.en-US.md'), 
						  require('components/Colorpanel/API.zh-CN.md')],
				children: [
					{ 
						title: ['Model','色彩模式'],
						text: [require('components/Colorpanel/demo/model.en-US.md'), 
									 require('components/Colorpanel/demo/model.zh-CN.md')],
						demo: require('components/Colorpanel/demo/Model') 
					},
					{ 
						title: ['Pointer','指针'],
						text: [require('components/Colorpanel/demo/pointer.en-US.md'),
									 require('components/Colorpanel/demo/pointer.zh-CN.md')],
						demo: require('components/Colorpanel/demo/Pointer') 
					}
				]
			}
		] 
	}
]

function getDocList(docArr, lan=0, sharp=2, navDeep=2) {
	let docs = []
	let navs = []
	let deep = 1
	sharp = sharp - 1
	let getList = (doc, deep) => {
		let {title, text, demo, api, children} = doc
		let headLevel = '#'.repeat(deep + sharp) 
		docs.push(headLevel + ' ' + title[lan])
		text && docs.push(text[lan])
		demo && docs.push(demo)
		deep <= navDeep && navs.push([title[lan], deep])
		children && children.map(child => {
			getList(child, deep + 1)
		})
		api && docs.push(headLevel + '# API \n' + api[lan])
	}
	docArr.map(doc => getList(doc, deep))
	return { docs, navs }
}

const enUS = getDocList(docs, 0, 1)
const zhCN = getDocList(docs, 1, 1)
export const docList = {enUS: enUS.docs, zhCN: zhCN.docs}
export const navList = {enUS: enUS.navs, zhCN: zhCN.navs}