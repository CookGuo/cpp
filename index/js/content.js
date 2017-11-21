//选项卡的小图点击效果
//并改变相应的大图
$(function(){
	$(".smallimg li img").eq(0).css({"width":"100%","left":0});
	$(".bigimg li").eq(0).css("opacity",1)
	                .siblings().not(".mask").css("opacity",0);
	$(".largerimg img").eq(0).css("z-index",1)
					   .siblings().css("z-index",0);
});
$(".smallimg li").click(function(){
	$(this).find("img").stop().animate({"width":"100%","left":0},10)
		   .end().siblings().find("img").stop().animate({"width":"126px","left":3},10);
	$(".bigimg li").eq($(this).index()).stop().animate({"opacity":1},1000)
				   .siblings().not(".mask").stop().animate({"opacity":0},1000);
	$(".largerimg img").eq($(this).index()).css("z-index",1)
					   .siblings().css("z-index",0);
});

//底部图片的划入效果
$(".more a").mouseenter(function(){
	$(this).find("img").stop().animate({"height":"110%","width":"110%"},1000);
});
$(".more a").mouseleave(function(){
	$(this).find("img").stop().animate({"height":"100%","width":"100%"},1000);
});

//箭头的点击的轮播
$(".toright").click(function(){
	$(".userbox").stop().animate({"left":0},1000,function(){
		$(".userbox").css("left",-120);
		$(".userbox li").eq($(".userbox li").length-1).clone().prependTo(".userbox");
		$(".userbox li").eq($(".userbox li").length-1).remove();
	})
});


//放大镜效果
//蒙版的移入出现，移出消失
$(".bigimg").mouseenter(function(){
	$(".mask").css({"display":"block"});
	$(".largerimg").css("display","block");
	$(document).mousemove(function(e){
		var e = e || event;
		var x = e.pageX - $(".bigimg").offset().left - $(".mask").outerWidth()/2;
		var y = e.pageY - $(".bigimg").offset().top - $(".mask").outerHeight()/2;
		
		
		var maxL = $(".bigimg").outerWidth() - $(".mask").outerWidth();
		var maxH = $(".bigimg").outerHeight() - $(".mask").outerHeight();
		//边界处理
		x = Math.min( maxL, Math.max( 0 , x) );
		y = Math.min( maxH , Math.max( 0 , y) );
		$(".mask").css({"top":y,"left":x});
		
		var bigleft = x*$(".largerimg img").outerWidth()/$(".bigimg").outerWidth();
		console.log($(".largerimg img").outerWidth());
		console.log($(".bigimg").outerWidth());
		var bigtop = y*$(".largerimg img").outerHeight()/$(".bigimg").outerHeight();
		$(".largerimg img").css({
			"left":-bigleft,
			"top":-bigtop
		});
	});
	
	$(".bigimg").mouseleave(function(){
		$(".mask").css("display","none");
		$(".largerimg").css("display","none");
	});
});
	

//点击商品的增加减少
var count = 1;
$(".add").click(function(){
	count++;
	$(this).parent().prev().html(count);
});
$(".reduce").click(function(){
	count--;
	if( count <= 0 ){
		count = 0;
	}
	$(this).parent().next().html(count);
});





//吸顶效果，以及回顶效果
$("#box").load("public.html #nav",function(){
	
	var otop=0,ntop=0;
	var ht = $("#nav").outerHeight();
	//滚动条事件
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
		
		if( ntop > 1000 ){
			$("#to-top").css("display","block");
		}else{
			$("#to-top").css("display","none");	
		}
		setTimeout(function(){ otop = ntop },0);
		
	});
	
	//点击变换图标
	var flaguserbtn = true;
	$(".user a").click(function(){
		if( flaguserbtn ){
			$(this).css("background","url(images/jj.jpg) no-repeat right center");
			flaguserbtn = false;
			$(".user-message").stop().show(1000);
		}else{
			$(this).css("background","url(images/jjz.png) no-repeat right center");
			flaguserbtn = true;
			$(".user-message").stop().hide(1000);
		}
	});
	
	
	
//页面加载之后ajax请求判断是否有用户登录
//如果是新用户登录。默认的用户头像
$(function(){
	console.log("aaa");
	var cookie = document.cookie;
	
	//表示cookie为空
	if( !cookie ){
		$(".usernews").css("display","none");
		$(".change").css("display","block");
	}else{
		var str = document.cookie.split("=")[1];
		var usernews = JSON.parse(str);
        //ajax数据请求，判断是哪个用户登录了
	    //将用户信息显示出来
		$.ajax({
			type:"get",
			url:"http://127.0.0.1/cpp/index/public.json",
			success:function(json){
				for( var i in json ){
					if( usernews.uname == i ){
						$(".change").css("display","none");
						$(".usernews").css("display","block");
						//改变对应的用户头像
						$(".user img").attr("src","images/"+json[i].img);
						//改变用户的消息数量
						$(".usernews .messages").html(json[i].message);
							break;
					}
				}
				
			}
		});
		}
	});

	
	
});

//底部的文字效果
$("#footer").load("public.html .footercount",function(){
	
			$("#footer a").mouseenter(function(){
			color = $(this).css("color");
			console.log(color);
			$(this).css("color","orange");
		});
		$("#footer a").mouseleave(function(){
			$(this).css("color",color);
		});
});

//回顶部效果
$("#top0").load("public.html #to-top",function(){
	$("#to-top").click(function(){
		$("html,body").animate({"scrollTop":0},1000);
	});
});
