function myBrowser() {
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	var isOpera = userAgent.indexOf("Opera") > -1;
	if(isOpera) {
		return "Opera"
	}; 
	if(userAgent.indexOf("Firefox") > -1) {
		return "FF";
	} 
	if(userAgent.indexOf("Chrome") > -1) {
		return "Chrome";
	}
	if(userAgent.indexOf("Safari") > -1) {
		return "Safari";
	} 
	if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
//	console.log("我是 IE");
		bassstart();
		$("#static").css({
			"top": 0,
			"left": 0
		});
		kindexs = [];
		$(document).on("click","#btn1",function  () {
			ImageChange(true);
		})
		$(document).on("click","#btn2",function  () {
			ImageChange(false);
		})
		$(document).on("click","#btn3",function  () {
			bassstart();
		})

//		function ImageChange(args) {
//			w = parseInt($('#partimgs').width());
//			h = parseInt($('#partimgs').height());
//			if(args) {
//				if(beishu < 8) {
//					n += 0.1;
//					n = Math.round(n * 100) / 100;
//					$('#static').css("zoom", n);
//					beishu++;
//				}
//			} else {
//				if(beishu > 0) {
//					n -= 0.1;
//					n = Math.round(n * 100) / 100;
//					$('#static').css("zoom", n);
//					beishu--;
//				}
//			}
//		}
		//比对缩放图形
function ImageChange(args) {
	baseWidth = parseInt($("#picDiv").width());
	baseHeight = parseInt($("#picDiv").height());
	
	picDivtop=($('#picDiv')[0].getBoundingClientRect().top+document.body.scrollTop);
	picDivleft=$('#picDiv')[0].getBoundingClientRect().left;
	picDivright=picDivleft+parseInt($('#picDiv').css("width"));
	picDivbottom=picDivtop+parseInt($('#picDiv').css("height"));
	
	imgtop=($('#partimgs')[0].getBoundingClientRect().top+document.body.scrollTop);
	imgleft=$('#partimgs')[0].getBoundingClientRect().left;
	imgright=imgleft+parseInt(n*parseInt($('#partimgs').css("width")));
	imgbottom=imgtop+parseInt(n*parseInt($('#partimgs').css("height")));
	
//	scalenewbasex=Math.abs((picDivleft+(baseWidth/2)-imgleft))/parseInt(n*parseInt($('#partimgs').css("width")))*100;
//	scalenewbasey=Math.abs((picDivtop+(baseHeight/2)-imgtop))/parseInt(n*parseInt($('#partimgs').css("height")))*100;
	scalenewbasex=Math.abs(picDivleft+(baseWidth/2));
	scalenewbasey=Math.abs(picDivtop+(baseHeight/2));
	if (args) {
		if(beishu<18){
			$("#dragAble").css({"margin-left":0+"px","margin-top":0+"px"});
			$('#static').css("transform-origin",""+scalenewbasex+" "+scalenewbasey+" 0");
			n += 0.1;
			n = Math.round(n * 100) / 100;
			$('#static').css("transform-origin","0 0 0");
			$('#static').css("-webkit-transform", "scale(" + n + ")");
			$('#static').css("transform", "scale(" + n+ ")");
			$('#static').css("-moz-transform", "scale(" + n +")");			
			$('#static').css("-o-transform", "scale(" + n +")");
			$('#static').css("zoom", n);
			beishu++;
		}
	} else {
		if(beishu>2){
			$("#dragAble").css({"margin-left":0+"px","margin-top":0+"px"});
			n -= 0.1;
			n = Math.round(n * 100) / 100;
			if (beishu==3) {
				bassstart();
				beishu=3;
			}else{
				$('#static').css("transform-origin",""+scalenewbasex+" "+scalenewbasey+" 0");
				$('#static').css("-webkit-transform", "scale(" + n + ")");
				$('#static').css("transform", "scale(" + n+ ")");
				$('#static').css("-moz-transform", "scale(" + n +")");			
				$('#static').css("-o-transform", "scale(" + n +")");
				$('#static').css("zoom", n);
			}
			beishu--;
		}
	}
}
//比对缩放图形
function bassstart() {
	w = parseInt($('#partimgs').width());
	h = parseInt($('#partimgs').height());
	baseWidth = parseInt($("#picDiv").width());
	baseHeight = parseInt($("#picDiv").height());
	if(w > h) {
		k = baseWidth / w;
	} else if(w < h) {
		k = baseHeight / h;
	} else {
		k = baseWidth / w;
	}
	n=k;
	$('#static').css("transform-origin","top left 0");
	$('#static').css("top","0").css("left","0");
	$('#static').css("-webkit-transform", "scale(" + n + ")");
	$('#static').css("transform", "scale(" + n+ ")");
	$('#static').css("-moz-transform", "scale(" + n +")");			
	$('#static').css("-o-transform", "scale(" + n +")");	
	$('#static').css("zoom", n);
	beishu=2;
	$('#picDiv').css("background","#fff");
	$("#dragAble").css("opacity","1");
	startbase();
}
function startbase () {
	var picDivbasew = parseInt($("#picDiv").width());
	var picDivbaseh = parseInt($("#picDiv").height());
	var partimgsbasew = parseInt($("#partimgs").width()*n);
	var partimgsbaseh = parseInt($("#partimgs").height()*n);
	var dragAbleleft=(picDivbasew-partimgsbasew)/2;
	var dragAbletop = (picDivbaseh-partimgsbaseh)/2;
	$("#dragAble").css({"margin-left":dragAbleleft+"px","margin-top":dragAbletop+"px"});
	
}
//		function bassstart() {
//			w = parseInt($('#partimgs').width());
//			h = parseInt($('#partimgs').height());
//			if(w > h) {
//				k = baseWidth / w;
//			} else if(w < h) {
//				k = baseHeight / h;
//			} else {
//				k = baseWidth / w;
//			}
//			$('#static').css("transform-origin", "top left 0");
//			$('#static').css({"top":0,"left":0});
//			$('#static').css("zoom", k);
//			n = k;
//			beishu = 2;
//			$('#picDiv').css("background", "#fff");
//			$("#dragAble").css("opacity", "1");
//		}
		return "IE";
	}; 
}
//以下是调用上面的函数
var mb = myBrowser();
var safari = true;
if("IE" == mb) {
//	console.log("aaa");
////	console.log("我是 IE");s
//	bassstart();
//	$("#static").css({
//			"top": 0,
//			"left": 0
//	});
//	kindexs = [];
//	$(document).on("click","#btn1",function  () {
//			ImageChange(true);
//		})
//		$(document).on("click","#btn2",function  () {
//			ImageChange(false);
//		})
//	$(document).on("click","#btn3",function  () {
//			bassstart();
//		})
//
//		function ImageChange(args) {
//			w = parseInt($('#partimgs').width());
//			h = parseInt($('#partimgs').height());
//			if(args) {
//				if(beishu < 8) {
//					n += 0.1;
//					n = Math.round(n * 100) / 100;
//					$('#static').css("zoom", n);
//					beishu++;
//				}
//			} else {
//				if(beishu > 0) {
//					n -= 0.1;
//					n = Math.round(n * 100) / 100;
//					$('#static').css("zoom", n);
//					beishu--;
//				}
//			}
//		}
//		//比对缩放图形
//		function bassstart() {
//			w = parseInt($('#partimgs').width());
//			h = parseInt($('#partimgs').height());
//			if(w > h) {
//				k = baseWidth / w;
//			} else if(w < h) {
//				k = baseHeight / h;
//			} else {
//				k = baseWidth / w;
//			}
//			$('#static').css("transform-origin", "top left 0");
//			$('#static').css({"top":0,"left":0});
//			$('#static').css("zoom", k);
//			n = k;
//			beishu = 1;
//			$('#picDiv').css("background", "#fff");
//			$("#dragAble").css("opacity", "1");
//		}
}
if("FF" == mb) {
//	console.log("我是 Firefox");
}
if("Chrome" == mb) {
//	console.log("我是 Chrome");
//	bassstart();
}
if("Opera" == mb) {
//	console.log("我是 Opera");
}

