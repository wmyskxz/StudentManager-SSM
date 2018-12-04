<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>首页</title>
<link href="http://cdn.bootcss.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
 <script src="js/jquery/2.0.0/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<link href="menu/main_nav.css" rel="stylesheet">
</head>
<body >
<div class="navbar navbar-duomi navbar-static-top" role="navigation">
  <div class="container-fluid">
     <div class="navbar-header">
       <a class="navbar-brand" href="/Admin/index.html" id="logo">学籍管理系统</a>
     </div>
  </div>
 </div>
<div class="container-fluid">
       <div class="row">
         <div class="col-md-2">
         <ul id="main-nav" class="nav nav-tabs nav-stacked" style="">
             <li class="active">
               <a href="#">
                <i class="glyphicon glyphicon-th-large"></i>
                              首页 
                </a>
            </li>
             <li id="ul_menu">
              <a href="#systemSetting" class="nav-header collapsed" data-toggle="collapse">
               <i class="glyphicon glyphicon-cog"></i>
         学籍信息管理
                <span class="pull-right glyphicon glyphicon-chevron-down"></span>
             </a>
          <ul id="systemSetting" class="nav nav-list collapse secondmenu" style="height: 0px;">
            <li><a href="/listStudentInfo"><i class="glyphicon glyphicon-user"></i>学籍列表显示和添加</a></li>
            <li><a href="search.jsp"><i class="glyphicon glyphicon-th-list"></i>学生信息查询</a></li>
            <li><a href="/printStudentInfo"><i class="glyphicon glyphicon-th-list"></i>打印学生信息</a></li>
            <li><a href="/groupStat"><i class="glyphicon glyphicon-asterisk"></i>统计学生页面</a></li>
             <li><a href="/exportExcel"><i class="glyphicon glyphicon-edit"></i>导出excel</a></li>
          </ul>
          </li>
          <li id="ul_menu">
             <a href="#systemSetting1" class="nav-header collapsed" data-toggle="collapse">
             <i class="glyphicon glyphicon-cog" ></i>班级信息管理
              <span class="pull-right glyphicon glyphicon-chevron-down"></span></a>
               <ul id="systemSetting1" class="nav nav-list collapse secondmenu" style="height: 0px;">
            <li><a href="/classinfo"><i class="glyphicon glyphicon-user"></i>班级信息显示</a></li>
            <li><a href="#"><i class="glyphicon glyphicon-th-list"></i>查询班级</a></li>
            <li><a href="#"><i class="glyphicon glyphicon-asterisk"></i>导出班级名单</a></li>
            </ul>
              
         </li>
         <li id="ul_menu">
             <a href="#systemSetting2" class="nav-header collapsed" data-toggle="collapse">
             <i class="glyphicon glyphicon-globe"></i>课程管理模块<span class="label label-warning pull-right">5</span></a>
               <ul id="systemSetting2" class="nav nav-list collapse secondmenu" style="height: 0px;">
            <li><a href="#"><i class="glyphicon glyphicon-user"></i>课程信息显示</a></li>
            <li><a href="#"><i class="glyphicon glyphicon-th-list"></i>查询课程</a></li>
            <li><a href="#"><i class="glyphicon glyphicon-asterisk"></i>导打印学生成绩</a></li>
            </ul>
          </li >
         <li id="ul_menu">
             <a href="./charts.html"><i class="glyphicon glyphicon-calendar"></i>修改密码</a></li>
        <li>
              <a href="#"><i class="glyphicon glyphicon-fire"></i>关于系统</a>
        </li>
     </ul>
</div>
     <div class="col-md-10">
主窗口
     </div>
</div>
</div> 
</body>
<script>
	function initPage(){
		$.post("menu/menu.jsp",function(data){
		alert(data);
		var html="";
		var json=eval("("+data+")");
		var list=json.aaData;
		//alert(list.length);
		for(var i=0;i<list.length;i++){
			var menuName=list[i][1];
			var href=list[i][3]+list[i][2];
       html=html+"	<li >";
       html=html+"<a  href=\""+href+"\"><i class=\"icon_house_alt\"></i>"
       html=html+"                       <span>"+menuName+"</span>"
       html=html+"              </a>"
       html=html+"     </li>"
			//html=html+"	<ul>";
			//html=html+"		<li><h1><a href=\""+href+"\">"+menuName+"</a></h1></li>";
			//html=html+"	</ul>";
		}
		document.getElementById("ul_menu").innerHTML=html;
		
	});

}
	</script>
</html>