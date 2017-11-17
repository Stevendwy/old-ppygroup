import React, {Component} from 'react'
import {sendEvent, catchEvent, removeEvent, middleEvents} from './eventmodel'

export default class MiddleSubGroupPreviewItem extends Component {
	constructor() {
		super()
	}
	
	mouseEvent(item, e) {
		if (e.target.className == "MiddleSubGroupPreviewImgContainer") {
			return
		}
		let _show = "none"
		let _left = 0
		if(e.type == "mouseover") {
			_show = "block"
			_left = e.target.getBoundingClientRect().left
		}
		
		this.props.controlBubble(_show, item, _left)
	}
	
	click(auth, index, uid) {
		sendEvent(middleEvents.subGroupPreviewClick, {
			auth: auth,
			index: index,
			uid: uid,
			stopScroll: true
		})
		sendEvent(middleEvents.floatwindowSubGroupClickYulan, false)//发送给middlesubgppview 改变状态
		sendEvent(middleEvents.floatwindowSubGroupClickMiddle, false)//发给middle 处理父级
	}
	
	render() {
		let _props = this.props
		let _showClassName = _props.showClassName
		let _loadingview = _props.loadingview
		let _imgsShow = _props.imgsShow
		let _item = _props.item
		let _index = _props.index
		let _mouseEvent = this.mouseEvent.bind(this, _item)
		let _handleImageLoaded = _props.handleImageLoaded
		let _click = this.click

		return (
			<div className={_showClassName} ref="self"
				onMouseOver={_mouseEvent}
				onMouseLeave={_mouseEvent}
				onClick={_click.bind(this, _item.auth, _index, _item.uid)}>
				<img src={_loadingview} className="MiddleSubGroupPreviewBoxLoadimg" style={{display: _imgsShow}} />
				<img className="MiddleSubGroupPreviewImg" src={_item.url} alt={_item.subgroupname} onLoad={_handleImageLoaded} />
				<span className={_item.is_grey ? "MiddleSubGroupPreviewCode grey" : "MiddleSubGroupPreviewCode"}>{_item.mid}</span>
			</div>
		)
	}
}
