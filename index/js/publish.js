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

//用户头像的点击轮播
$(".toright").click(function(){
	$(".userbox").animate({"left":0},1000,function(){
		$(".userbox").css("left",-120);
		$(".userbox li").eq($(".userbox li").length-1).clone().prependTo(".userbox");
		$(".userbox li").eq($(".userbox li").length-1).remove();
	})
});

//点赞以及收藏的点击
$(".click a").click(function(){
	$(this).css({"background":"#5faf83","color":"#fff"})
		   .siblings().css({"background":"#fff","color":"#7c7b7b"});
});
