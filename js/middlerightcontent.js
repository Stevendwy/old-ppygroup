import React, {Component} from 'react'
import MiddleRightContentList from './middlerightcontentlist'
import AddAlias from './addalias'
import {sendEvent, catchEvent, removeEvent, middleEvents} from './eventmodel'

export default class MiddleRightContent extends Component {
	constructor() {
		super()
		this.state = {
			showAddAlias: false,
			parts: null
		}
	}

	componentDidMount() {
		catchEvent(middleEvents.showSubGroupPreview, e => {
			let _changeHeight = e.info.showSubGroupPreview ? 232 : 0//原来192 减去40px
			let _middlerightcontentcontainer = this.refs.middlerightcontentcontainer
		})

		catchEvent(middleEvents.toggleAddAlias, e => {
			this.setState({
				showAddAlias: !this.state.showAddAlias
			})
		})
	}

	setParts(parts) {
		this.setState({
			parts: parts
		})
	}

	render() {
		let _showAddAlias = this.state.showAddAlias
		let _parts = this.state.parts
		let _setParts = this.setParts.bind(this)

		return (
			<div ref="middlerightcontentcontainer" className="MiddleRightContentContainer">
				<div className="MiddleRightContent">
					<MiddleRightContentList contentList={this.props.contentList} setParts={_setParts}/>
					<AddAlias
						show={_showAddAlias}
						parts={_parts}/>
				</div>
			</div>
		)
	}
}
