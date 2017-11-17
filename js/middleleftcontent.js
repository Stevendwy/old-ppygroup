import React, { Component } from 'react'
import ShowImageView from './showimageview'
import { sendEvent, catchEvent, removeEvent, middleEvents } from './eventmodel'

export default class MiddleLeftContent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			imgsData: { data: { mapdata: [], imgurl: "" } },
			background: "url('https://cdns.007vin.com/img/p_jiegoutu.png') no-repeat center center",
			loadingImgshow: "block"
		}
		this._subGroupClick = this.subGroupClick.bind(this)
		this.uid = ""//用来识别网络请求回来的内容与分组点击所需要内容是否匹配
	}

	componentDidMount() {
		catchEvent(middleEvents.subGroupClick, this._subGroupClick)
		catchEvent(middleEvents.showSubGroupPreview, e => {
			let _changeHeight = e.info.showSubGroupPreview ? 232 : 0//减去了40
			let _middleleftcontentcontainer = this.refs.middleleftcontentcontainer
//			_middleleftcontentcontainer.style.marginTop = _num + "px"
			$(_middleleftcontentcontainer).animate({
				marginTop:_changeHeight + "px"
			},"slow")			
//			_middleleftcontentcontainer.style.height = _middleleftcontentcontainer.offsetHeight + _changeHeight + "px"
		})
	}

	componentWillUnmount() {
		removeEvent(middleEvents.subGroupClick, this._subGroupClick)
	}

	subGroupClick(e) {
		this.uid = e.info.uid
		//请求数据刷新
		let _url = "/ppycars/subimgs"
		getAjax(_url, {
			auth: e.info.auth,
			code: params.code
		}, response => {
			if(response.uid != this.uid) return
			this.setState({
				imgsData: response,
				loadingImgshow: "block"
			})
		})
	}

	render() {
		let _imgsData = this.state.imgsData
		let _background = this.state.background

		return(
			<div ref="middleleftcontentcontainer" className="MiddleLeftContentContainer">
				<div className="MiddleLeftContent"
					style={{background: _background}}>
					<ShowImageView
						imgsData={_imgsData}
						loadingImgshow={this.state.loadingImgshow}
						changeBackground={() => {this.setState({background: "white"})}}/>
				</div>
			</div>
		)
	}
}