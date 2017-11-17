import React,{Component} from 'react'

export default class Pagegroup extends Component{
    constructor(props){
        super(props)
        this.index=props.color
    }
 componentDidMount() {
	    	let _this = this
		document.addEventListener('keydown', function(e){
			switch(e.keyCode){
				case 39 :
					if(!keyTemp){
						_this.nPageClick();					
					}
					break;
				case 37 :
					if(!keyTemp){
						_this.pPageClick();
					};
					break;
			}
		})
	}
    pPageClick(){
//  		if(this.refs.prePage.style.color=="rgb(153, 153, 153)") return
        this.props.change(-1);
    }
    
    nPageClick(){
//  		if(this.refs.nextPage.style.color=="rgb(153, 153, 153)") return
        this.props.change(1);
    }
    
    render(){

		let isLast = this.props.isLast
		let isFrist =  this.props.isFrist
		let _preContent = isFrist ? "-3px -1248px" : "-3px -939px"
		let _nextContent = isLast ? "-3px -1276px" : "-3px -967px"
		let _prepointer = isFrist ? "default" : "pointer"
		let _nextpointer = isLast ? "default" : "pointer"
		let _preHoverClass = isFrist ? "notHover" : "isCanHover"
		let _nextHoverClass = isLast ? "notHover" : "isCanHover"
		

		
        return(
            <div className="Pagegroup">
               {/* <div style={{color:color[2],cursor:corsor[2]}} className="nextPage" ref="nextPage" onClick={this.nPageClick.bind(this)}>下一组&gt; </div>
				<div style={{color:color[1],cursor:corsor[1]}} className="prePage" ref="prePage" onClick={this.pPageClick.bind(this)}> &lt;上一组</div>
				*/}
               <div className={"PreSubGroup "+_nextHoverClass} onClick={this.nPageClick.bind(this)} style={{backgroundPosition:_nextContent,cursor:_nextpointer}}>
                		<div className="ItemBubble">下一分组&nbsp;&nbsp;&rarr;</div>
               </div>
               <div className={"NextSubGroup "+_preHoverClass} onClick={this.pPageClick.bind(this)} style={{backgroundPosition:_preContent,cursor:_prepointer}}>
                		<div className="ItemBubble">上一分组&nbsp;&nbsp;&larr;</div>
               </div>
            </div>
        )
    }
}