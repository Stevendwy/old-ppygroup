export var middleEvents = {
	fromImg: "fromImg",
	fromList: "fromList",
	transform: "transform",
	redVinFilter: "redVinFilter",
	mainGroupClick: "mainGroupClick",
	subGroupClick: "subGroupClick",
	detailShow: "detailShow",
	hascalmain: "hascalmain",
	floatWindowShow: "floatWindowShow",
	hascalsub: "hascalsub",
	checkListHasItemMark: "checkListHasItemMark", //点击图片锚点后检查右侧是否有对应处理
	bodyClick: "bodyClick",
	showSubGroupPreview: "showSubGroupPreview", //下方分组预览是否展开
	subGroupPreviewClick: "subGroupPreviewClick",
	floatwindowMainGroupClick: "floatwindowMainGroupClick",
	floatwindowMainGroupClicks: "floatwindowMainGroupClicks",
	floatwindowSubGroupClick: "floatwindowSubGroupClick",
	topItemClick: "topItemClick",
	pageClick: 'pageClick',
	titleCanClick: "titleCanClick", //top 获取是否可以点击跳转
	detailClick: "detailClick",
	newlivalue: "newlivalue",
	isHasChangeType: "isHasChangeType",
	newlivaluechange: "newlivaluechange",
	addfloatwindow: "addfloatwindow", //零件详情点击发送数据
	mainGroupResponse: "mainGroupResponse",
	subGroupResponse: "subGroupResponse",
	fenzuShows: "fenzuShows", //分组显示状态
	floatwindowSubGroupClickFenzu: "floatwindowSubGroupClickFenzu", //分组点击
	floatwindowSubGroupClickYulan: "floatwindowSubGroupClickYulan", //分组预览点击
	floatwindowSubGroupClickMiddle: "floatwindowSubGroupClickMiddle", //分组预览title 改变
	fenzuShowNo: "fenzuShowNo", //middle 分组预览强制消失
	floatwindowSubGroupClickFenzuClose: "floatwindowSubGroupClickFenzuClose", //关闭按钮
	floatwindowSubGroupClickMainClose: "floatwindowSubGroupClickMainClose", //主组关闭
	source: "source", //第三方嵌入标识
	toggleAddAlias: "toggleAddAlias", //切换别名录入显示状态
}

export function sendEvent(eventName, info) {
	if (document.addEventListener) {
		var event = new Event(eventName)
			//		var event = document.createEvent('HTMLEvents')
			//		// initEvent接受3个参数：
			//		// 事件类型，是否冒泡，是否阻止浏览器的默认行为
			//		event.initEvent("ondataavailable", true, true)
			//		event.eventType = 'message'
		event.info = info
		document.dispatchEvent(event)

	} else {
		$.event.trigger(eventName)
	}
}

export function catchEvent(eventName, func = () => {
	console.log("catchEvent")
}) {
	if (document.addEventListener) document.addEventListener(eventName, func)
	else document.attachEvent(eventName, func)
}

export function removeEvent(eventName, func = () => {
	console.log("removeEvent")
}) {
	document.removeEventListener(eventName, func)
}

//export {middleEvents, sendEvent, catchEvent}