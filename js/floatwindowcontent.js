import React, {
	Component
} from 'react'
import FloatWindowMainGroup from './floatwindowmaingroup'
import FloatWindowSubGroup from './floatwindowsubgroup'
import {
	sendEvent,
	catchEvent,
	middleEvents
} from './eventmodel'

export default class FloatWindowContent extends Component {
	constructor() {
		super()
		this.state = {
			mainAuth: "",
			background: ""
		}
		this.initialOver = false
	}

	selectedMainItem(mainAuth) {
		this.setState({
			mainAuth: mainAuth
		})
	}

	changebackground(hasList) {
		let _background = ""
		if (!hasList) {
			_background = ""
		}
		this.setState({
			background: _background
		}, () => {
			this.initialOver = true
		})

	}
	sendtomiddle() {
		//发送给middle 处理收起
		sendEvent(middleEvents.floatwindowSubGroupClickMainClose, false)
	}
	render() {
		let _mainAuth = this.state.mainAuth
		let _selectedMainItem = this.selectedMainItem.bind(this)
		let _changebackground = this.changebackground.bind(this)
		let _background = this.state.background
		let _display = this.props.show
		let _height = this.props.heights - 120 + "px"
		let _floatheight = this.props.heights - 160 + "px"
		let _closeheight = this.props.heights - 160 + "px"
		let _movename = _display == "block" ? "animated slideInDown FloatWindowContentContainer" : "animated slideOutUp FloatWindowContentContainer"
			//			if(!this.initialOver){ _movename =	"FloatWindowContentContainer"}
			//			else{ _movename = _display=="block"?"animated slideInDown FloatWindowContentContainer":"animated slideOutUp FloatWindowContentContainer"}
			/*<span className="middlesubgrouppreviewremind">
				说明：<span className="middlesubgrouppreviewremindgrey">红色字体</span>，非此车架号分组
			</span>*/
		return (
			<div className={_movename} style={{background: _background,display:"block",height:_height}}>
					<div className="FloatWindowContent" style={{height:_floatheight,overflowY:"auto"}}>
						<FloatWindowMainGroup selectedMainItem={_selectedMainItem} />
						<FloatWindowSubGroup mainAuth={_mainAuth}  changebackground={_changebackground}/>
					</div>
					<div className="middlesubgrouppreviewclose middlesubgrouppreviewclosefix"
						style={{position:"fixed",top:_closeheight}} 
						onClick={this.sendtomiddle.bind(this)}>

						<div className="middlesubgrouppreviewcloseimg"></div>
					</div>
				</div>
		)
	}
}