import React, {
	Component
} from 'react'
import {
	sendEvent,
	catchEvent,
	middleEvents
} from './eventmodel'
export default class MiddleLeftTitle extends Component {
	constructor() {
		super()
		this.state = {
			title: "",
			_title: "",
			_maingroup: "",
			_subgroup: "",
			isPartner: false //是否第三方页面嵌入
		}
		this._newtitle = ""
	}

	componentDidMount() {
		catchEvent(middleEvents.source, e => {
			this.setState({
				isPartner: true
			})
		})

		//title 拼接

		let _url = "/ppycars/heads"
		if (isParts) _url = "/ppypart/heads"
		else if (isVIN) _url = "/ppyvin/heads"
		let _obj = { //车型基本，没有p和vin
			auth: params.auth,
			code: params.code
		}
		if (isParts) _obj.p = params.p
		else if (isVIN) _obj.vin = params.vin
		getAjax(_url, _obj, response => {
			let title = response.data.carhead[0]
			this.setState({
				_title: title
			}, () => {
				if (isVIN) {
					vin = title.substring(0, 17)
					vins = title.substring(18)
				} else carinfo = title
			})
			catchEvent(middleEvents.mainGroupClick, e => {
				this.setState({
					_maingroup: e.info.groupname
				})
			})
			catchEvent(middleEvents.subGroupClick, e => {
				this.setState({
					_subgroup: e.info.title
				})
			})
		})
		catchEvent(middleEvents.floatwindowMainGroupClicks, e => {
			this.setState({
				_maingroup: e.info.headtitle
			})
		})
	}

	componentWillReceiveProps(props) {
		let _MiddleLeftTitle = this.refs.MiddleLeftTitle
		$(_MiddleLeftTitle).animate({
			marginTop: props.marginT
		}, "slow")
	}

	goEngien() {
		let url = `/engine/index?brandName=${brandCode}&cid=${cid}`
		if (isVIN) url += `&vin=${params.vin}&vins=${vins}`
		else url += `&carinfo=${carinfo}`
			//		 href = url
		var href = encodeURI(url)
		window.open(href)
	}

	showAddAlias() {
		sendEvent(middleEvents.toggleAddAlias)
	}

	render() {
		let _goEngien = this.goEngien.bind(this)
		let _showAddAlias = this.showAddAlias.bind(this)
		let _searchbtnshow = brandCode == "bmw" ? "block" : "none" //判断是不是宝马
		if (isVIN == false || this.state.isPartner) {
			_searchbtnshow = "none"
		}
		let _titles = this.state._title + " / " + this.state._maingroup + " / " + this.state._subgroup
		canverauth = _titles
		let _margintop = this.props.marginT
		return (
			<div className="MiddleLeftTitleContainer">
				<div className="MiddleLeftTitle" ref="MiddleLeftTitle" style={{position:"relative"}}>
                    <span dangerouslySetInnerHTML={{__html: _titles}}></span>

					<div className="AllContainer AllContainerSearch" style={{display:_searchbtnshow}}
						onClick={_goEngien}>
						<div  className="ControlBubble">
							<p>零件搜索</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}