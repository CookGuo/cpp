//图片轮播
$(function(){
	autoplay();
});

var index = 0;
function autoplay(){
	timer = setInterval(function(){
		index++;
		$(".index li").eq(index).addClass("active")
					  .siblings().removeClass("active");
		$(".imgs img").eq(index).animate({"opacity":1},3000)
					  .siblings().animate({"opacity":0},3000);
		if( index == 3){
			index=-1;
		}
	},3000)
}

$(".bncount").mouseenter(function(){
	$(".bncount span").stop().show(1000);
});
$(".bncount span").click(function(){
	clearInterval(timer);
	num = $(this).index();
	if(num==0){
		index--;
		$(".index li").eq(index).addClass("active")
					  .siblings().removeClass("active");
		$(".imgs img").eq(index).animate({"opacity":1},2000)
					  .siblings().animate({"opacity":0},2000);
		if( index== -1 ){
			index = 3;
		}
	}else{
		index++;
		$(".index li").eq(index).addClass("active")
					  .siblings().removeClass("active");
		$(".imgs img").eq(index).animate({"opacity":1},2000)
					  .siblings().animate({"opacity":0},2000);
		if( index == 3){
			index=-1;
		}
	}
});

$(".bncount").mouseleave(function(){
	$(".bncount span").stop().hide(1000);
	clearInterval(timer);
	autoplay();
});

$(".index li").mouseenter(function(){
	clearInterval(timer);
	$(".index li").eq($(this).index()).addClass("active")
					  .siblings().removeClass("active");
		$(".imgs img").eq($(this).index()).animate({"opacity":1},3000)
					  .siblings().animate({"opacity":0},3000);
});

//图片的滑入，划出效果
$(".moretu img").mouseenter(function(){
//	$(this).stop().animate({"height":"110%","width":"110%"},1000)  
	enter($(this));
});
$(".moretu img").mouseleave(function(){
	leave($(this));
});

function enter(obj){
	obj.stop().animate({"height":"110%","width":"110%"},1000) 
}

function leave(obj){
	obj.stop().animate({"height":"100%","width":"100%"},1000)
}

$(".word img").mouseenter(function(){
	$(this).stop().animate({"height:":150,"width":220},1000);
});
$(".word img").mouseleave(function(){
	$(this).stop().animate({"height:":128,"width":198},1000);
});

//true 的时候点击有颜色，点赞加一
var falg = true;
$("li").click(function(){
	console.log($(".tucount li").length);
	if( falg ){
		falg=false;
		if( $(this).hasClass("a1")){
			$(this).find("img").attr("src","images/shou1.png");
			$(this).parent().children().eq(0).find("span").html(parseInt($(this).parent().children().eq(0).find("span").html())+1);
		}
		if( $(this).hasClass("a2") ){
			$(this).find("img").attr("src","images/xing1.png");
			$(this).parent().children().eq(1).find("span").html(parseInt($(this).parent().children().eq(1).find("span").html())+1);
			
		}
	}else{
		falg=true;
		if( $(this).hasClass("a1") ){
			$(this).find("img").attr("src","images/shou.png");
			$(this).parent().children().eq(0).find("span").html(parseInt($(this).parent().children().eq(0).find("span").html())-1);
			
		}
		if( $(this).hasClass("a2") ){
			$(this).find("img").attr("src","images/xing.png");
			$(this).parent().children().eq(1).find("span").html(parseInt($(this).parent().children().eq(1).find("span").html())-1);
			
		}
	}
});

//帖子中的图片效果
$(".tua").mouseenter(function(){
	enter($(this).find("img"));
});
$(".tua").mouseleave(function(){
	leave($(this).find("img"));
});

//底部的a划过效果
$("#footer a").mouseenter(function(){
	color = $(this).css("color");
	console.log(color);
	$(this).css("color","orange");
});
$("#footer a").mouseleave(function(){
	$(this).css("color",color);
});
//吸顶效果，以及回顶效果
var otop=0,ntop=0;
var ht = $("#nav").outerHeight();
$(window).scroll(function(){
	ntop = $("html,body").scrollTop();
	if( ntop <= ht ){
		$("#nav").css({"position":"fixed","top":0,"z-index":10});
	}else{
		if( otop < ntop ){
			$("#nav").stop().slideUp(600);
		}else{
			$("#nav").stop().slideDown(600);
		}
	}
	
	if( ntop > 500 ){
		$("#to-top").css("display","block");
	}else{
		$("#to-top").css("display","none");	
	}
	setTimeout(function(){ otop = ntop },0);
});
$("#to-top").click(function(){
	$("html,body").animate({"scrollTop":0},1000);
});
