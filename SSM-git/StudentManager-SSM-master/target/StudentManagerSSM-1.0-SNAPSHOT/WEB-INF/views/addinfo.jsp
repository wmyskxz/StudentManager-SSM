<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>增加学生信息</title>
</head>
<body>
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
            <li><a href="/listStudentInfo"><i class="glyphicon glyphicon-user"></i>学籍列表显示</a></li>
            <li><a href="#"><i class="glyphicon glyphicon-th-list"></i>学生信息增加</a></li>
            <li><a href="#"><i class="glyphicon glyphicon-th-list"></i>学生信息查询</a></li>
            <li><a href="#"><i class="glyphicon glyphicon-asterisk"></i>打印学生成绩</a></li>
             <li><a href="#"><i class="glyphicon glyphicon-edit"></i>导出excel</a></li>
          </ul>
          </li>
          <li id="ul_menu">
             <a href="#systemSetting1" class="nav-header collapsed" data-toggle="collapse">
             <i class="glyphicon glyphicon-cog" ></i>班级信息管理
              <span class="pull-right glyphicon glyphicon-chevron-down"></span></a>
               <ul id="systemSetting1" class="nav nav-list collapse secondmenu" style="height: 0px;">
            <li><a href="#"><i class="glyphicon glyphicon-user"></i>班级信息显示</a></li>
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
    <div class="addDIV">

    <div class="panel panel-success">
        <div class="panel-heading">
            <h3 class="panel-title">增加学生</h3>
        </div>
        <div class="panel-body">

            <form method="post" id="addForm" action="/addStudentInfo" role="form">
                <table class="addTable">
                    <tr>
                        <td>学号：</td>
                        <td><input type="text" name="sno" id="sno" placeholder="请在这里输入学号"></td>
                    </tr>
                    <tr>
                        <td>姓名：</td>
                        <td><input type="text" name="sname" id="sname" placeholder="请在这里输入名字"></td>
                    </tr>
                    <tr>
                        <td>年龄：</td>
                        <td><input type="text" name="age" id="age" placeholder="请在这里输入年龄"></td>
                    </tr>
                     <tr>
                        <td>班级号：</td>
                        <td><input type="text" name="class_no" id="class_no" placeholder="请在这里输入学生班级号"></td>
                    </tr>
                     <tr>
                        <td>电话号码：</td>
                        <td><input type="text" name="phone" id="phone" placeholder="请在这里输入电话"></td>
                    </tr>
                    <tr>
                        <td>性别：</td>
                        <td><input type="radio" checked class="radio radio-inline" name="sex" value="男"> 男
                            <input type="radio" class="radio radio-inline" name="sex" value="女"> 女
                        </td>
                    </tr>
                    <tr>
                        <td>出生日期：</td>
                        <td><input type="date" name="birth_date" id="birth_date" placeholder="请在这里输入出生日期"></td>
                    </tr>
                    <tr>
                        <td>入学日期：</td>
                        <td><input type="date" name="attend_date" id="attend_date" placeholder="请在这里输入入学日期"></td>
                    </tr>
                    <tr class="submitTR">
                        <td colspan="2" align="center">
                            <button type="submit" class="btn btn-success">提 交</button>
                        </td>

                    </tr>

                </table>
            </form>
        </div>
    </div>

</div>
</div>
</div> 
</body>
</html>