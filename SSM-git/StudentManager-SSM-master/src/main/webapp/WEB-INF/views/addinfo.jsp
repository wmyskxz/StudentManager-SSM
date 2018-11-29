<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>增加学生信息</title>

    <style>
    .midbox{

    text-align: center; /*让div内部文字居中*/
   
    border-radius: 20px;
    
    width: 350px;
    height: 450px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
   background-color:	#E6E6FA;
}
body{

background-position: center center;

    
    /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
    background-attachment: fixed;  //此条属性必须设置否则可能无效/
    /* 让背景图基于容器大小伸缩 */
   background-size: cover;
   /* 设置背景颜色，背景图加载过程中会显示背景色 */




}
</style>
</head>
<body>
<div class="midbox">
<div class="navbar navbar-duomi navbar-static-top" role="navigation">
  <div class="container-fluid">
     <div class="navbar-header">
       <a class="navbar-brand" href="/Admin/index.html" id="logo">学籍管理系统</a>
     </div>
  </div>
 </div>
<div class="container-fluid">
       <div class="row">
         
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
</div>
</body>
</html>