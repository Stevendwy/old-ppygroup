import React, {
	Component
} from 'react'
import PropTypes from "prop-types"
import {
	sendEvent,
	catchEvent,
	middleEvents
} from './eventmodel'

export default class Top extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showLogout: "none",
			showNumber: "--",
			hasMessages: false, //是否有新消息
			isPartner: false //是否是第三方嵌入页面
		}

		this.vinType = "vin"
		this.carType = "car"
		this.partType = "part"
		this.chooseType = "vin" //记录上次点击记录，防止多次点击相同清空内容
	}

	componentDidMount() {
		catchEvent(middleEvents.source, e => {
			this.setState({
				isPartner: true
			})
		})

		getAjax("/usersinfos", {}, response => {
			this.setState({
				showNumber: response.data.users
			})
		})

		this.pollTimer = setInterval(() => {
			this.poll()
		}, 900000)

		this.poll()
	}

	//轮询获取消息状态
	poll() {
		getAjax("/user/msglocalunread", {}, res => {
			// console.log(res)
			let _hasMessages = false
			if (res.data.total_counts > 0) _hasMessages = true
			this.setState({
				hasMessages: _hasMessages
			})
		})
	}

	showLogout(e) {
		let _showLogout = "none"
		if (e.type == "mouseover") {
			_showLogout = "initial"
		}
		if (e.type == "click") {
			let _stateshowLogout = this.state.showLogout == "initial" ? "none" : "initial"
			_showLogout = _stateshowLogout
		}
		this.setState({
			showLogout: _showLogout
		})
	}

	chooseInquire(inquireType = "vin") {
		this.chooseType = inquireType
		let _url = "/ppy?type="
		let _type
		let _binds = "&binds=group"
		switch (this.chooseType) {
			case this.vinType:
				_type = "vin"
				break;
			case this.carType:
				_type = "car"
				break;
			case this.partType:
				_type = "part"
				break;
			default:
				break;
		}
		location.href = _url + _type + _binds
	}

	render() {
		let _chooseInquire = this.chooseInquire.bind(this)
		let _hasMessages = this.state.hasMessages
		let _isPartner = this.state.isPartner

		return (
			<div className='TopContainer'>
				<div className="TopBackground"></div>
				<div className="TopRightContainer">
					<div className="TopRightSelectersContainer">
						<img className="TopLogo" src={cdnHost+'/img/p_logo.png'}
							style={{display: _isPartner ? "none" : "block"}}
							onClick={() => location.href = "/"}/>
						<span className="TopRightSelector" onClick={() => _chooseInquire(this.vinType)}>车架号查询</span>
						<span className="TopRightSelector" onClick={() => _chooseInquire(this.carType)}>车型查询</span>
						<span className="TopRightSelector" onClick={() => _chooseInquire(this.partType)}>零件号查询</span>
					</div>
					<div className="TopRightAccountContainer"
						style={{display: _isPartner ? "none" : "block"}}
						onClick={this.showLogout.bind(this)}
						onMouseOver={this.showLogout.bind(this)}
						onMouseLeave={this.showLogout.bind(this)}>
						<div className="TopRightAccount">
							个人中心

							<div className="RedPoint" style={{display: _hasMessages ? "block" : "none"}}></div>
							<span><img src={cdnHost+"/img/icon_xiala.png"} /></span>
						</div>
						<div className="Logout" style={{display: this.state.showLogout}} >
							<div className="LogoutItem" onClick={() => location.href = "/user/profile?binds=search&type=messages"}>
								<img src={cdnHost+"/img/icon_mess.png"}/>
								<span>消息中心</span>
								<div className="RedPoint" style={{display: _hasMessages ? "block" : "none"}}></div>
							</div>
							<div className="LogoutItem" onClick={() => location.href = "/user/profile?binds=search"}>
								<img src={cdnHost+"/img/user_icon.png"}/>
								<span>个人中心</span>
							</div>
							<div className="LogoutItem" onClick={() => location.href = "/user/profile?binds=home"}>
								<img src={cdnHost+ "/img/p_pay.png"}/>
								<span>续费</span>
							</div>
							<div className="LogoutItem" onClick={() => location.href = "/logout"}>
								<img src={cdnHost+"/img/icon_exit.png"}/>
								<span>退出</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}