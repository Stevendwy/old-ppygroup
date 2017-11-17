import React, {
	Component
} from 'react'
import MiddleTitle from './middletitle'
import MiddleLeft from './middleleft'
import MiddleRight from './middleright'
import Modal from './modal'
import MiddleLeftTitle from './middlelefttitle'
import MiddleSubGroupPreview from './middlesubgrouppreview'
import MiddleRemind from './middleremind'
import FloatWindow from './floatwindow'
import FloatWindowContent from './floatwindowcontent'
import MiddleRightGroup from './middlerightgroup'
import {
	sendEvent,
	catchEvent,
	middleEvents
} from './eventmodel'
export default class Middle extends Component {

	constructor(props) {
		super(props)
		this.state = {
			searchbtnshow: "none",
			showFloatWindow: false,
			showFloatWindownew: !isParts,
			hasMain: "block",
			hasSub: "none", //默认初始block 现改为none
			clickwidthNew: "", //屏幕宽
			clickheightNew: "", //屏幕高
			whitchTitel: "",
			fenzushow: false,
			titlemargin: false,
			titleWhitchColor: [false, false, true, false, false],
			vinchance: true,
			showonce: "none"
		}
		this.type = 0;
		this.hasShowFloatWindow = true
		this.isFilter = false
		this.colorChance = [false, false, true, false, false]
	}

	componentDidMount() {
		catchEvent(middleEvents.isHasChangeType, e => {
			this.titlechange("vinguolv", true)
		})
		// this.getFirst()
		if (!localStorage.didhasShow) {
			this.setState({
				showonce: "block"
			})
		}
		catchEvent(middleEvents.floatwindowSubGroupClick, e => {
			if (!localStorage.didhasShowAll) {
				this.setState({
					showonce: "block"
				})
			}
		})
		catchEvent(middleEvents.floatwindowSubGroupClickMainClose, e => {
			if (!localStorage.didhasShowAll) {
				this.setState({
					showonce: "block"
				})
			}
		})
		catchEvent(middleEvents.detailShow, e => {
				this.type = e.info.type;
				this.setState({
					showFloatWindow: true
				})
			})
			//接受来自弹框分组点击 来自 floatwindowsubgroup
		catchEvent(middleEvents.floatwindowSubGroupClickFenzu, e => {
				this.setState({
					showFloatWindownew: e.info,
					titleWhitchColor: [false, false, false, false, false]
				})
			})
			//接受来自 floatwindowcontent 主组关闭点击
		catchEvent(middleEvents.floatwindowSubGroupClickMainClose, e => {
				//			sendEvent(middleEvents.fenzuShowNo, false)//给分组发送状态不需要
				let _showFloatWindownews = !this.state.showFloatWindownew
				this.setState({
					titlemargin: false,
					showFloatWindownew: _showFloatWindownews,
					titleWhitchColor: [false, false, false, false, false]
				})
			})
			//接受来自 middlesubgrouppreview 分组关闭点击
		catchEvent(middleEvents.floatwindowSubGroupClickFenzuClose, e => {
				sendEvent(middleEvents.fenzuShows, !this.state.fenzushow)
				let _titlemargins = !this.state.titlemargin
				this.setState({
					titlemargin: _titlemargins,
					showFloatWindownew: false,
					titleWhitchColor: [false, false, false, false, false]
				})
			})
			//接收来自 middlesubgrouppreviewitem 浮动框点击
		catchEvent(middleEvents.floatwindowSubGroupClickMiddle, e => {
			this.setState({
				titleWhitchColor: [false, false, false, false, false],
				titlemargin: e.info
			})
		})

		catchEvent(middleEvents.hascalmain, () => {
			this.setState({
				hasMain: "none"
			})
		})

		catchEvent(middleEvents.hascalsub, () => {
			this.setState({
				hasSub: "none"
			})
		})
		catchEvent(middleEvents.floatWindowShow, () => {
			if (!this.state.showFloatWindownew) {
				this.titlechange("quanbu")
			}
		})
		let _new = document.documentElement.clientWidth
		let _newheight = document.documentElement.clientHeight - 30
		let _searchbtnshow = brandCode == "bmw" ? "none" : "none" //判断是不是宝马
		this.setState({
			clickwidthNew: _new,
			clickheightNew: _newheight,
			searchbtnshow: _searchbtnshow
		})
		$(window).resize(() => {
			let _new = document.documentElement.clientWidth
			this.setState({
				clickwidthNew: _new
			})
		})
	}

