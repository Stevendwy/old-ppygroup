import React, {
	Component
} from 'react'
import FloatWindowSubGroupItem from './floatwindowsubgroupitem'
import {
	sendEvent,
	catchEvent,
	middleEvents
} from './eventmodel'

export default class FloatWindowSubGroup extends Component {
	constructor(props) {
		super(props)
		this.state = {
			subGroupList: [],
			selectedIndex: 0,
			offsetLeft: 0,
			values: "",
			indexstore: [],
			isFilter: true,
			isRedShow: "block"
		}
		this.mainAuth = ""
		this.storedata = []
	}

	componentDidMount() {
		//浮窗主组点击，回到选中第一个状态
		catchEvent(middleEvents.floatwindowMainGroupClick, () => {
			this.setState({
				selectedIndex: 0
			})
		})
		catchEvent(middleEvents.redVinFilter, (e) => {
			this.setState({isFilter: !e.info.isFilter})
		})
		//下层的分组点击，选中对应位置，由于数据太深，没有与下面同步处理
		catchEvent(middleEvents.subGroupClick, e => {
			this.setState({
				selectedIndex: e.info.index
			})
		})

		//下层分组拿到数据传过来
		catchEvent(middleEvents.subGroupResponse, e => {
			var response = e.info.response
			this.storedata = response.data
			this.setState({
				subGroupList: response.data,
				values: "",
				indexstore: []
			}, () => {
				let _changebackground = this.props.changebackground
				if (response.data.length > 0) _changebackground(true)
				else _changebackground(false)
			})
		})
		let trueWidth = this.refs.FloatWindowMainGroupList.offsetWidth
		let _offsetLeft = (trueWidth % 171) / 2 + 10 + "px"
		this.setState({
			offsetLeft: _offsetLeft
		})
	}

	componentWillReceiveProps(props) {
		//		console.log("floatsub componentWillReceiveProps")
		let trueWidth = this.refs.FloatWindowMainGroupList.offsetWidth
		let _offsetLeft = (trueWidth % 171) / 2 + 10 + "px"
		this.setState({
			offsetLeft: _offsetLeft
		})
	}

	itemClick(item, index) {
		let _obj = {
			index: index,
			auth: item.auth,
			uid: item.uid,
		}
		if (this.state.selectedIndex == index) _obj.isSame = true
		sendEvent(middleEvents.floatwindowSubGroupClick, _obj)
		sendEvent(middleEvents.floatwindowSubGroupClickFenzu, false) //发给middle
		this.setState({
			selectedIndex: index,
			values: "",
			indexstore: []
		})
	}

	change() {
		let _value = this.refs.FloatWindowSubGroupTitleInput.value
			// let _value = _searchimport.replace(/\W/g, "").toUpperCase()

		let arr = JSON.parse(JSON.stringify(this.storedata));
		let larrs = []

		for (let i = 0; i < arr.length; i++) {
			if ((arr[i].subgroupname.indexOf(_value) !== -1) && (_value !== "")) {
				// arr[i].key = arr[i].key.replace(_value, "<span>" + _value + "</span>")
				larrs.push(i)
			}
		}
		if (_value == "") {
			larrs = []
		}

		this.setState({
			values: _value,
			indexstore: larrs
		})
	}

	render() {
		let _input = this.state.values
		let _arr = this.state.indexstore
		let _selectedIndex = this.state.selectedIndex
		let _offsetLeft = this.state.offsetLeft
		let _subGroupList = this.state.subGroupList.map((item, index) => {
			let _className = "FloatWindowSubGroupItem"
			let _order = 0
			let _classnam = "MiItem"
			if (index == _selectedIndex) _className = "FloatWindowSubGroupItem FloatWindowSubGroupItemSelected"
			if (item.is_grey) _className += " RedBorder"
			if ($.inArray(index, _arr) !== -1) {
				_order = -1
				_className = "FloatWindowSubGroupItem FloatWindowSubGroupItemSelected BlueBorder"
			}


			return (
				<FloatWindowSubGroupItem key={index}
				orders = {_order}
				itemClick={this.itemClick.bind(this)}
				item={item}
				index={index}
				showClassName={_className}/>
			)
		})
		let _isRedShow = "none"
		if (isVIN) {
			if (this.state.isFilter) {
				_isRedShow = "inline-block"
			} else {
				_isRedShow = "none"
			}
		}
		return (
			<div className="FloatWindowSubGroupContainer">
				<div className="FloatWindowSubGroup">
					<div className="FloatWindowSubGroupTitle">
						<div className="FloatWindowSubGroupTitleTitle">选择分组:</div>
						<div className="FloatWindowSubGroupTitleContent">
								<input type="text" name="searchimport"  style={{display:"none"}}/>
								<input type="text"
									className="FloatWindowSubGroupTitleInput"
									autoComplete="off"
									value={_input}
									maxLength="30"
									ref="FloatWindowSubGroupTitleInput"
                                    placeholder="输入分组图号 / 分组名称"
									onChange={this.change.bind(this)}/>
								<div className="FloatWindowSubGroupTitleImg"></div>
						</div>
						<div className="FloatWindowSubGroupTitleWorld" style={{display:_isRedShow}}>*红色标记：未经VIN过滤的分组</div>
					</div>
					<div className="FloatWindowSubGroupList" ref="FloatWindowMainGroupList" style={{left:_offsetLeft}}>
						{_subGroupList}
					</div>
					<div className="subGroupLoadingContainer"></div>
				</div>
			</div>
		)
	}
}
