import React, {
    Component
} from 'react'
import {
    sendEvent,
    catchEvent,
    middleEvents
} from './eventmodel'

export default class Littlegroup extends Component {
    constructor(props) {
        super(props)
        this.bubble = false
        this.blcok = false
        this.state = {
                littleValue: "选择分组",
                isshow: 'none'
            }
            //      this.value=""
        this.selectedIndex = -1
    }

    componentDidMount() {
        catchEvent(middleEvents.floatwindowSubGroupClick, e => {
            if (e.info.isSame) return
            this.listClick(e.info.index, e.info.auth, e.info.uid)
        })
        catchEvent(middleEvents.subGroupPreviewClick, (e) => {
            this.listClick(e.info.index, e.info.auth, e.info.uid, e.info.stopScroll)
        })
        catchEvent(middleEvents.bodyClick, (e) => {
            if (this.state.isshow == "block") {
                if (!this.block) {
                    this.setState({
                        isshow: "none"
                    })
                }
                this.block = false
            }
        })
    }

    littleClick() {

        if (this.bubble) {
            this.bubble = false
            return
        }
        // this.props.restoreArr()
        this.setState({
            isshow: this.state.isshow == "none" ? "block" : "none"
        })
    }

    listClick(index, auth, uid, mid, stopScroll = false) {
        //  		console.log(uid)
        this.selectedIndex = this.props.where
            // if(index != this.selectedIndex) this.selectedIndex = index
            // else return
            // 	 	console.log("listClick")
        this.props.indexchange(index);
        this.props.authchange(auth);
        this.bubble = false
            // console.log(mid)
            // console.log("aaaaaaaa")
        this.setState({
                //          littleValue:this.props.arr[this.props.where].subgroupnames
                littleValue: mid
            })
            //发送通知
        sendEvent(middleEvents.subGroupClick, {
            auth: auth,
            index: index,
            title: this.props.arr[index].subgroupname,
            stopScroll: stopScroll,
            uid: uid,
        })
    }


    stopShow(e) {
        this.block = true
        this.bubble = true
        this.setState({
            isshow: "block"
        })
        return false
    }

    changes(e) {
        this.props.arrChange(e)
    }

    value1(dom) {
        this.value = dom
    }

    render() {
        var color
        var findParts
            //      slice = 100;
        if (this.props.where != -1 && this.props.arr.length > 0) {
            var cResult = this.props.results
            findParts = this.props.arr[this.props.where].mid
                // findParts = this.state.littleValue

            //          console.log(this.props.arr)
            //          console.log(this.props.where)

            color = "rgb(51, 51, 51)"
        } else {
            //          findParts="选择分组";
            color = "rgb(153, 153, 153)"
        }
        return (
            <div className="Littlegroup" >
                <span>分组 </span>
                <div className="Littleinput" onClick={this.littleClick.bind(this)}>
                    <div className="placehlder" style={{color:color}} 
                    dangerouslySetInnerHTML={{__html: findParts}}/>
                    
                    
                    <Littledrop
                      width = {this.props.width}
                      results={this.props.results}
                      change={this.changes.bind(this)}
                      shows={this.stopShow.bind(this)}
                      larr={this.props.arr}
                      click={this.listClick.bind(this)}
                      show={this.state.isshow}
                      resultShow={this.props.resultShow}
                    />
                    
                    <Search
                    	 values={this.props.restoreArr}
                      shows={this.stopShow.bind(this)} 
                      change={this.changes.bind(this)} 
                      show={this.state.isshow}
                      larr={this.props.arr}
                    />
                    <div className="rightCart"></div>
                </div>
            </div>
        )
    }
}


class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sResult: 0
        }
        this._changeSearch = this.changeSearch.bind(this);
    }
    componentDidMount() {
        catchEvent(middleEvents.subTitleClick, () => {
            this.refs.dinput1.value = "";
        })
    }

    changeSearch(e) {
        this.props.change(e, 1)
    }

    showClick(e) {
        this.props.shows(e)
    }
    clear() {
        this.refs.dSearch.value == ""
    }
    render() {
        var shows = this.props.larr.length == 0 ? "none" : this.props.show;

        return (
            <div className="dSearch" ref="dSearch"  onClick={this.showClick.bind(this)} style={{display:shows}}>
                   <input ref="dinput1" type="text" onChange={this._changeSearch} placeholder="" />
                    <div className="searchFor"></div>
                </div>
        )
    }
}

class Littledrop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sResult: 0
        }
    }

    getValue(index, auth, uid, mid) {
        this.props.click(index, auth, uid, mid)
    }

    render() {
        var cResult = this.props.results;
        var resultShow = this.props.resultShow;
        var isshow;
        //  		var slice
        //      slice = parseInt(((((this.props.width*1-160)*0.68-10) *0.61-73)-48)/12);
        //      slice = 100;
        if (resultShow) {
            isshow = "block";
        } else {
            isshow = "none";
        }
        return (
            <div className="Littledrop" ref="littleDrop"  style={{display:this.props.show}}>     
                {

                    this.props.larr.map((item,index)=>{
                    		var submain = "";
						submain=item.subgroupname.replace(/\s+/g,"");
//						console.log(item.is_grey)
                        return(
                        	<div key={index} onClick={this.getValue.bind(this, index, item.auth, item.uid,item.mid)} className={item.is_grey ? "mainItems grey" : "mainItems"} dangerouslySetInnerHTML={{__html: submain}} />
                        )
                    })
                }  
                <div  ref="result" className="sResult" style={{display:isshow}}>为您找到相关结果约<span>{cResult}</span>个</div>         
            </div>
        )
    }
}