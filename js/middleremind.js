import React, {Component} from 'react'
import MiddleRightRemind from './middlerightremind'
import { sendEvent,catchEvent,removeEvent,middleEvents} from './eventmodel'

export default class MiddleRemind extends Component {
	constructor() {
		super()
        this.state = {
            isPartner: false //是否第三方页面嵌入
        }
	}

    componentDidMount() {
        catchEvent(middleEvents.source, e => {
            this.setState({
                isPartner: true
            })
        })
    }
	
	render() {
		let _wordleft = vinChange == 1 ? "80px" : "0px"//vin 过滤是否显示
		return (
			<div className="MiddleRemindContainer">
				<div className="MiddleRemindBox">
					<MiddleRightRemind />
					<span className="MiddleRemind" style={{right:_wordleft, display: this.state.isPartner ? "none" : "block"}}>＊以上信息由零零汽提供，仅供参考</span>
				</div>
			</div>
		)
	}
}
