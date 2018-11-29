<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>查询数据库页面</title>
    <style>
body{

background-position: center center;

    
    /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
    background-attachment: fixed;  //此条属性必须设置否则可能无效/
    /* 让背景图基于容器大小伸缩 */
   background-size: cover;
   /* 设置背景颜色，背景图加载过程中会显示背景色 */
   background-color:	#E6E6FA;



}
</style>
 <link href="js/bootstrap/datatimepicker/bootstrap-datetimepicker.min.css" rel="stylesheet" />
 <script type="text/javascript" src="js/jquery/datatimepicker/bootstrap-datetimepicker.js"></script>
 
    　
<link href="http://cdn.bootcss.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
 <script src="js/jquery/2.0.0/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<link href="menu/main_nav.css" rel="stylesheet">
</head>
<body>
<div class="container">
  <div class="row">
    <div class="col-sm">
      <div class="panel-heading">
            <h3 class="panel-title">查询学生</h3>
        </div>
    </div>
    <div class="col-sm">
     <form role="role" method="post" action="selectByChoose">
              <div class="form-group">
               <select id="select" name="select" class="form-control"  style="height:30px;width:20%; border: 1px solid #bbb;
              border-radius: 10px  color: #41515B;"  >
                  <option selected="selected">按照学号查询</option>
                  <option>按照名字查询</option>
                  <option>按照班级号查询</option>
               </select>    
               </br>
               </br>      
              <input type="text" style="height:30px;width:50%; border: 1px solid #bbb; color: #4A515B
               border-radius: 10px;"  id="content" name="content" class="form-control" placeholder="输入关键字">
  
                </br>
                 <button type="submit" class="btn btn-success">提 交</button>
              </div>
              </form>
    </div>
    
  </div>
 

</div>
</body>
<script type="text/javascript">
$("#startTime").datetimepicker().on('changeDate', function(e){  
    $("#endTime").datetimepicker('setStartDate', e.date);  
   });  
   $("#endTime").datetimepicker().on('changeDate', function(e){  
    $("#startTime").datetimepicker('setEndDate', e.date);  
   });  

</script>
</html>