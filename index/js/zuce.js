//登录注册按钮的点击
$(".dl").click(function(){
	$("#zuce-main").hide(300,function(){
		$("#login").show(300);
		$(this).css({"border-bottom":"2px solid #333","padding-bottom":"12px","color":"#333"})
			   .siblings().css({"border":0,"color":"#706f6f"});
	});
	
	$("#main").hide(300,function(){
		$("#login").show(300);
		$(this).css({"border-bottom":"2px solid #333","padding-bottom":"12px","color":"#333"})
			   .siblings().css({"border":0,"color":"#706f6f"});
	});
});
$(".zuce").click(function(){
	$("#login").hide(300,function(){
		$("#main").show(300);
		$(this).css({"border-bottom":"2px solid #333","padding-bottom":"12px","color":"#333"})
			   .siblings().css({"border":0,"color":"#706f6f"});
	});	 
	
	$("#zuce-main").hide(300,function(){
		$("#main").show(300);
		$(this).css({"border-bottom":"2px solid #333","padding-bottom":"12px","color":"#333"})
			   .siblings().css({"border":0,"color":"#706f6f"});
	});
});
//注册的手机号验证
var reg = /^1\d{10}$/;
$(".btn").click(function(){
	if( reg.test( $(".phone").val() ) ){
		$(".shouji-check").css({"display":"none"});
		$("#main").hide(300,function(){
			$("#zuce-main").show(300);
		});
	}else{
		$(".shouji-check").css({"display":"block"});
		$(".shouji-check").html("请输入正确的手机号");
	}
});


//用户的注册
var flagName = null;
$("#zuce-main .name").blur(function(){
	var reg = /^\w{5,15}$/;
	if( reg.test($(this).val() ) ){
		$(".check").css("display","none");
		flagName=true;
	}else{
		flagName=false;
		$(".check").html("用户名不正确");
		$(".check").css({"color":"red","display":"block"});
	}
});

var flagPwd = null;
$("#zuce-main .pwd").blur(function(){
	inp = $(this).val();
	var reg = /^\w{5,10}$/;
	if( reg.test($(this).val() ) ){
		$(".check").css("display","none");
		flagPwd=true;
	}else{
		flagPwd=false;
		$(".check").html("密码格式不正确");
		$(".check").css({"color":"red","display":"block"});
	}
});

var flagQpwd = null;
$("#zuce-main .Qpwd").blur(function(){
	if( inp != $(this).val() ){
		flagQpwd = false;
		$(".check").html("两次密码不一致");
		$(".check").css({"color":"red","display":"block"});
	}else{
		flagQpwd = true;
	}
});

var flagNumber = null;
$("#zuce-main .number").blur(function(){
	if( $(this).val() != $(this).next().html() ){
		flagNumber = false;
		$(".check").html("验证码错误");
		$(".check").css({"color":"red","display":"block"});
	}else{
		flagNumber = true;
	}
});


//点击更换数值
$(".changenum").click(function(){
	var html = getRand();
	$(this).html(html);
});

//获取随机数字以及字母
function getRand(){
	var str = "";
	for( var i = 0 ;i < 4 ; i++ ){
		var num = getNum();
		if( (num >= 74 && num <= 80) || (num >= 91 && num <= 96 ) ){
			i--;
		}
		str += String.fromCharCode( num );
	}
	
	return str;
}

//获取随机数
function getNum(){
	return Math.round(Math.random()*58 + 64) ;
}

var flagPhone = null;
$("#zuce-main .phonenum").blur(function(){
	if( $(this).val() != $(this).next().html() ){
		flagPhone = false;
		$(".check").html("短信验证码不真确或者已过期");
		$(".check").css({"color":"red","display":"block"});
	}else{
		flagPhone = true;
	}
});



$(".userbtn").click(function(){
	if( flagPhone&&flagNumber&&flagQpwd&&flagPwd&&flagName ){
		var json = {
			uname : $(".name").val(),
			pwd : $(".pwd").val(),
		}
		document.cookie = "user="+JSON.stringify(json);
		$("#zuce-main").hide(300,function(){
			$("#login").show(300);
		});
	}
});
 



//自动登录按钮
var flagSelf = true;
$(".selflogin").click(function(){
	if( flagSelf ){
		$(this).css("background","#5faf83");
		flagSelf = false;
	}else{
		$(this).css("background","#fff");
		flagSelf = true;
	}
})

//登录的表单验证，取cookie中的密码以及用户名验证
//如果cookie中是空的数据那就请求ajax中的数据
var loginName = null;
var loginPwd = null;
if( document.cookie == "" ){
	$.ajax({
		type:"get",
		url:"http://127.0.0.1/cpp/index/user.json",
		success:function(json){
			//验证用户名
			$("#login .uname").blur(function(){
				$(".login-check").css("display","none");
				for( var i = 0 ; i < json.username.length ; i++ ){
					if( $(this).val() == json.username[i].uname ){
						console.log("aa");
						loginName = true;
							break;
					}
				}
				if( loginName == null ){
					loginName = false;
					console.log("bb");
					$(".login-check").html("用户名或者密码不正确");
					$(".login-check").css({"color":"red","display":"block","font-size":"14px"});
				}
			});
			//验证密码
			$("#login .upwd").blur(function(){
				$(".login-check").css("display","none");
				for( var i = 0 ; i < json.pwd.length ; i++ ){
					if(  $(this).val() == json.pwd[i].pwd ){
						loginPwd = true;
							break;
				}
					}if( loginPwd == null ){
						loginPwd = false;
						$(".login-check").html("用户名或者密码不正确");
						$(".login-check").css({"color":"red","display":"block","font-size":"14px"});
					}
			});
		}
	});
	
}else{
	var str = document.cookie.split("=")[1];
	var json = JSON.parse(str);
	$("#login .uname").blur(function(){
		$(".login-check").css("display","none");
				if( $(this).val()!= json.uname ){
					loginName = false;
					$(".login-check").html("用户名或者密码不正确");
					$(".login-check").css({"color":"red","display":"block","font-size":"14px"});
				}else{
					loginName = true;
				}
			});
			
			$("#login .upwd").blur(function(){
				$(".login-check").css("display","none");
				if( $(this).val()!= json.pwd ){
					loginPwd = false;
					$(".login-check").html("用户名或者密码不正确");
					$(".login-check").css({"color":"red","display":"block","font-size":"14px"});
				}else{
					loginPwd = true;
				}
			});
}

//密码验证正确之后跳转到首页
function toIndex(){
	//如果通过验证，说明是已经注册过得会员，将信息存到cookie中
	if( loginName && loginPwd ){
		console.log($("#login .uname").val());
		var json = {
			uname : $("#login .uname").val(),
			pwd : $("#login .upwd").val()
		}
		document.cookie = "user="+JSON.stringify(json);
		location.href="index.html";
	}
}
$(".loginbtn").click(function(){
	toIndex();
});

