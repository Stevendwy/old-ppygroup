import React, {Component} from 'react'
import Typegroup from './grouptype'

export default class MiddleRightGroup extends Component {
	
	render() {
		return (
			<div className="MiddleRightGroupContainer" style={{right:this.props.newright}}>
				<div className="MiddleRightGroup">
					<Typegroup />
				</div>
			</div>
		)
	}
}
