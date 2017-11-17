import React, {
	Component
} from 'react'
import Pagegroup from './grouppage.js'
import Littlegroup from './grouplittle.js'
import Maingroup from './groupmain.js'
import {
	groupLittleData
} from "./datas"
import {
	sendEvent,
	catchEvent,
	middleEvents
} from './eventmodel'

export default class Typegroup extends Component {
	constructor() {
		super()
		this.state = {
			larr: [],
			index: 0,
			colorIndex: 1,
			resultCount: 0,
			canChangeP: false,
			resultShow: false,
			value: "",
			hide: false,
			isFrist: false,
			isLast: false,
			windowWidth: document.body.clientWidth
		}
		this.larr = []
		this.timer = null
		this.authstore = "" //存储auth
		this.indexstore = 0 //存储点击index
		this.isR = false
		this.authchanges = "olds"
		this.isFrist = false // 是否为第一次自动刷新点击vin过滤
	}
	componentDidMount() {
		catchEvent(middleEvents.mainGroupClick, e => {
			this.setState({
				colorIndex: 1
					//				isFrist:true
			})
			this.restoreArr()

		})
		catchEvent(middleEvents.redVinFilter, (e) => {
			// console.log(e.info.isFrist)
			this.isFrist = e.info.isFrist
			this.isR = true
			this.mainListClick(this.authstore)
		})
	}

	authchange(newauth) {
		this.authchanges = newauth
	}

	indexchange(newIndex) {
		this.indexstore = newIndex
		this.setState({
			index: newIndex,
			canChangeP: true,
			isFrist: newIndex == 0 ? true : false,
			isLast: newIndex == this.state.larr.length - 1 ? true : false
		})
	}

	changepage(count) {
		//  		if(this.state.canChangeP){
		//
		//	        if(this.state.index == 0 && count < 0 || this.state.larr.length - 1 == this.state.index && count > 0){
		//	           this.setState({
		//	               colorIndex: this.state.index == 0 ? 1 : 2
		//	           })
		//	            		return
		//
		//	        }
		//	        this.setState({
		//	            index: this.state.index + count,
		//	            colorIndex: 3
		//	        })
		////	        console.log("be"+this.state.index);
		//			if(this.state.index == 1&&count <0){
		//			   this.setState({
		//	               colorIndex: 1
		//	           })
		//			}
		//			if(this.state.index == this.state.larr.length-2&&count >0){
		//			   this.setState({
		//	               colorIndex: 2
		//	           })
		//			}
		//
		if (count == 1 && this.state.index == this.state.larr.length - 1 || count == -1 && this.state.index == 0) {
			return;
		}
		//请求列表数据
		let _index = this.state.index + count
		let _auth = this.state.larr[_index].auth
		let _title = this.state.larr[_index].subgroupname
		let _uid = this.state.larr[_index].uid
		this.authchanges = _auth
		if (_index == this.state.larr.length - 1) {
			this.setState({
				isLast: true
			})
		} else {
			this.setState({
				isLast: false
			})
		}

		if (_index == 0) {
			this.setState({
				isFrist: true
			})
		} else {
			this.setState({
				isFrist: false
			})
		}

		this.setState({
			index: this.state.index + count
		})
		clearTimeout(this.timer)
		this.timer = setTimeout(() => {
			//				this.listClick(this.state.marr[index],index)
			sendEvent(middleEvents.subGroupClick, {
				auth: _auth,
				title: _title,
				index: _index,
				uid: _uid,
			})
		}, 500)

		//     }
	}

