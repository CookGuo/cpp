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


//点击背景更换，文字变换
$(".select a").click(function(){
	$(this).css({"background":"#5faf83","color":"#fff"})
	       .siblings().css({"background":"#fff","color":"#373838"});
});

//热门以及最新的ajax请求
$(".select .p1 a").click(function(){
	if( $(this).index() == 0 ){
		$.ajax({
			type:"get",
			url:"http://127.0.0.1/cpp/index/fenye.json",
			success:function(json){
				var str = "";
				for( var attr in json ){
					if( attr == "hot" ){
						for( var i = 0 ; i < json["hot"].length ; i++ ){
							str +=`<div class="goods-box">
								<a href="javascript:;"><img src="img/${json["hot"][i].img}" alt="" /></a>
								<p>${json["hot"][i].discirbe}</p>
								<p>${json["hot"][i].price}</p>
							</div>`;
						}
					}
				}
				$(".goodsc").html(str);
				for( var j = 0 ; j < $(".goods-box").length ; j++ ){
					if( j != 0 ){
						$(".goods-box").eq(4*j-1).addClass("goods-box to0");
					}
				}
			}
		});
	}else{
		$.ajax({
			type:"get",
			url:"http://127.0.0.1/cpp/index/fenye.json",
			success:function(json){
				var str = "";
				for( var attr in json ){
					if( attr == "news" ){
						for( var i = 0 ; i < json["news"].length ; i++ ){
							str +=`<div class="goods-box">
								<a href="javascript:;"><img src="img/${json["news"][i].img}" alt="" /></a>
								<p>${json["news"][i].discirbe}</p>
								<p>${json["news"][i].price}</p>
							</div>`;
						}
					}
				}
				$(".goodsc").html(str);
				for( var j = 0 ; j < $(".goods-box").length ; j++ ){
					if( j != 0 ){
						$(".goods-box").eq(4*j-1).addClass("goods-box to0");
					}
				}
			}
		});
	}
});
//点击上价格实现分页效果
$(".select .p2 a").click(function(){
	var index = $(this).index();
	$.ajax({
			type:"get",
			url:"http://127.0.0.1/cpp/index/fenye.json",
			success:function(json){
				var str = "";
				for( var attr in json ){
					if( attr == "fuli" ){
						for( var i = index * 8 ; i < (index+1) * 8 ; i++ ){
							str +=`<div class="goods-box">
								<a href="javascript:;"><img src="img/${json["fuli"][i].img}" alt="" /></a>
								<p>${json["fuli"][i].discirbe}</p>
								<p>${json["fuli"][i].price}</p>
							</div>`;
						}
					}
				}
				$(".goodsc").html(str);
				for( var j = 0 ; j < $(".goods-box").length ; j++ ){
					if( j != 0 ){
						$(".goods-box").eq(4*j-1).addClass("goods-box to0");
					}
				}
			}
		});
});

//点击加载更多
$(".goods-more").click(function(){
	$.ajax({
			type:"get",
			url:"http://127.0.0.1/cpp/index/fenye.json",
			success:function(json){
				var str = "";
				for( var attr in json ){
					if( attr == "more" ){
						for( var i = 0 ; i < json["more"].length ; i++ ){
							str +=`<div class="goods-box">
								<a href="javascript:;"><img src="img/${json["more"][i].img}" alt="" /></a>
								<p>${json["more"][i].discirbe}</p>
								<p>${json["more"][i].price}</p>
							</div>`;
						}
					}
				}
				$(".goodsc").html( $(".goodsc").html() + str );
				for( var j = 0 ; j < $(".goods-box").length ; j++ ){
					if( j != 0 ){
						$(".goods-box").eq(4*j-1).addClass("goods-box to0");
					}
				}
			}
		});
});
