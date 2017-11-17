import React, {
    Component
} from 'react'
import MiddleSubGroupPreviewItem from './middlesubgrouppreviewitem'
import {
    sendEvent,
    catchEvent,
    removeEvent,
    middleEvents
} from './eventmodel'

export default class MiddleSubGroupPreview extends Component {

    constructor() {
        super()
        this.state = {
            firstshow: false,
            showSubGroupPreview: false,
            subGroupList: [],
            selectedItemIndex: -1,
            loadingview: "https://cdns.007vin.com/img/loadingview.gif",
            imgshow: "block",
            item: "",
            show: "none",
            left: 0
        }
        this._handleSubGroupData = this.handleSubGroupData.bind(this)
        this._showSubGroupPreview = this.showSubGroupPreview.bind(this)
    }

    componentDidMount() {
        catchEvent(middleEvents.fenzuShows, this._showSubGroupPreview) //由showimageview 发送过来
        catchEvent(middleEvents.subGroupClick, this._handleSubGroupData)
        catchEvent(middleEvents.floatwindowSubGroupClickYulan, this._showSubGroupPreview) //由middlesubgviewitem 发送过来

        catchEvent(middleEvents.fenzuShowNo, e => {
                if (e.info == false) {
                    this.setState({
                        showSubGroupPreview: false,
                        show: "none"
                    }, () => {
                        sendEvent(middleEvents.showSubGroupPreview, { //3.0.9时候这个消息是由MiddleLeftContent和MiddleRightContent接的
                            showSubGroupPreview: this.state.showSubGroupPreview
                        })
                    })
                }
            }) //由showimageview 发送过来

        this.drawTrangle()
    }

    drawTrangle() {
        let canvas = this.refs.trangle
        var cxt = canvas.getContext("2d")
        cxt.beginPath()
        cxt.moveTo(6, 0)
        cxt.lineTo(0, 12)
        cxt.lineTo(12, 12)
        cxt.closePath()
        cxt.fillStyle = "#fff"
        cxt.shadowBlur = 8
        cxt.shadowColor = "#d8d8d8"
        cxt.fill()
    }

    controlBubble(show, item, left) {
        this.setState({
            show: show,
            item: item,
            left: left - 10
        })
    }

    handleSubGroupData(e) {
        let _subGroupData = e.info.subGroupData
        if (_subGroupData) {
            //			if(this.state.showSubGroupPreview == false) this.showSubGroupPreview() //是否需要初始化定位
            this.setState({
                subGroupList: _subGroupData.data
            }, () => {
                this.selectedItem(e.info.index)
            })
        } else {
            this.selectedItem(e.info.index, e.info.stopScroll)
        }
    }

    selectedItem(index, stopScroll = false) {
        this.setState({
            selectedItemIndex: index
        }, () => {
            //处理显示位置
            if (!stopScroll) $(this.refs.middlesubgrouppreview).scrollLeft(index * 172 + 4 - (document.body.offsetWidth - 80) / 2 + 86)
        })
    }

    showSubGroupPreview(e) {
        let _show = e.info == true ? "block" : "none"
        this.setState({
            showSubGroupPreview: !this.state.showSubGroupPreview
        }, () => {
            sendEvent(middleEvents.showSubGroupPreview, { //3.0.9时候这个消息是由MiddleLeftContent和MiddleRightContent接的
                showSubGroupPreview: this.state.showSubGroupPreview
            })
        })
    }

    //发送状态给middle 处理父级显示floatwindowSubGroupClickFenzu
    settomiddle() {
        sendEvent(middleEvents.floatwindowSubGroupClickFenzuClose, false)
    }

    handleImageLoaded() {
        this.setState({
            imgshow: 'none'
        });
    }

    componentWillMount() {
        let _height = this.state.showSubGroupPreview ? "232px" : "40px"
        let _middlesubgrouppreview = this.refs.middlesubgrouppreview
        $(_middlesubgrouppreview).animate({
            height: _height
        }, "slow")
        if (this.state.firstshow == false) {
            this.setState({
                firstshow: true
            })
        }
    }