	vinGifClick() {
		if (localStorage.didhasShow) {
			this.setState({
				showonce: "none"
			}, () => localStorage.setItem("didhasShowAll", "1"))
		} else {
			this.setState({
				showonce: "none"
			}, () => localStorage.setItem("didhasShow", "1"))
		}
	}

	titlechange(whitchname, isFrist) {
		let _namelist = ["guanjian", "cheliang", "quanbu", "fenzu", "vinguolv"]
		let _showFloatWindownew = false
		let _titlemargin = false
			//title 选择
		switch (whitchname) {
			case "guanjian":
				_showFloatWindownew = false
				_titlemargin = false
				sendEvent(middleEvents.detailShow, {
					type: 1
				})
				break;
			case "cheliang":
				_showFloatWindownew = false
				_titlemargin = false
				sendEvent(middleEvents.detailShow, {
					type: 0
				})
				break;
			case "quanbu":
				if (!localStorage.didhasShowAll) {
					this.setState({
						showonce: "block"
					})
				}
				_showFloatWindownew = !this.state.showFloatWindownew
				_titlemargin = false
				this.hasShowFloatWindow = true
				break;
			case "fenzu":
				_showFloatWindownew = false
				_titlemargin = !this.state.titlemargin
				break;
			case "vinguolv":
				if (this.state.showFloatWindownew) {
					_showFloatWindownew = true
				} else {
					_showFloatWindownew = false
				}

				_titlemargin = this.state.titlemargin
				vinChange = this.isFilter ? 0 : 1 //用于分组请求时添加vin 状态
					//				console.log(vinChange)
				sendEvent(middleEvents.redVinFilter, {
					isFilter: this.isFilter = !this.isFilter,
					isFrist: isFrist
				}) //发给middlerightcontent

				this.setState({
					vinchance: !this.state.vinchance
				})
				break;
			default:
				this.colorChance = [false, false, false, false, false]
				break;
		}
		//分组点击处理
		if (whitchname == "fenzu") {
			sendEvent(middleEvents.fenzuShows, !this.state.fenzushow)
		} else if (whitchname == "vinguolv") {
			sendEvent(middleEvents.fenzuShowNo, true)
		} else {
			sendEvent(middleEvents.fenzuShowNo, false)
		}
		for (let i = 0; i < _namelist.length; i++) {
			if (whitchname == _namelist[i]) {
				let _change = this.colorChance[i] == true ? false : true
				this.colorChance[i] = _change
			} else {
				this.colorChance[i] = false
			}
		}
		this.setState({
			titleWhitchColor: this.colorChance,
			titlemargin: _titlemargin,
			showFloatWindownew: _showFloatWindownew
		})
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

	getFirst() {
		getAjax("/userhabits", {}, res => {
			if (res.data.vin_filter == "1") {
				this.titlechange("vinguolv", true)
			}
		}, false)
	}

	render() {
		//title move
		let _margintop = this.state.titlemargin ? "232px" : "0px"
		let _marginleft = this.state.clickwidthNew > 1024 ? (this.state.clickwidthNew - 1024) / 2 : 0 //屏幕宽左边距离
		let _heights = this.state.clickheightNew //屏幕高度值
		let _widths = this.state.clickwidthNew //屏幕宽度
		let _title = this.type == 0 ? "车辆配置" : "关键数据"
		let _showFloatWindow = this.state.showFloatWindow
		let _isred = this.state.vinchance
		let _Vinwhether = this.state.vinchance ? "VIN未过滤" : "VIN过滤" //vin 过滤转态文字
		let _todoDetail = this.state.vinchance ? '点击切换到"VIN过滤"' : '点击切换到"VIN未过滤"'
		let _vinshow = !isVIN ? "none" : "block" //vin 过滤是否显示
		let _rightposition = !isVIN ? "199px" : "95px" //右边显示
		let isShow = this.state.showonce
		let _leftposition = !isVIN ? "402px" : "500px" //左边位置
		let _floatleft = this.state.searchbtnshow == "none" ? "64px" : "-38px"
			//		let _searchbtnshow = this.state.searchbtnshow//搜索是否显示
			//新规则：只有vin 过滤才有入口
		let _searchbtnshow = (_vinshow == "block") && (this.state.searchbtnshow == "block") ? "block" : "none"
		if (_searchbtnshow == "none") {
			_floatleft = "64px"
		}
		let _showFloatWindownew = this.state.showFloatWindownew
		let _goEngien = this.goEngien.bind(this)
		let _modal = <div></div>
		if (isVIN) _modal = <FloatWindow
			title={_title}
			img="https://cdns.007vin.com/img/icon_san.png"
			show="block"
			top="90px"
			left="calc(50% - 314px)"
			width="627px"
			height="440px"
			hiddenEvent={() => {this.setState({showFloatWindow: false,titleWhitchColor:[false,false,false,false,false]})}}
			show={_showFloatWindow ? "block" : "none"}
			content={<Modal type={this.type}/>} />

		let _detailContainer = <div></div>
		let _hasMain = this.state.hasMain
		let _showAddAlias = this.showAddAlias.bind(this)

		let _hasSub = this.state.hasSub //关键数据用 先隐藏
		if (isVIN) _detailContainer = <div><div className="DetailContainer"
			style={{display:_hasMain}}
			onClick={this.titlechange.bind(this,"cheliang")}
			onMouseOver={() => this.refs.controlbubbledetailp.style.color = "#45C0FF"}
			onMouseLeave={() => this.refs.controlbubbledetailp.style.color = this.state.titleWhitchColor[1]?"#45C0FF":"#333333"}>
			<div  className="ControlBubble">
				<p ref="controlbubbledetailp"
					style={{color:this.state.titleWhitchColor[1]?"#45C0FF":"#333333"}}
					>车辆配置</p></div>
			</div>
			<div className="CarMIContainer"
				style={{display:_hasSub}}
				onClick={this.titlechange.bind(this,"guanjian")}
				onMouseOver={() => this.refs.controlbubbledetailp1.style.color = "#45C0FF"}
				onMouseLeave={() => this.refs.controlbubbledetailp1.style.color = this.state.titleWhitchColor[0]?"#45C0FF":"#333333"}>
				<div  className="ControlBubble">
					<p ref="controlbubbledetailp1"
						style={{color:this.state.titleWhitchColor[0]?"#45C0FF":"#333333"}}
						>关键数据</p>
				</div>
			</div>
		</div>

	return (
		<div className="MiddleContainer">
				<div className="MiddleBoxContainer">
					{/*<div className="titlebg"></div>*/}
                    <MiddleLeftTitle marginT={_margintop}/>
                    <div className="bgzindex"></div>
					<div className="floatcentertitle" style={{left:_marginleft}}>
						<div className="floatleftcontent" style={{left:_floatleft}}>
							<div className="AllContainer AllContainerquanbu"
								style={{backgroundPositionY:this.state.titleWhitchColor[2]?"-602px":"-642px"}}
								onClick={this.titlechange.bind(this,"quanbu")}
								onMouseOver={() => this.refs.controlbubbleallp.style.color = "#45C0FF"}
								onMouseLeave={() => this.refs.controlbubbleallp.style.color = this.state.titleWhitchColor[2]?"#45C0FF":"#333333"}>
								<div className="ControlBubble">
									<p ref="controlbubbleallp"
										style={{color:this.state.titleWhitchColor[2]?"#45C0FF":"#333333"}}
										>选择分组</p>
								</div>
							</div>
		                    <div className="AllContainer AllContainerfenzu"
		                         onClick={_showAddAlias}>
		                        <div  className="ControlBubble">
		                            <p>添加别称</p>
		                        </div>
		                    </div>
							<div className="AllContainer AllContainerVin"
								style={{backgroundPositionY: this.state.vinchance ? "-802px" : "-762px", display: _vinshow}}
								onClick={this.titlechange.bind(this, "vinguolv", false)}>
								<div  className="ControlBubble">
									<p ref="controlbubbleallvin" style={{color: _isred ? "#FF3232" : "#333333"}}>{_Vinwhether}</p>
									<div className="vinbubble">
										{_todoDetail}
									</div>
								</div>

								<div className="vingifpic" onClick={this.vinGifClick.bind(this)} style={{display:isShow}}>
									<img src={cdnHost + "/img/yelloarrow.gif"} alt=""/>
									<img src={cdnHost + "/img/p_passvin.png"} alt=""/>
								</div>
							</div>
							{_detailContainer}
						</div>
						<div className="AllContainer AllContainerSearch"
							style={{left:_leftposition,display:_searchbtnshow}}
							onClick={_goEngien}>
							<div  className="ControlBubble">
								<p>零件搜索</p>
							</div>
						</div>
						<MiddleRightGroup newright={_rightposition}/>
					</div>
					<FloatWindowContent
						heights={_heights}
						show={_showFloatWindownew ? "block" : "none"}/>
					<MiddleSubGroupPreview />
					<div className="MiddleContentContainer">
						<MiddleLeft />
						<MiddleRight />
					</div>
					<MiddleRemind />
					{_modal}
				</div>
			</div>
	)
}
}
