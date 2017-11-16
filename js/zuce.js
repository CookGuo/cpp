//登录注册按钮的点击
$(".dl").click(function(){
	$(this).css({"border-bottom":"2px solid #333","padding-bottom":"12px","color":"#333"})
		   .siblings().css({"border":0,"color":"#706f6f"});
});
$(".zuce").click(function(){
	$(this).css({"border-bottom":"2px solid #333","padding-bottom":"12px","color":"#333"})
		   .siblings().css({"border":0,"color":"#706f6f"});
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
	if( $(this).val()!=$(this).next().html() ){
		flagNumber = false;
		$(".check").html("验证码错误");
		$(".check").css({"color":"red","display":"block"});
	}else{
		flagNumber = true;
	}
});

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
	}
});
 