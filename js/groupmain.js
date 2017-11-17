import React, {
	Component
} from 'react'
import {
	groupMainData
} from './datas'
import MainGroupPage from './maingrouppage'
import {
	sendEvent,
	catchEvent,
	middleEvents
} from './eventmodel'

export default class Maingroup extends Component {
	constructor(props) {
		super(props)
		this.state = {
			mainValue: "选择主组",
			marr: [],
			isshow: isParts ? "none" : "block",
			index: 0,
			isLast: false,
			isFrist: false
		}
		this.color = "rgb(153, 153, 153)"
		this.selectedIdex = -1
		this.canAjax = true
		this.timer = null
		this._timer = null


	}

	componentDidMount() {

		catchEvent(middleEvents.floatwindowMainGroupClick, e => {
			this.setState({
				mainValue: e.info.title,
				isshow: "none",
				index: e.info.index,
				isFrist: e.info.index == 0 ? true : false,
				isLast: e.info.index == this.state.marr.length - 1 ? true : false
			})

			this.color = "rgb(51, 51, 51)"
			this.props.listClick(e.info.auth)
		})
		catchEvent(middleEvents.bodyClick, () => {
			if (this.state.isshow == "block") {
				this.setState({
					isshow: "none"
				})
			}
		})
		let _url = "/ppycars/group"
		if (isParts) _url = "/ppypart/group"
		else if (isVIN) _url = "/ppyvin/group"
		let _obj = { //车型基本，没有p和vin
			auth: params.auth,
			code: params.code
		}
		if (isParts) _obj.p = params.p
		else if (isVIN) {
			_obj.vin = params.vin
			_obj.firstload = params.firstload
		}
		$(".mainGroupLoadingContainer").show()
		getAjax(_url, _obj, response => {
			sendEvent(middleEvents.mainGroupResponse, {
				response: response
			})
			this.setState({
				marr: response.data,
				//				isFrist: e.info.index == 0 ? true : false,
				isLast: this.state.index == response.data.length - 1 ? true : false
			}, () => {
				if (response.sets) {
					let _sets = response.sets
					this.listClick(_sets, _sets.index)
				}
			})
			$(".mainGroupLoadingContainer").hide()

		})
	}
	mainClick(e) {
		var _isshow = "none";
		if (this.state.isshow == "none") {
			_isshow = "block"
		}
		this.setState({
			isshow: _isshow
		});
	}

	listClick(item, index) {
			//		if(index != this.selectedIdex) this.selectedIdex = index
			//		else return
			let groupname = item.groupname

			this.setState({
				//			mainValue: item.groupname,
				mainValue: item.groupnum,
				isshow: "none"
			})

			clearTimeout(this.timer)
			this.timer = setTimeout(() => {
				//			this.listClick(this.state.marr[index],index)
				sendEvent(middleEvents.mainGroupClick, {
					item,
					index,
					groupname
				})
			}, 500)



			this.color = "rgb(51, 51, 51)"
		}
		//上下主组
	changeMainIndex(count) {
		if (count == 1 && this.state.index == this.state.marr.length - 1 || count == -1 && this.state.index == 0) {
			return;
		}
		let index = this.state.index * 1 + count * 1;

		this.setState({
			index: this.state.index * 1 + count * 1
		}, () => {
			//      		console.log(this.state.index)
			this.listClick(this.state.marr[this.state.index], this.state.index)
		})



		if (index == this.state.marr.length - 1) {
			this.setState({
				isLast: true
			})
		} else {
			this.setState({
				isLast: false
			})
		}
		if (index == 0) {
			this.setState({
				isFrist: true
			})
		} else {
			this.setState({
				isFrist: false
			})
		}
	}
	render() {
		var slice;
		let _mainValue = this.state.mainValue
		let _isFrist = this.state.isFrist;
		let _isLast = this.state.isLast;
		return (
			<div className="Maingroup" >
                	<span>主组 </span>
                <div className="Mainginput" onClick={this.mainClick.bind(this)}>
                    <div className="placehlder" style={{color:this.color}}>{_mainValue}</div>
                    <Maindrop
                    	width={this.props.width}
                    marr={this.state.marr}  click={this.listClick.bind(this)} show={this.state.isshow}/>
                    <div className="rightCart"></div>
                </div>
                <MainGroupPage 
                		isFrist= {_isFrist} 
                		changeMainIndex={this.changeMainIndex.bind(this)}
                		isLast = {_isLast}
                	/>
            </div>
		)
	}
}

class Maindrop extends Component {
	constructor(props) {
		super(props)
	}

	getValueClick(groupname, index) {
		this.props.click(groupname, index)
	}

	render() {
		return (
			<div className="Maindrop" ref="mainDrop" style={{display:this.props.show}}>
                {
                    this.props.marr.map((item,index)=>{     	
    					var mainname = item.groupname;
                        return(
                            <div key={index}  onClick={this.getValueClick.bind(this, item, index)} className="mainItems">{mainname}</div>
                        )
                    })
                }
            </div>

		)
	}
}