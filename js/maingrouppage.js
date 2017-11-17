import React,{Component} from 'react'

export default class MainGroupPage extends Component{
    constructor(props){
        super(props)
    }
   	componentDidMount() {
	    	let _this = this
  		document.addEventListener('keydown', function(e){
			if(e.keyCode == 17){
				keyTemp = true;
			}
			switch(e.keyCode){
				case 39 :
					if(keyTemp){
						_this.nMainClick();					
					}
					break;
				case 37 :
					if(keyTemp){
						_this.pMainClick();					
					}
			}
  		})
  		document.addEventListener('keyup',function(e){
  			if(e.keyCode == 17){
  				keyTemp = false
  			}
  		})
	}
   
    nMainClick(){
    		this.props.changeMainIndex(1);
    }
    
    pMainClick(){
    		this.props.changeMainIndex(-1);    	
    }
    
    	render(){
    		let isLast = this.props.isLast
		let isFrist =  this.props.isFrist
		let _preContent = isFrist ? "-3px -1192px" : "-3px -883px"
		let _nextContent = isLast ? "-3px -1220px" : "-3px -911px"
		let _prepointer = isFrist ? "default" : "pointer"
		let _nextpointer = isLast ? "default" : "pointer"
		let _preHoverClass = isFrist ? "notHover" : "isCanHover"
		let _nextHoverClass = isLast ? "notHover" : "isCanHover"
    		return(
    			
    			<div className="MainGroupPage">
    			    <div className={"nextMainPage " + _nextHoverClass}  onClick={this.nMainClick.bind(this)} style={{backgroundPosition:_nextContent,cursor:_nextpointer}}>
                		<div className="ItemBubbles">下一主组&nbsp;&nbsp;Ctrl&nbsp;&rarr;</div>
                </div>
    				<div className={"preMainPage "+ _preHoverClass} onClick={this.pMainClick.bind(this)} style={{backgroundPosition:_preContent,cursor:_prepointer}}>
                		<div className="ItemBubbles">上一主组&nbsp;&nbsp;Ctrl&nbsp;&larr;</div>
				</div>
            </div>
    		)

    	}
}