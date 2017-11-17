import React,{Component} from 'react'
export default class ModalMiMain extends Component{
	constructor(){
		super()
		this.state = {
			values:"",
			indexstore:[]
		}
	}
	
	change(){
		let _searchimport=this.refs.searchimport.value
		// let _value = _searchimport.replace(/\W/g, "").toUpperCase()
		let _value = _searchimport

		let arrfirst = JSON.parse(JSON.stringify(this.props.listfirst));
		let arrsecond = JSON.parse(JSON.stringify(this.props.list));
		// let arr = arrfirst.concat(arrsecond)
		let arr = arrfirst
		let larrs = []

		//判断包含汉字就任意位置匹配
		if(/^[\u4e00-\u9fa5]/.test(_searchimport)){
			for (let i = 0; i < arr.length; i++) {
				if ((arr[i].key.indexOf(_value) !== -1 ) && (_value !== "") ) {
					larrs.push(i)
				}
			}
		}else{
			for (let i = 0; i < arr.length; i++) {
				let _arrtoLowerCase = arr[i].key.toLowerCase()
				if ((arr[i].key.indexOf(_value) == 0 || _arrtoLowerCase.indexOf(_value)==0 ) && (_value !== "") ) {
					// arr[i].key = arr[i].key.replace(_value, "<span>" + _value + "</span>")
					larrs.push(i)
				}
			}
		}
		if (_value == "") {
			larrs=[]
		}
		if (larrs.length!==0) {
			let _scrolltop = larrs[0]*30+"px"
			 $(".MiItemContainer").animate({scrollTop:_scrolltop}, 500)
			// this.refs.MiItemlList.animate({scrollTop:_scrolltop}, 500)
		}
		this.setState({
			values:_value,
			indexstore:larrs
		})		
	}


	render(){
		let _input = this.state.values
		let _listres = this.state.indexstore
		let _scrollheight = this.state.indexstore.length>0?"30px":"0px"

		let _listcontent = this.props.listfirst
		// let _listcontent = this.props.listfirst.concat(this.props.list) //数组拼接
		return(
			<div className='ModalMiMain'>
					<div className="MiItemTitle">
						<span>
							MI
							<div className="searchimportFather">
								<input type="text" name="searchimport"  style={{display:"none"}}/>
								<input type="text" 
									className="searchimports"
									autoComplete="off" 
									value={_input}
									maxLength="30"
									ref="searchimport" 
									autoFocus
									onChange={this.change.bind(this)}/>
								<div className="searchImport"></div>
							</div>
						</span>
						<p></p>
					</div>
					<div className="MiItemContainer" style={{paddingTop:_scrollheight}}>
						<ul className="MiItemlList" ref="MiItemlList">
						{
						_listcontent.map((item,index)=>{
							let _classnam = "MiItem"
							if($.inArray(index,_listres) !==-1){
								_classnam = "MiItem MiItemChance"
							}
							return(
								<li key={index} className={_classnam}>
									<span>{item.key}</span> 
									<p>{item.value}</p> 
								</li>
								)
						})
	               		}
						</ul>
					</div>
			</div>
		)
	}
}