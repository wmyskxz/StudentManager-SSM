<%@page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>秒杀列表</title>

 <meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta charset="utf-8">
   <%-- 引入JQ和Bootstrap --%>
 
    <link href="bootstrap-3.3.0/css/bootstrap.min.css" rel="stylesheet">
  
<link href="bootstrap-3.3.0/css/bootstrap-theme.css" rel="stylesheet">
</head>
<body >

<div class="container">
    <div class="panel panel-default">
        <div class="panel-heading text-center">
            <h2>秒杀列表</h2>
        </div>

        <div class="panel-body">
            <table class="table table-hover">
                <thead>
                <tr>
                    <td>名称</td>
                    <td>库存</td>
                    
                    <td>开始时间</td>
                    <td>结束时间</td>
                    <td>创建时间</td>
                    <td>详情页</td>
                </tr>
                </thead>
                <tbody>
               
               
                   
                <c:forEach items="${list}" var="sk">
                 <tr>
                        <td>${sk.name}</td>
                        <td>${sk.number}</td>
  
                       <td>${sk.startTime}</td> 
                       <td>${sk.endTime}</td> 
                       <td>${sk.createTIme}</td> 
                       <td><a class="btn btn-info" href="${sk.seckillId}/detail" target="_blank">详情</a></td>
                 </tr>
                </c:forEach>
                    
             
                
                </tbody>
            </table>
        </div>
    </div>
</div>
</body>
  <script src="bootstrap-3.3.0/js/bootstrap.min.js"></script>
<script src="bootstrap-3.3.0/jquery.js"></script>

</html>