    render() {
        let _subGroupList = this.state.subGroupList
        let _selectedItemIndex = this.state.selectedItemIndex
        let _width = _subGroupList.length * 172 + 4 + "px" //+ 4处理hover和选中
        let _opacity = this.state.showSubGroupPreview ? 1 : 0
        let _opactiyshow = _opacity == 1 ? "block" : "none"
            //		let _height = this.state.showSubGroupPreview ? "192px" : "40px"
        let _movename = "MiddleSubGroupPreviewContainer"
        if (this.state.firstshow) {
            _movename = _opacity == 1 ? "animated slideInDown MiddleSubGroupPreviewContainer" : "animated fadeOutUp MiddleSubGroupPreviewContainer"
        }
        //		let _top = this.state.showSubGroupPreview ? "44px" : "0"
        let _top = this.state.showSubGroupPreview ? "44px" : "44px"

        let _shows = this.state.show
        let _loadingview = this.state.loadingview
        let _imgsShow = this.state.imgshow
        let _handleImageLoaded = this.handleImageLoaded.bind(this)
        let _controlBubble = this.controlBubble.bind(this)
        let _imgs = _subGroupList.map((item, index) => {
            let _className = "MiddleSubGroupPreviewImgContainer"
            if (index == _selectedItemIndex) _className = "MiddleSubGroupPreviewImgContainerSelected"
            if (item.is_grey) _className += " RedBorder"
            return (
                <MiddleSubGroupPreviewItem key={index}
                                           showClassName={_className}
                                           src={_loadingview}
                                           item={item}
                                           index={index}
                                           controlBubble={_controlBubble}
                />
            )
        })
        let _src = this.state.showSubGroupPreview ? "/img/icon_xianshinormal.png" : "/img/icon_yincangnormal.png"
        let _remind = this.state.showSubGroupPreview ? "选择分组" : "选择分组"
        let _item = this.state.item
        let _left = this.state.left
        let _lefts = _left + 80 + "px"

        return ( < div className = {
                _movename
            }
            ref = "selfzindex"
            onMouseEnter = {
                () => this.refs.selfzindex.style.zIndex = 1000
            }
            onMouseLeave = {
                () => {
                    this.refs.FloatWindowSubGroupItemBubbleOne.style.display = "none";
                    this.refs.selfzindex.style.zIndex = 10
                }
            }
            onClick = {
                () => this.refs.selfzindex.style.zIndex = 10
            } >
            <div ref="middlesubgrouppreview" className="MiddleSubGroupPreview"
                     style={{display: "block", top: _top}}>
                    <div className="MiddleSubGroupPreviewBox"
                         style={{width: _width}}>
                        {_imgs}
                    </div>
                    <div style={{height:"40px",width: _width}} onClick={this.settomiddle.bind(this)}></div>
                </div> < div className = "FloatWindowSubGroupItemBubble"
            ref = "FloatWindowSubGroupItemBubbleOne"
            style = {
                {
                    display: _shows,
                    left: _left
                }
            } >
            <div>名称：{_item.subgroupname}</div> < div style = {
                {
                    display: _item.description && _item.description.length > 0 ? "block" : "none"
                }
            } > 备注： {
                _item.description
            } < /div> < div style = { {
            display: _item.model && _item.model.length > 0 ? "block" : "none"
        }
    } > 型号： {
        _item.model
    } < /div> < canvas ref = "trangle"
    width = "12"
    height = "12" > < /canvas> < /div > < div className = "middlesubgrouppreviewclose"
    style = {
        {
            position: "absolute",
            width: "100%",
            bottom: "10px"
        }
    }
    onClick = {
            this.settomiddle.bind(this)
        } >
        <div className="middlesubgrouppreviewcloseimg"
                         style={{left: "50%", position: "absolute"}}></div> < /div> < /div >
)
}
}