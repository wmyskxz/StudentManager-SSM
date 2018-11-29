<%@page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="tags" tagdir="/WEB-INF/tags" %>
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
                       <td id="startTime"></td>
                     
                        <td><a class="btn btn-info" href="/seckill/${sk.seckillId}/detail" target="_blank">详情</a></td>
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
<script>
function ArrayList(){
  	this.arr=[],
  	this.size=function(){
  		return this.arr.length;
  	},
  	this.add=function(){
  		if(arguments.length==1){
  			this.arr.push(arguments[0]);
  		}else if(arguments.length>=2){
  			var deleteItem=this.arr[arguments[0]];
  			this.arr.splice(arguments[0],1,arguments[1],deleteItem)
  		}
  		return this;
  	},
  	this.get=function(index){
  		return this.arr[index];
  	},
  	this.removeIndex=function(index){
  		this.arr.splice(index,1);
  	},
  	this.removeObj=function(obj){
  		this.removeIndex(this.indexOf(obj));
  	},
  	this.indexOf=function(obj){
  		for(var i=0;i<this.arr.length;i++){
  			if (this.arr[i]===obj) {
  				return i;
  			};
  		}
  		return -1;
  	},
  	this.isEmpty=function(){
  		return this.arr.length==0;
  	},
  	this.clear=function(){
  		this.arr=[];
  	},
  	this.contains=function(obj){
  		return this.indexOf(obj)!=-1;
  	}
 
  };
  

function initPage(){
	var woshilist =new ArrayList;
	woshilist = "${list}".replace('[','').replace(']','').split(','); 
	alert(woshilist);
	for(var i=0;i<woshilist.length;i++){
		if(i%6==3){
			var Time=changDate(woshilist[i]);
			alert(time);
			 document.getElementById("startTime").innerHTML = time;
		}
	}
		
	var start;
	var end;
	var create;
	var housePointList = [
		<c:forEach items="${list}" var="s"> 
	   {start:"${s.startTime}",
			
		end:"${s.endTime}",

		create:"${createTime}"},
		</c:forEach>
		];
	
	
		 document.getElementById("startTime").innerHTML = start;
		//alert(start);
	
}
window.onload=initPage;
</script>
</html>