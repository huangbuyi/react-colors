 const docs = [
	{ 
		title: ['About', '简介'],
		text: [require('./index.en-US.md'), require('./index.zh-CN.md')]  
	},
	{ 
		title: ['Get-Started', '快速上手'],
		children: [
			{ 
				title: ['Install','安装'],
				text: [require('./docs/install.en-US.md'), 
							 require('./docs/install.zh-CN.md')],
			},
			{ 
				title: ['Include','导入'],
				text: [require('./docs/include.en-US.md'),
							 require('./docs/include.zh-CN.md')],
			}
		]
	},
	{ 
		title: ['Color-Picker', '组合拾色器'],
		children: [
			{ 
				title: ['Chrome-Picker','Chrome拾色器'],
				text: [require('pickers/Chrome/index.en-US.md'), 
							 require('pickers/Chrome/index.zh-CN.md')],
				api: [require('pickers/Chrome/API.en-US.md'), 
						  require('pickers/Chrome/API.zh-CN.md')]
			},
			{ 
				title: ['Photoshop-Picker','Photoshop拾色器'],
				text: [require('pickers/Photoshop/index.en-US.md'), 
							 require('pickers/Photoshop/index.zh-CN.md')],
				api: [require('pickers/Photoshop/API.en-US.md'), 
						  require('pickers/Photoshop/API.zh-CN.md')]
			},
		]
	},
	{ 
		title: ['Components', '组件'],
		children: [ 
				{ 
				title: ['ColorPicker', 'ColorPicker'],
				text: [require('components/ColorPicker/index.en-US.md'), 
							 require('components/ColorPicker/index.zh-CN.md')],
				api: [require('components/ColorPicker/API.en-US.md'), 
						  require('components/ColorPicker/API.zh-CN.md')]
			},
			{ 
				title: ['ColorPanel', 'ColorPanel'],
				text: [require('components/ColorPanel/index.en-US.md'), 
							 require('components/ColorPanel/index.zh-CN.md')],
				api: [require('components/ColorPanel/API.en-US.md'), 
						  require('components/ColorPanel/API.zh-CN.md')],
				children: [
					{ 
						title: ['Model','色彩模式'],
						text: [require('components/ColorPanel/demo/model.en-US.md'), 
									 require('components/ColorPanel/demo/model.zh-CN.md')],
						demo: require('components/ColorPanel/demo/Model') 
					},
					{ 
						title: ['Pointer','指针'],
						text: [require('components/ColorPanel/demo/pointer.en-US.md'),
									 require('components/ColorPanel/demo/pointer.zh-CN.md')],
						demo: require('components/ColorPanel/demo/Pointer') 
					}
				]
			},
			{ 
				title: ['ColorBar', 'ColorBar'],
				text: [require('components/ColorBar/index.en-US.md'), 
							 require('components/ColorBar/index.zh-CN.md')],
				api: [require('components/ColorBar/API.en-US.md'), 
						  require('components/ColorBar/API.zh-CN.md')],
				children: [
					{ 
						title: ['Model','色彩模式'],
						text: [require('components/ColorBar/demo/model.en-US.md'), 
									 require('components/ColorBar/demo/model.zh-CN.md')],
						demo: require('components/ColorBar/demo/Model') 
					},
					{ 
						title: ['Pointer','指针'],
						text: [require('components/ColorBar/demo/pointer.en-US.md'),
									 require('components/ColorBar/demo/pointer.zh-CN.md')],
						demo: require('components/ColorBar/demo/Pointer') 
					}
				]
			},
			{ 
				title: ['ColorInput', 'ColorInput'],
				text: [require('components/ColorInput/index.en-US.md'), 
							 require('components/ColorInput/index.zh-CN.md')],
				api: [require('components/ColorInput/API.en-US.md'), 
						  require('components/ColorInput/API.zh-CN.md')],
				children: [
					{ 
						title: ['Model','色彩模式'],
						text: [require('components/ColorInput/demo/model.en-US.md'), 
									 require('components/ColorInput/demo/model.zh-CN.md')],
						demo: require('components/ColorInput/demo/Model') 
					},
					{ 
						title: ['Label','标签'],
						text: [require('components/ColorInput/demo/label.en-US.md'),
									 require('components/ColorInput/demo/label.zh-CN.md')],
						demo: require('components/ColorInput/demo/Label') 
					}
				]
			},
			{ 
				title: ['ColorBlock', 'ColorBlock'],
				text: [require('components/ColorBlock/index.en-US.md'), 
							 require('components/ColorBlock/index.zh-CN.md')],
				api: [require('components/ColorBlock/API.en-US.md'), 
						  require('components/ColorBlock/API.zh-CN.md')],
				children: [
					{ 
						title: ['Model','色彩模式'],
						text: [require('components/ColorBlock/demo/color.en-US.md'), 
									 require('components/ColorBlock/demo/color.zh-CN.md')],
						demo: require('components/ColorBlock/demo/Color') 
					}
				]
			},
			{ 
				title: ['ColorRadio', 'ColorRadio'],
				text: [require('components/ColorRadio/index.en-US.md'), 
							 require('components/ColorRadio/index.zh-CN.md')],
				api: [require('components/ColorRadio/API.en-US.md'), 
						  require('components/ColorRadio/API.zh-CN.md')]
			}
		] 
	},
	{ 
		title: ['Customization', '自定义'],
		children: [
			{ 
				title: ['Layout and style','布局与样式'],
				text: [require('./docs/layout-and-style.en-US.md'), 
							 require('./docs/layout-and-style.zh-CN.md')],
			},
			{ 
				title: ['User Component','用户组件'],
				text: [require('./docs/user-components.en-US.md'),
							 require('./docs/user-components.zh-CN.md')],
			}
		]
	},
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