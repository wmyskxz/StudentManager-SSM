<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<link href="css/login.css" rel="stylesheet">
<style>
.title{
background-image: url('img/login.png') ;
 background-repeat: no-repeat;
  
  font-size:30px;
   position: absolute;
    top: 10px;
    left: 30px;
    right: 20px;
    bottom: 340px;
}
</style>
<meta charset="utf-8">
<title>学生管理系统登录</title>
</head>
<body>

<div class="body">学生管理系统
 
<div class="midbox">
<h1 class="title">登录</h1>
<div class="form">
<form method="post" action="/login">
 
        <p><label class="label_input">用户名</label><input type="text" id="username" name="username"class="text_field"/></p>
        <p><label class="label_input">密码</label><input type="text" id="password"name="password" class="text_field"/></p>
 
        <div id="login_control">
           
            <a id="forget_pwd" href="forget_pwd.html">忘记密码？</a>
        </div>
       <input type="submit" id="btn_login" value="登录" />
 </form>
   <div>
        <p id="notice"><img id="notice" src="img/pass3.png">学生初始密码是： 教师初始密码是：<p>
        </div>
 </div>
</div>

</div>




</body>
</html>