if("Safari" == mb) {
//	console.log("我是 Safari");
	safari=true;
}
if (safari) {
	$(document).on("click", "tr td", function() {
	$('#parts td').css('color', "#333");
	$('#parts tr').css('background-color', "#fff");
	$(".showwhitch").remove();
	$(this).parent().css("background-color", "#B4DCFF");
		$(".bgray").css("color","#FF3232").siblings('td').css("color","#FF3232");
		for (var k = 0; k < $("area").length; k++) {
		if ($("area").eq(k).attr('class') == $(this).parent().attr('class')) {
			kindexs.push(k);
		}
	}
	numsshow(kindexs);
	kindexs = [];
	var setId = "." + $(this).parent().attr('class');
	if(setId=="."){
		tem=0;
	}else{
		var tem=$("table#parts tr" + setId).length;
		//$(".message a").css("color","#00C7FF");
		//$("table#parts tr" + setId).find('.message a').css("color", "#FFFFFF");
	}
	if(tem > 1) {
		$("table#parts tr" + setId).children('td').css('color', "#3D7CFF");
	}else if(tem==1){
		$("table#parts tr" + setId).children('td').css('color', "#333");
	};
		$(".bgray").css("color","#FF3232").siblings('td').css("color","#FF3232");

		bassstart();
	//		if($('.showwhitch').length>0){
	//			staticy=($('#picDiv')[0].getBoundingClientRect().top+document.body.scrollTop);
	//			staticx=$('#picDiv')[0].getBoundingClientRect().left;
	//			var pidWidth=parseInt($('#picDiv').css("width"));
	//			var pidHeight=parseInt($('#picDiv').css("height"));
	//			maxX=staticx+pidWidth;
	//			maxY=staticy+pidHeight;
	//			mtop=($('.showwhitch')[0].getBoundingClientRect().top+document.body.scrollTop);
	//			mleft=$('.showwhitch')[0].getBoundingClientRect().left;
    //
	//			imgtx=($('#partimgs')[0].getBoundingClientRect().top+document.body.scrollTop);
	//			imgty=$('#partimgs')[0].getBoundingClientRect().left;
	//			imgbx=imgtx+parseInt(n*parseInt($('#partimgs').css("width")));
	//			imgby=imgty+parseInt(n*parseInt($('#partimgs').css("height")));
	//			var mdx=staticx+pidWidth/2;
	//			var mdy=staticy+pidHeight/2;
	//			var movex=mleft;
	//			var movey=mtop;
	//			if(!((staticy<mtop&&mtop<maxY)&&(staticx<mleft&&mleft<maxX))){
	//				if(mtop-imgty<pidHeight/2) {
	//					console.log("a");
	//					movey=imgty;
	//					mdy=staticy;
	//					if (mleft - imgtx < pidWidth / 2) {
	//						movex = imgtx;
	//						mdx=staticx;
	//					} else if (imgbx - mleft < pidWidth / 2) {
	//						movex = imgbx;
	//						mdx=maxX;
	//					}
	//				}else if(imgby-mtop<pidHeight/2){
	//					console.log("b")
	//					movey=imgby;
	//					mdy=maxY;
	//					if(mleft-imgtx<pidWidth/2){
	//						movex=imgtx;
	//						mdx=staticx;
	//					}else if(imgbx-mleft<pidWidth/2){
	//						movex=imgbx;
	//						mdx=maxX;
	//					}
	//				}else if(mleft-imgtx<pidWidth/2){
	//					console.log("c");
	//					movex=imgtx;
	//					mdx=staticx;
	//					if(mtop-imgty<pidHeight/2){
	//						movey=imgty;
	//						mdy=staticy;
	//					}else if(imgby-mtop<pidHeight/2){
	//						movey=imgby;
	//						mdy=maxY;
	//					}
	//				}else if(imgbx-mleft<pidWidth/2){
	//					console.log("d");
	//					movex=imgbx;
	//					mdx=maxX;
	//					if(mtop-imgty<pidHeight/2){
	//						movey=imgty;
	//						mdy=staticy;
	//					}else if(imgby-mtop<pidHeight/2){
	//						movey=imgby;
	//						mdy=maxY;
	//					}
	//				}
    //
	//				changeY=movey>mdy?(movey-mdy)*-1:mdy-movey;
	//				changeX=movex>mdx?(movex-mdx)*-1:mdx-movex;
	//				dx = parseInt($('#static').css('left'));
	//				dy = parseInt($('#static').css('top'));
	//				// $("#static").css("left",dx+changeX+"px").css("top",dy+changeY+"px");
	//				$("#static").css({
	//					left: dx+changeX+"px",
	//					top: dy+changeY+"px"
	//				});
	//	}
	//}
});
}
//}else{
//	$(document).on("click", "tr td", function() {
//		$('#parts tr').css('background-color', "#fff");
//		$('#parts td').css('color',"#333");
//	bassstart();
//	$("#static").css({
//			"top": 0,
//			"left": 0
//	});
//	$(".showwhitch").remove();
//		$(this).parent().css("background-color", "#B4DCFF");
//		$(".bgray").css("color","#FF3232").siblings('td').css("color","#FF3232");
//		$(this).parent().attr("abc","xyz");
//	for (var k = 0; k < $("area").length; k++) {
//		if ($("area").eq(k).attr('class') == $(this).parent().attr('class')) {
//			kindexs.push(k);
//		}
//	}
//	numsshow(kindexs);
//	kindexs = [];
//	var setId="."+$(this).parent().attr('class');
//	var tem=$("table#parts tr" + setId).length;
//		if(tem>1){
//			$("table#parts tr" + setId).children('td').css('color', "#3D7CFF");
//		}else if(tem==1){
//			$("table#parts tr" + setId).children('td').css('color', "#333");
//		};
//		$(".bgray").css("color","#FF3232").siblings('td').css("color","#FF3232");
//
//	});
//}
