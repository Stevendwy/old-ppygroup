import React, {Component} from 'react'
import {sendEvent, catchEvent, middleEvents} from './eventmodel'

export default class MiddleTitle extends Component {
	
	constructor(props) {
		super(props)
		let _paths = []
		if (isParts) _paths = ["首页", "零件号查询", "零件列表" , "零件组"]
		else if (isVIN) _paths = ["首页", "VIN车架号查询", "零件组"]//待处理
		else _paths = ["首页", "车型查询", "零件组"]
		
		this.state = {
			paths: _paths,//需要手动区分
			brandurl: "",
			carhead: "",
			brandname: ""
		}
	}
	
	componentDidMount() {
		if(PeipeiYun) {
			let _url = "/ppycars/heads"
			if (isParts) _url = "/ppypart/heads"
    			else if(isVIN) _url = "/ppyvin/heads"
			let _obj = {//车型基本，没有p和vin
				auth: params.auth,
				code: params.code
			}
			if (isParts) _obj.p = params.p
			else if (isVIN) _obj.vin = params.vin
//			console.log(_obj)
			getAjax(_url, _obj, response => {
				this.setState({
					brandurl: response.data.brandurl,
					carhead: response.data.carhead,
					brandname: response.data.brandname
				})
			})
		}else {
			this.setState({
				brandurl: headData.data.brandurl,
				carhead: headData.data.carhead,
				brandname: headData.data.brandname
			})
		}
	}
	
	pathClick(index, e) {
		let _href
		switch (index){
			case 0: _href = "/"
				break;
			case 1:
				if (isVIN) _href = "/ppy?_t=vin"
				else if (isParts) _href = "/ppy?_t=part"
				else _href = "/ppy?_t=car"
				break;
			case 2: 
				if (isVIN) {history.go(-1); return}
				else if (isParts) {history.go(-1); return}
				else _href = "/ppy?_t=car"
				break;
			case 3: _href = "#"
				break;
			default:
				_href = "#"
				break;
		}
		location.href = _href
	}
	
	imageClick() {
		sendEvent(middleEvents.detailShow, {
			type: 0//来自小汽车
		})
	}
	
	render() {
		let path = (
			this.state.paths.map((a, index) => {
				let [classContent, imgShow] = ["", "inline"]
				if(index == this.state.paths.length - 1) [classContent, imgShow] = ["MiddleHighLight", "none"]
				return (
					<span key={index}>
						<span className={classContent} onClick={this.pathClick.bind(this, index)}>{a}</span>
						<img src={cdnHost+"/img/Lt/arrow_r.png"} style={{display: imgShow}} />
					</span>
				)
			})
		)
		let _imgMiddle = <div></div>
		if(isVIN) _imgMiddle = <div className="MiddleTitleImgContainer"
						onMouseOver={() => this.refs.imgmiddle.style.display = "block"}
						onClick={() => this.refs.imgmiddle.style.display = "none"}
						onMouseLeave={() => this.refs.imgmiddle.style.display = "none"}>
							<div ref="imgmiddle" className="CarBubble">
								<p>车辆数据</p>
							</div>
							<img src={cdnHost+"/img/carshow.png"}
								onClick={this.imageClick.bind(this)}/>
						</div>
		let _brandname = this.state.brandname
		let _imgRight = <div className="MiddleTitleImgContainer"
						onMouseOver={() => this.refs.imgright.style.display = "block"}
						onMouseLeave={() => this.refs.imgright.style.display = "none"}>
							<div ref="imgright" className="CarBubble">
								<p>{_brandname}</p>
							</div>
							<img src={this.state.brandurl || ""} />
						</div>
		return (
			<div className="MiddleTitleContainer">
				<div className="MiddleTitleBackground"></div>
				<div className="MiddleTitle">
					<span>{this.state.carhead || ""}</span>
					{_imgRight}
				</div>
				<div className="MiddlePath">
					{path}
				</div>
				{_imgMiddle}
			</div>
		)
	}
}