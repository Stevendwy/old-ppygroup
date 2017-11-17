import React, {Component} from 'react'
import {render} from 'react-dom'
import Top from './top'
import Middle from './middle'
import FastClick from './fastclick' 
import {sendEvent, catchEvent, middleEvents} from './eventmodel'

class Page extends Component {
	componentDidMount() {
		FastClick.attach(document.body)//苹果点击延时处理

		getAjax("/open/authsource", {}, res => {
			if(res.data === "xa") {
				sendEvent(middleEvents.source, {source: res.data})
			}
		})
	}
	
	click() {
		sendEvent(middleEvents.bodyClick, {})//增加了全局点击事件
	}
	
	render() {
		return (
			<div className="PageContainer" onClick={this.click.bind(this)}>
				<Top />
				<Middle />
			</div>
		)
	}
}

render(
	<Page />,
	document.getElementById("root")
)
