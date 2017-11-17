import React, {
	Component
} from 'react'
import FloatWindowMainGroupItem from './floatwindowmaingroupitem'
import {
	sendEvent,
	catchEvent,
	middleEvents
} from './eventmodel'

export default class FloatWindowMainGroup extends Component {
	constructor(props) {
		super(props)
		this.state = {
			mainGroupList: [],
			selectedIndex: 0,
			selectedAuth: "",
			values: "",
			indexstore: []
		}
		this.hasSets = false //标记零件查询下第一次进入时候不要发出分组请求，由主组自己发出
	}

	componentDidMount() {
		catchEvent(middleEvents.mainGroupClick, e => {
			this.itemClick(e.info.item, e.info.index)
		})
		catchEvent(middleEvents.mainGroupResponse, e => {
			//			console.log('fwMainRequest')
			let _index = params.index
			let response = e.info.response
			if (response.sets) this.hasSets = true
			let _obj = {
				mainGroupList: response.data
			}
			if (_index) _obj.selectedIndex = parseInt(_index)
			this.setState(_obj, () => {
				this.itemClick(response.data[_index || 0], _index || 0)
			})
		})
	}

	itemClick(item, index) {
		sendEvent(middleEvents.floatwindowMainGroupClicks, {
			index: index,
			auth: item.auth,
			title: item.groupnum,
			headtitle: item.groupname
		})
		if (!this.hasSets) {
			sendEvent(middleEvents.floatwindowMainGroupClick, {
				index: index,
				auth: item.auth,
				title: item.groupnum,
				headtitle: item.groupname
			})
		} else {
			this.hasSets = false
		}
		this.setState({
			values: "",
			indexstore: [],
			selectedIndex: index
		}, this.props.selectedMainItem(item.auth))
	}

	changes() {
		let _value = this.refs.FloatWindowMainGroupTitleInput.value
			// let _value = _searchimport.replace(/\W/g, "").toUpperCase()

		let arr = JSON.parse(JSON.stringify(this.state.mainGroupList));
		let larrs = []

		for (let i = 0; i < arr.length; i++) {
			if ((arr[i].groupname.indexOf(_value) !== -1) && (_value !== "")) {
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
		//		console.dir(this.state.mainGroupList)

		let _itemClick = this.itemClick
		let _selectedIndex = this.state.selectedIndex
		let _inputs = this.state.values
		let _arr = this.state.indexstore
		let _mainGroupList = this.state.mainGroupList.map((item, index) => {
			let _className = "FloatWindowMainGroupItem"
			if (index == _selectedIndex) _className = "FloatWindowMainGroupItemSelected"

			if ($.inArray(index, _arr) !== -1) {
				_className = "FloatWindowMainGroupItemSearchSelected"
			}
			return (
				<FloatWindowMainGroupItem key={index}
					itemClick={_itemClick.bind(this, item, index)}
					showClassName={_className}
					content={item.groupname}/>
			)
		})

		return (
			<div className="FloatWindowMainGroupContainer">
				<div className="FloatWindowMainGroup">
					<div className="FloatWindowMainGroupTitle">
						<div className="FloatWindowSubGroupTitleTitle">选择主组:</div>
						<div className="FloatWindowSubGroupTitleContent">
								<input type="text" name="searchimport"  style={{display:"none"}}/>
								<input type="text" 
									className="FloatWindowSubGroupTitleInput"
									autoComplete="off" 
									value={_inputs}
									maxLength="30"
									ref="FloatWindowMainGroupTitleInput"
                                    placeholder="输入主组编号 / 主组名称"
									onChange={this.changes.bind(this)}/>
								<div className="FloatWindowSubGroupTitleImg"></div>
						</div>
					</div>
					<div className="FloatWindowMainGroupList">
						{_mainGroupList}
					</div>
					<div className="mainGroupLoadingContainer"></div>
				</div>
			</div>
		)
	}
}