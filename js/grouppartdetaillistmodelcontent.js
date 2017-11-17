import React, {
	Component
} from 'react'
import {
	sendEvent,
	catchEvent,
	removeEvent,
	middleEvents
} from './eventmodel'
import {
	newmessage
} from './datas'

export default class GroupPartDetailListModelContentContent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			whitchIs: "",
			cursors: "auto",
			startdata: {
				"data": []
			}, //存储数据
			gotmes: {
				"data": []
			},
			starttype: false, //展开还是收起
			startnum: 20, //父级级别
			startlevel: 10, //开始展开位置
			startimg: [], //存储图片
			startstore: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] //存储节点展示层级 节点存在就显示			
		}
		this.oldstore = 0 //存储长度
		this.newstore = 0 //存储长度新
		this.startdata = {
			"data": []
		}
		this.displaynum = [] //存储隐藏节点
		this.titleList = ["号码", "车型", "描述", "意见", "数量", "参考价格"]
		this.store = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] //存储点击值
	}

	componentDidMount() {
		this.startdata = newmessage //存储数据
		this.setState({
			startdata: newmessage,
			gotmes: this.props.nexmess,
			whitchIs: this.props.whitchIs
		})
	}

	componentWillReceiveProps(props) {
		this.startdata = newmessage
		this.setState({
			startdata: newmessage,
			gotmes: props.nexmess,
			whitchIs: props.whitchIs
		})
	}

	newFloatwindow(item, type, e) {
		if (this.state.whitchIs != "0") {
			let _chancenum = item
			if (type == false) {
				_chancenum = item.replace("替换为：", "")
			}
			sendEvent(middleEvents.addfloatwindow, _chancenum)
		} else {
			console.log("kong")
		}
		e.stopPropagation()
	}

	handleMouseEnter(item, e) {
		if (this.state.whitchIs != "0") {
			this.setState({
				cursors: "pointer"
			})
		}
		e.stopPropagation()
	}

	handleMouseLeave(item, e) {
		this.setState({
			cursors: "auto"
		})
		e.stopPropagation()
	}

	handleImgClick(imgtype, num, parentnum) {
		let _datas = newmessage.data
		let _type = false
		let str1 = imgtype //判断展开还是收起
		if ((str1.indexOf("Last") != -1) || (str1.indexOf("Solid") != -1)) {
			return
		}
		let _truetype = imgtype.indexOf("Open")
		let _index = $.inArray(num, this.store)
		if (_index != -1) {
			_type = false
			for (let k = 0; k < 50; k++) { //清理存储
				let numk = num + k
				let _instore = $.inArray(numk, this.store)
				if (_instore != -1) {
					this.store.splice(_instore, 1)
				}
			}
		} else {
			_type = true
			this.store.push(num)
		}
		let _store = this.store
		this.setState({
			startstore: _store,
			startnum: num,
			starttype: _type
		})
	}

	render() {

		let _cursor = this.state.cursors
		let _mes = this.props.nexmess
		let _startnum = this.state.startnum
		let _startlevel = this.state.startlevel
		let _starttype = this.state.starttype

		let _childrenwidth = (_startnum * 20 + 170) + "px"
		let _fatherwidth = (_startnum * 20 + 635) + "px"

		let _listmes = <div></div>
		let _li = <div></div>
		let _head = this.state.whitchIs == "0" ? this.state.gotmes.data[1].showmessage[0] : this.state.gotmes

		if (params.code != "land_rover" && params.code != "audi" && params.code != "vwag") {
			_childrenwidth = "auto"
			_fatherwidth = "auto"
			let _lihead = this.state.whitchIs == "0" ? "" : ""
			_li = _head.data.map((item, index) => {
				let _item = this.state.whitchIs == "0" ? item : item.replace("替换为：", "")
				return (
					<div key={index} style={{cursor:_cursor}}
						className="GroupPartDetailListModelContentcontentLi">
						<span style={{marginLeft:"15px",lineHeight: "32px"}}>
							{_lihead}
						</span>
						<span 
							onClick={this.newFloatwindow.bind(this,item,false)}
							onMouseEnter={this.handleMouseEnter.bind(this,item)}
							onMouseLeave={this.handleMouseLeave.bind(this,item)}
							>
							{_item}
						</span>
					</div>
				)
			})
		} else {
			let _widthnum = _head.data.length
			if (_startnum == 20) {
				_childrenwidth = (_widthnum * 20 + 90) + "px"
				_fatherwidth = (_widthnum * 20 + 560) + "px"
			} else {
				_childrenwidth = (_startnum * 20 + 90) + "px" //50px
				_fatherwidth = (_startnum * 20 + 560) + "px" //20px
			}

			let _startstore = this.state.startstore
			let _getdata = this.state.startdata
			_listmes = _head.data.map((item, i) => {
				let _hasinstore = _startstore.indexOf(item.num)
				let _margin = (item.level - 1) * 20 + "px"
				let _className = "PartReplaceBackgroundImg PartReplaceBackgroundImgClose" //处理class
				if (item.level == 1) {
					if (item.haschild == 1) {
						if (_hasinstore == -1) {
							_className = "PartReplaceBackgroundImg PartReplaceBackgroundImgCloseFirst"
						} else {
							_className = "PartReplaceBackgroundImg PartReplaceBackgroundImgOpenFirst"
						}
					} else {
						_className = "PartReplaceBackgroundImg"
					}
				} else {
					if (item.haschild == 1) {
						if (_hasinstore == -1) {
							_className = "PartReplaceBackgroundImg PartReplaceBackgroundImgClose"
						} else {
							_className = "PartReplaceBackgroundImg PartReplaceBackgroundImgOpen"
						}
					} else {
						if (item.is_last == 1) {
							_className = "PartReplaceBackgroundImg PartReplaceBackgroundImgLast"
						} else {
							_className = "PartReplaceBackgroundImg PartReplaceBackgroundImgSolid"
						}
					}
				}
				// 处理单一数据情况  和下面数据为空时候一样
				if (_head.data.length == 1) {
					_className = "PartReplaceBackgroundImgFirstno"
				}
				let _display = "none" //处理display
				if (_starttype == true) {
					if (item.parentnum > _startnum) {
						_display = "none"
					} else if (item.parentnum <= _startnum) {
						_display = "block"
					}
				} else {
					if (item.parentnum < _startnum) {
						_display = "block"
					}
				}
				if (item.level == 1) {
					_display = "block"
				}
				let _itemSlice = item.advise.length > 14 ? item.advise.slice(0, 14) + "..." : item.advise
				let _class = item.advise.length > 14 ? "toshow" : "tohide"
				let _showworlds = item.ptype == "Y" ? "Normal" : "选择性替代"

				return (
					<div key={i} style={{display:_display}}
						className="GroupPartDetailListModelContentcontentLi"> 
						<div className="PartReplaceOne" style={{width:_childrenwidth}}>
							<div className="PartReplaceLength" style={{marginLeft:_margin}}>
								<div className={_className} style={{cursor:"pointer"}}
									onClick={this.handleImgClick.bind(this,_className,item.num,item.parentnum)}>
								</div>
								<div className="PartReplaceBackgroundPid" style={{cursor:"pointer"}}
									onClick={this.newFloatwindow.bind(this,item.pid,true)}>
									{item.pid}
								</div>
							</div>
						</div>
						<div className="PartReplaceTwo">
							<div className="PartReplaceTwoHas">{_showworlds}</div>
							{item.ptype}
						</div>
						<div className="PartReplaceThree">{item.lable}</div>
						<div className="PartReplaceFour">
							<div className={_class}>{item.advise}</div>
							{_itemSlice}
						</div>
						<div className="PartReplaceFive">{item.counts}</div>
						<div className="PartReplaceSix">{item.price}</div>
					</div>
				)
			})
		}
		let _displaycode = "none"
		if (params.code == "land_rover" || params.code == "audi" || params.code == "vwag") _displaycode = "block"
		let _contentsmes = _li
		if (params.code == "land_rover" || params.code == "audi" || params.code == "vwag") _contentsmes = _listmes
		if (_head.length < 1) {
			_displaycode == "block"
		}
		return (
			<div className="GroupPartDetailListModelContentcontentExc" style={{width:_fatherwidth}}>
				<div className="GroupPartDetailListModelContentcontentLi" style={{display:_displaycode}}> 
					<div className="PartReplaceOne" style={{width:_childrenwidth}}>{this.titleList[0]}</div>
					<div className="PartReplaceTwo">{this.titleList[1]}</div>
					<div className="PartReplaceThree">{this.titleList[2]}</div>
					<div className="PartReplaceFour">{this.titleList[3]}</div>
					<div className="PartReplaceFive">{this.titleList[4]}</div>
					<div className="PartReplaceSix">{this.titleList[5]}</div>
				</div>
				{_contentsmes}	
			</div>
		)
	}
}