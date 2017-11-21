
autoplay();
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
		$(".imgs img").eq(index).stop().animate({"opacity":1},300)
					  .siblings().stop().animate({"opacity":0},300);
		if( index== -1 ){
			index = 3;
		}
	}else{
		index++;
		$(".index li").eq(index).addClass("active")
					  .siblings().removeClass("active");
		$(".imgs img").eq(index).stop().animate({"opacity":1},300)
					  .siblings().stop().animate({"opacity":0},300);
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
		$(".imgs img").stop().eq($(this).index()).animate({"opacity":1},500)
					  .siblings().stop().animate({"opacity":0},500);
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
var falgShou = true;
var falgXing = true;
$(".a1").click(function(){

	if( falgShou ){
		falgShou = false;
		$(this).find("a").css("background","url(images/shou1.png) no-repeat center");
		$(this).parent().children().eq(0).find("span").html(parseInt($(this).parent().children().eq(0).find("span").html())+1);
	}else{
		falgShou = true;
		$(this).find("a").css("background","url(images/shou.png) no-repeat center");
		$(this).parent().children().eq(0).find("span").html(parseInt($(this).parent().children().eq(0).find("span").html())-1);
	}
});


$(".a2").click(function(){
			if( falgXing){
				falgXing = false;
				$(this).find("a").css("background","url(images/xing1.png) no-repeat center");
				$(this).parent().children().eq(1).find("span").html(parseInt($(this).parent().children().eq(1).find("span").html())+1);
			}else{
				falgXing = true;
				$(this).find("a").css("background","url(images/xx.png) no-repeat center");
				$(this).parent().children().eq(1).find("span").html(parseInt($(this).parent().children().eq(1).find("span").html())-1);
			}
});


//帖子中的图片效果
$(".tua").mouseenter(function(){
	enter($(this).find("img"));
});
$(".tua").mouseleave(function(){
	leave($(this).find("img"));
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




//贴子的ajax请求数据的加载
$(".title .tzmore").click(function(){
	$.ajax({
		type:"get",
		url:"http://127.0.0.1/cpp/index/tiezi.json",
		success:function(json){
			var str = "";
			for( var i in json ){
					str += `<div class="tucount">
					<a href="javascript:;" class="tua">
						<img src="images/${json[i].bigimg}" alt="" />
					</a>
					<p class="ren">
						<a href="javascript:;">
							<img src="images/${json[i].smallimg}" alt="" />
						</a>
						<span>${json[i].username}</span>
					</p>
					<p class="describe">
						${json[i].title}
					</p>
					<ul class="clearfix">
						<li>
							点赞
							<span>${json[i].zan}</span>
						</li>
						<li>
							收藏
							<span>${json[i].shouchang}</span>
						</li>
						<li>
							评论
							<span>${json[i].pinlun}</span>
						</li>
						<li class="a1">
							<a href="javascript:;" >
							</a>
						</li>
						<li  class="a2">
							<a href="javascript:;">
							</a>
						</li>
					</ul>
				</div>`;
			}
			$(".count").html($(".count").html() + str);
			for(let i = 0 ; i < $(".tucount").length; i++){					
				if( i != 0 ){
					$(".tucount").eq(3*i-1).addClass("to0 tucount");
				}
				
			}
			
			
			
			
//true 的时候点击有颜色，点赞加一
var falgShou = true;
var falgXing = true;
$(".a1").click(function(){

	if( falgShou ){
		falgShou = false;
		$(this).find("a").css("background","url(images/shou1.png) no-repeat center");
		$(this).parent().children().eq(0).find("span").html(parseInt($(this).parent().children().eq(0).find("span").html())+1);
	}else{
		falgShou = true;
		$(this).find("a").css("background","url(images/shou.png) no-repeat center");
		$(this).parent().children().eq(0).find("span").html(parseInt($(this).parent().children().eq(0).find("span").html())-1);
	}
});


$(".a2").click(function(){
			if( falgXing){
				falgXing = false;
				$(this).find("a").css("background","url(images/xing1.png) no-repeat center");
				$(this).parent().children().eq(1).find("span").html(parseInt($(this).parent().children().eq(1).find("span").html())+1);
			}else{
				falgXing = true;
				$(this).find("a").css("background","url(images/xx.png) no-repeat center");
				$(this).parent().children().eq(1).find("span").html(parseInt($(this).parent().children().eq(1).find("span").html())-1);
			}
});



//帖子中的图片效果
$(".tua").mouseenter(function(){
	enter($(this).find("img"));
});
$(".tua").mouseleave(function(){
	leave($(this).find("img"));
});
			
			
			
		}
	});
});


	