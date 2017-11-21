//获取任意区间值函数
function getRand(min,max){
	return Math.round( Math.random()*(max-min) + min );
}
//随即获取颜色

function getColor(){
	var str="0123456789abcdef";
	var sty="#";
	for(var i=0;i<6;i++){
		sty+=str[getRand(0,15)];
	}
	return sty;
}
//根据id获取页面元素
function getId(id){
	return document.getElementById(id);
}
//获取日期时间格式函数  封装  
function dateToString(now,sign){
	sign = sign || "-";
	var y = now.getFullYear();
	var m =toTow( now.getMonth()+1 );
	var d =toTow( now.getDate() );
	var h =toTow( now.getHours() );
	var mint =toTow( now.getMinutes() );
	var s =toTow( now.getSeconds() );
	return  y + sign + m + sign + d + " " + h + ":" + mint + ":" +s;
}
function toTow(num){
	return num < 10 ? "0"+num : num;
}

//字符串转日期时间格式
function stringToDate(str){
     return new Date(str);
}

//时间差
function diff(start,end){ 
	return Math.abs( start.getTime() - end.getTime() )/1000;
}

//碰撞检测
function pz(obj1,obj2){
	var L1 = obj1.offsetLeft;
	var R1 = obj1.offsetLeft + obj1.offsetWidth;
	var T1 = obj1.offsetTop;
	var B1 = obj1.offsetTop + obj1.offsetHeight;
	
	var L2 = obj2.offsetLeft;
	var R2 = obj2.offsetLeft + obj2.offsetWidth;
	var T2 = obj2.offsetTop;
	var B2 = obj2.offsetTop + obj2.offsetHeight;		
	
	if( R1 < L2  ||  L1>R2 ||  B1<T2 || T1 >B2 ){ //　碰不上
		return false;	
	}else{
		return true;
	}
}

//设置cookie
function setCookie(key,value,day){
	if( day>0 ){
		var d = new Date();
		d.setDate( d.getDate() +day );
		document.cookie = key + "=" + value + ";expires=" + d;
	}else{
		document.cookie = key + "=" + value;
	}
}
//获取cookie
function getCookie(key){
	if( document.cookie ){//如果有cookie
		var str = document.cookie;
		var arr = str.split("; ");
		for( var i = 0 ; i < arr.length ; i++ ){
			var item = arr[i].split("=");
			if( item[0]==key ){
				return item[1];//找到了 key对应的值
			}
		}
		//如果cookie中没有key  找不到对应的值
		return "";
	}
	//如果没有cookie   
	return "";
}
//删除cookie
function removeCookie(key){
	setCookie(key,"",-1);
}
//根据标签创建标签
function create(mn){
	return document.createElement(mn);
}









////吸顶效果，以及回顶效果
//$("#box").load("public.html #nav",function(){
//	
//	var otop=0,ntop=0;
//	var ht = $("#nav").outerHeight();
//	$(window).scroll(function(){
//		ntop = $("html,body").scrollTop();
//		if( ntop <= ht ){
//			$("#nav").css({"position":"fixed","top":0,"z-index":10});
//		}else{
//			if( otop < ntop ){
//				$("#nav").stop().slideUp(600);
//			}else{
//				$("#nav").stop().slideDown(600);
//			}
//		}
//		
//		if( ntop > 1000 ){
//			$("#to-top").css("display","block");
//		}else{
//			$("#to-top").css("display","none");	
//		}
//		setTimeout(function(){ otop = ntop },0);
//});
//});
//
////底部的文字效果
//$("#footer").load("public.html .footercount",function(){
//	
//			$("#footer a").mouseenter(function(){
//			color = $(this).css("color");
//			console.log(color);
//			$(this).css("color","orange");
//		});
//		$("#footer a").mouseleave(function(){
//			$(this).css("color",color);
//		});
//	
//});
//
////回顶部效果
//$("#top0").load("public.html #to-top",function(){
//	$("#to-top").click(function(){
//	$("html,body").animate({"scrollTop":0},1000);
//});
//});