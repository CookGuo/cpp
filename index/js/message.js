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



//图片的轮播
var index = 0;
var timer = setInterval(autoPlay,2500);
function autoPlay(){
	index++;
	$(".circle li").eq(index).css("background","#fff")
	               .siblings().css("background","#70877e");
	$(".bigimg").animate({"left":-728},1000,function(){
		$(".bigimg").css("left",0);
		$(".bigimg").append($(".bigimg li").eq(0).clone());
		$(".bigimg li").eq(0).remove();
	});
	
	if( index == 3 ){
		index=-1;
	}
}

//鼠标移入移出的操作
$(".circle li").mouseenter(function(){
	index = $(this).index();
	clearInterval(timer);
	$(this).css("background","#fff")
		   .siblings().css("background","#70877e");
	$(".bigimg").stop().animate({"left":"-"+ index *728+"px"});
});

$(".circle li").mouseleave(function(){
//	index -= 1;
	timer = setInterval(autoPlay,2500);
});


//图片移入的时候，图片放大，字显示
$(".tuboxc").mouseenter(function(){
	$(this).find("img").stop().animate({"height":"110%","width":"110%"},1000);
	$(this).find("span").stop().animate({"bottom":5},1000);
});
$(".tuboxc").mouseleave(function(){
	$(this).find("img").stop().animate({"height":"100%","width":"100%"},500);
	$(this).find("span").stop().animate({"bottom":-40},500);
});

//精选文章的图片划入划出效果
$(".tuarticle img").mouseenter(function(){
	$(this).stop().animate({"height":"110%","width":"110%"},1000);
});
$(".tuarticle img").mouseleave(function(){
	$(this).stop().animate({"height":"100%","width":"100%"},1000);
});

//点击加载更多来获取更多
$(".login-more").click(function(){
	login_More();
});
//点击更多同样请求ajax
$(".articlec .title a").click(function(){
	login_More();
});
function   login_More(){
	$.ajax({
		type:"get",
		url:"http://127.0.0.1/cpp/index/article.json",
		success:function(json){
			var str = "";
			for( var i in json ){
				str +=`<div class="essayc">
						<a href="javascript:;" class="tuarticle"><img src="img/${json[i].bigimg}" alt="" /></a>
						<p class="miaoshu">${json[i].key}</p>
						<p class="begin">
							<a href="javascript:;">${json[i].title}</a>
						</p>
						<div class="bot clearfix">
							<p class="bot-left">
								<span>标签：</span>
								<span class="biaoqian">${json[i].biaoqian}</span>
							</p>
							<p class="bot-right">
								<a href="javascript:;"></a>
								<span>${json[i].look}</span>
								<a href="javascript:;"></a>
								<span>${json[i].shouchang}</span>
								<a href="javascript:;"></a>
								<sapn>${json[i].pinlun}</sapn>
							</p>
						</div>
					</div>`;
			}
			$(".essay").html($(".essay").html() + str);
			for(var i = 0 ; i < $(".essayc").length; i++){					
				if( i != 0 ){
					$(".essayc").eq(2*i-1).addClass("essayc to0");
				}
				
			}
			
			
			
		//精选文章的图片划入划出效果
		$(".tuarticle img").mouseenter(function(){
			$(this).stop().animate({"height":"110%","width":"110%"},1000);
		});
		$(".tuarticle img").mouseleave(function(){
			$(this).stop().animate({"height":"100%","width":"100%"},1000);
		});	
			
		}
	});
}



//点击更多请求ajax精选专辑数据
$(".more-title").click(function(){
	$.ajax({
		type:"get",
		url:"http://127.0.0.1/cpp/index/select.json",
		success:function(json){
			var str = "";
			for( var i in json ){
				str += `<div class="tuboxc">
					 	<img src="img/${json[i].img}" alt="" />
					 	<span>${json[i].title}</span>
					 </div>`;
			}
			$(".tubox").html($(".tubox").html()+str);
			for(var i = 0 ; i < $(".tuboxc").length; i++){					
				if( i != 0 ){
					$(".tuboxc").eq(3*i-1).addClass("tuboxc to0");
				}
				
			}
			
			//图片的移入移出，图片的变大以及文字的显示
			$(".tuboxc").mouseenter(function(){
				$(this).find("img").stop().animate({"height":"110%","width":"110%"},1000);
				$(this).find("span").stop().animate({"bottom":5},1000);
			});
			$(".tuboxc").mouseleave(function(){
				$(this).find("img").stop().animate({"height":"100%","width":"100%"},500);
				$(this).find("span").stop().animate({"bottom":-40},500);
			});
		}
	});
});
