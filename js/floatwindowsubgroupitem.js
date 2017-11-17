import React, {Component} from 'react'

export default class FloatWindowSubGroupItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			show: "none",
			loadingview:"https://cdns.007vin.com/img/loadingview.gif",
			imgshow:"block"
		}
	}

	componentDidMount() {
	    let canvas = this.refs.trangle
        var cxt=canvas.getContext("2d")
        cxt.beginPath()
        cxt.moveTo(0, 0)
        cxt.lineTo(6, 12)
        cxt.lineTo(12, 0)
        cxt.closePath()
        cxt.fillStyle = "#fff"
        cxt.shadowBlur = 8
        cxt.shadowColor = "#d8d8d8"
        cxt.fill()
    }

	mouseEvent(e) {
		let _show = "none"
		if(e.type == "mouseover") _show = "block"
		this.setState({
			show: _show
		})
	}

	handleImageLoaded() {
	    this.setState({
	    		imgshow: 'none'
	    });
	}

	render() {
		let _itemClick = this.props.itemClick
		let _item = this.props.item
		let _index = this.props.index
		let _className = this.props.showClassName
		let _show = this.state.show
		let _mouseEvent = this.mouseEvent.bind(this)
		let _order = this.props.orders
		return (
			<div className={_className} style={{order:_order}}
				onClick={() => {_itemClick(_item, _index)}}
				onMouseOver={_mouseEvent}
				onMouseLeave={_mouseEvent}>
				<img src={this.state.loadingview} className="FloatWindowSubGroupItemRemindImg" style={{display:this.state.imgshow}} />
				<img src={_item.url} alt={_item.subgroupname} onLoad={this.handleImageLoaded.bind(this)}  />
				<div className={_item.is_grey ? "FloatWindowSubGroupItemRemind grey" : "FloatWindowSubGroupItemRemind"}>{_item.mid}</div>
				<div className="FloatWindowSubGroupItemBubble" style={{display: _show}}>
					<div>名称：{_item.subgroupname}</div>
					<div style={{display: _item.description.length > 0 ? "block" : "none"}}>备注：{_item.description}</div>
					<div style={{display: _item.model.length > 0 ? "block" : "none"}}>型号：{_item.model}</div>
                    <canvas ref="trangle" width="12" height="12"></canvas>
				</div>
			</div>
		)
	}
}
