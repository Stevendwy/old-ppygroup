import React, {
	Component
} from 'react'
import MiddleRightContentListComponent from './middlerightcontentlistcomponent'
import MiddleRightContentListFooterItem from './middlerightcontentlistfooteritem'

export default class MiddleRightContentListFooter extends MiddleRightContentListComponent {

	constructor(props) {
		super(props)
		this.fristOnePart = false;
	}

	click(itid, index, mainIndex) {
		this.props.listClick(itid, index, mainIndex)
	}

	render() {
		let _data = this.props.data
		let _isReplace
		switch (_data.isreplace) {
			case 0:
				_isReplace = ' '
				break
			case 1:
				_isReplace = 'R'
				break
			case 2:
				_isReplace = 'S'
				break
			case 4:
				_isReplace = 'R、S'
				break
		}
		let _listIndex = this.props.listIndex
		let _plus = ""

		// let _isShow= "flex"
		let _isAddFlod = this.props.isAddFlod //宝马并且当前长度大于1才是true  生成+号
		let _specialIndex = this.props.specialIndex //是否要零件定位
		if (_listIndex == 0 && _specialIndex) {
			fristOnePart = this.props.choosePid == _data.pid ? true : false //搜索的零件号是否处于当前遍历项目中的第一个，是第一个就不要展开
		}
		if (_listIndex == 0 && _isAddFlod) { //生成加号
			_plus = `<div class="minus"></div>`
		}
		//
		// if(_listIndex>=0 && _isAddFlod){
		// 	_isShow="flex"
		// }

		//" "为了处理 undefined == undefined bug
		let _titles = [_plus, _data.num, _data.pid || " ", _data.label, _data.quantity, _data.model, _data.remark, _data.prices, _isReplace, _data.detail]
		let _widths = this.widths
		let _classContainer = this.props.classContainer
		let _classItem = this.props.classItem
		let _mainListIndex = this.props.mainListIndex
		let _mouseEvent = this.mouseEvent
		let _color = _data.colorvalue == 0 ? "isRedImportent" : ""

		return (
			<div className={"MiddleRightContentListItemContainer " + _color}
				onClick={this.click.bind(this, _data.itid, _listIndex, _mainListIndex)}
				name={_data.itid}>
				{
					_titles.map((title, index) => {
						let _className =  index==0? "ClickFristItem" : ""
						return (
							<MiddleRightContentListFooterItem key={index}
								index={index}
								showClassName={"MiddleRightContentListItem MiddleRightContentListFooterItem " + _classItem + " " +_className}
								showStyle={{width: _widths[index]}}
								content={title}
								isAddFlod={_isAddFlod}
								modelname={_data.modelname}
								isReplace={_data.isreplace}
								pid={_data.real_pid}
								itid={_data.itid}/>
						)
					})
				}
			</div>
		)
	}
}