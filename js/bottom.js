import React, {Component} from 'react'

export default class Bottom extends Component {
	
	render() {
		return (
			<div className="BottomContainer">
				<span>用户协议</span>
				<img src={cdnHost+"/img/icon_line.png"} />
				<span>免责声明</span>
				<div>
					Copyright 2016 All Rights Reserved
				</div>
			</div>
		)
	}
}