	arrChange(e) {
		this.setState({
			larr: this.larr
		})
		var arr = JSON.parse(JSON.stringify(this.larr));
		var larrs = []
		var value = e.target.value.replace(/\s/g, "");
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].subgroupname.indexOf(value) !== -1 && value !== "") {
				arr[i].subgroupname = arr[i].subgroupname.replace(value, "<span>" + value + "</span>")
				larrs.push(arr[i])
			}
		}
		if (larrs.length !== 0) {
			this.setState({
				larr: larrs,
				resultCount: larrs.length,
				resultShow: true,
				index: 0,
				windowWidth: document.body.clientWidth

			})
		} else if (larrs.length == 1) {
			this.setState({
				isLast: true
			})
		} else {
			this.setState({
				resultCount: 0,
				resultShow: true
			})
		}
		if (value == "") {
			this.setState({
				larr: this.larr,
				resultCount: 0,
				resultShow: false
			})
		}

	}

	mainListClick(auth) {
		this.restoreArr()
		this.authstore = auth
			//请求数据修改分组值
		let _url = "/ppycars/subgroup"
		if (isParts) _url = "/ppypart/subgroup"
		else if (isVIN) _url = "/ppyvin/subgroup"
		let _obj = { //车型基本，没有p和vin
			auth: auth,
			code: params.code
		}
		this.setState({
			colorIndex: 1
		})
		if (isParts) _obj.p = params.p
		else if (isVIN) {
			_obj.vin = params.vin
			_obj.filter = vinChange
		}
		isReturn = false
		// 添加请求分组是 vin过滤 filter
		let isNotFind_reSet = false
		$(".subGroupLoadingContainer").show()
		let _index = this.isR ? this.indexstore : 0
		let localIndex = false
		getAjax(_url, _obj, response => {
			// this.isR = false
			//			console.log('groupTypeRequest')
			$(".subGroupLoadingContainer").hide();
			sendEvent(middleEvents.subGroupResponse, {
				response: response
			})
			let _sss = response.data
			let _sindex = []
			for (var m = 0; m < _sss.length; m++) {
				// console.log(this.authchanges)
				if (this.authchanges == _sss[m].auth) {
					_index = m
					_sindex.push(m)
					break;
				}
				// if (_sindex.length < 1) { //重置回去了
				// 	_index = 0
				// 	isNotFind_reSet = true
				// }
			}
			if (m == _sss.length) { // 如果 this.authchanges!="olds"时  说明没找到
				isNotFind_reSet = true

				_index = 0

			}

			// if (_index == 0 && this.authchanges != "olds") {
			// 	sendEvent(middleEvents.floatWindowShow)
			// }
			if (response.sets) {
				let _datas = response.data
				let _setAuth = response.sets.auth
				for (var i = 0; i < _datas.length; i++) {
					let _data = _datas[i]
					if (_data.auth == _setAuth) {
						_index = i
						break
					}
				}
			}

			if (response.data.length == 1) {
				this.setState({
					isLast: true
				})
			}
			this.setState({
				larr: response.data,
				index: _index,
				isFrist: _index == 0 ? true : false,
				isLast: _index == response.data.length - 1 ? true : false,
				canChangeP: true
			})
			this.larr = response.data
				// console.log("aiaiai")
				// console.log(this.isR)
				// console.log(_index)
				// console.log("hahha")
			if (this.isFrist) {
				sendEvent(middleEvents.subGroupClick, {
					auth: response.data[_index].auth,
					title: response.data[_index].subgroupname,
					uid: response.data[_index].uid,
					subGroupData: response,
					index: _index
				})
			} else {
				if (this.isR) { //可能刷新可能不刷新    =》  刷新=》  全红的时候刷新  被重置为一的情况为全红   ||不刷新   找得到index的时候不刷新
					// console.log("手点的vin")
					// console.log("看看index是几是否回归到第一组呢" + _index)
					// console.log("看看index是是否走了那个判断流程呢" + isNotFind_reSet)
					if (_index == 0 && isNotFind_reSet) {

						sendEvent(middleEvents.subGroupClick, {
							auth: response.data[_index].auth,
							title: response.data[_index].subgroupname,
							uid: response.data[_index].uid,
							subGroupData: response,
							index: _index
						})
						sendEvent(middleEvents.floatWindowShow)
					} else { //index  为中间并且没有那个的时候点击

					}
				} //点了vin过滤来的   =》 index = 0 时候
				else {
					sendEvent(middleEvents.subGroupClick, {
						auth: response.data[_index].auth,
						title: response.data[_index].subgroupname,
						uid: response.data[_index].uid,
						subGroupData: response,
						index: _index
					})
				} //没有点vin过滤来的   默认执行

			}
			this.isR = false
		})
	}
	restoreArr() {
		sendEvent(middleEvents.subTitleClick, {

		})
		this.setState({
			larr: this.larr,
			resultShow: false
		})
	}

	render() {

		let _isFrist = this.state.isFrist
		let _isLast = this.state.isLast

		return (
			<div className="Typegroup">
                <Maingroup
                width={this.state.windowWidth}
                listClick={this.mainListClick.bind(this)}/>
                <Littlegroup
                		restoreArr={this.restoreArr.bind(this)}
                    	width={this.state.windowWidth}
                		resultShow = {this.state.resultShow}
                		results = {this.state.resultCount}
                		arrChange={this.arrChange.bind(this)}
                		arr={this.state.larr}
                		authchange={this.authchange.bind(this)}
                		indexchange={this.indexchange.bind(this)}
                		where={this.state.index}/>
                <Pagegroup
                		index={this.state.index}
                		color={this.state.colorIndex}
                		change={this.changepage.bind(this)}
                		isFrist= {_isFrist}
                		isLast = {_isLast}
                	/>
            </div>
		)
	}
}
