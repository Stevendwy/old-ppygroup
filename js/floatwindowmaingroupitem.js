import React, {Component} from 'react'

export default class FloatWindowMainGroupItem extends Component {
	
	render() {
		let _itemClick = this.props.itemClick
		let _showClassName = this.props.showClassName
		let _content = this.props.content
		return (
			<div onClick={_itemClick} className={_showClassName}>{_content}</div>
		)
	}
}
