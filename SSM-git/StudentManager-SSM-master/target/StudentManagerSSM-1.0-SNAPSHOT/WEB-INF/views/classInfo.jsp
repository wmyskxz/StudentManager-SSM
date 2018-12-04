<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<%-- 引入JQ和Bootstrap --%>
<script src="js/jquery/2.0.0/jquery.min.js"></script>
<link href="css/bootstrap/3.3.6/bootstrap.min.css" rel="stylesheet">
<script src="js/bootstrap/3.3.6/bootstrap.min.js"></script>
<link href="css/style.css" rel="stylesheet">
<link href="../../menu/main_nav.css" rel="stylesheet">
<title>学籍信息列表</title>
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
					<li class="active"><a href="#"> <i
							class="glyphicon glyphicon-th-large"></i> 首页
					</a></li>
					<li id="ul_menu"><a href="#systemSetting"
						class="nav-header collapsed" data-toggle="collapse"> <i
							class="glyphicon glyphicon-cog"></i> 学籍信息管理 <span
							class="pull-right glyphicon glyphicon-chevron-down"></span>
					</a>
						<ul id="systemSetting" class="nav nav-list collapse secondmenu"
							style="height: 0px;">
							<li><a href="/listStudentInfo"><i
									class="glyphicon glyphicon-user"></i>学籍列表显示和添加</a></li>
							<li><a href="/search.jsp"><i
									class="glyphicon glyphicon-th-list"></i>学生信息查询</a></li>
							<li><a href="/printStudentInfo"><i
									class="glyphicon glyphicon-asterisk"></i>打印学生成绩</a></li>
							<li><a href="/exportExcel"><i
									class="glyphicon glyphicon-edit"></i>导出excel</a></li>
							<li><a href="/groupStat"><i
									class="glyphicon glyphicon-edit"></i>统计页面</a></li>
						</ul></li>
					<li id="ul_menu"><a href="#systemSetting1"
						class="nav-header collapsed" data-toggle="collapse"> <i
							class="glyphicon glyphicon-cog"></i>班级信息管理 <span
							class="pull-right glyphicon glyphicon-chevron-down"></span></a>
						<ul id="systemSetting1" class="nav nav-list collapse secondmenu"
							style="height: 0px;">
							<li><a href="/classinfo"><i
									class="glyphicon glyphicon-user"></i>班级信息显示</a></li>
							<li><a href="#"><i class="glyphicon glyphicon-th-list"></i>查询班级</a></li>
							<li><a href="#"><i class="glyphicon glyphicon-asterisk"></i>导出班级名单</a></li>
						</ul></li>
					<li id="ul_menu"><a href="#systemSetting2"
						class="nav-header collapsed" data-toggle="collapse"> <i
							class="glyphicon glyphicon-globe"></i>课程管理模块<span
							class="label label-warning pull-right">5</span></a>
						<ul id="systemSetting2" class="nav nav-list collapse secondmenu"
							style="height: 0px;">
							<li><a href="#"><i class="glyphicon glyphicon-user"></i>课程信息显示</a></li>
							<li><a href="#"><i class="glyphicon glyphicon-th-list"></i>查询课程</a></li>
							<li><a href="#"><i class="glyphicon glyphicon-asterisk"></i>导打印学生成绩</a></li>
						</ul></li>
					<li id="ul_menu"><a href="./charts.html"><i
							class="glyphicon glyphicon-calendar"></i>修改密码</a></li>
					<li><a href="#"><i class="glyphicon glyphicon-fire"></i>关于系统</a>
					</li>
				</ul>
			</div>
			<div class="col-md-10">

				<table
					class="table table-striped table-bordered table-hover table-condensed">

					<caption>学生列表 - 共${page.total}人</caption>
					<thead>
						<tr class="success">
							<th>班级号</th>
							<th>学生数</th>
							<th>班主任</th>

							<th>编辑</th>
							<th>删除</th>
						</tr>
					</thead>


					<tbody>
						<c:forEach items="${classes}" var="c" varStatus="status">
							<tr>
								<td>${c.cno}</td>
								<td>${c.snum}</td>
								<td>${c.head}</td>


								<td><a href="/editStudentInfo?id=${s.id}"><span
										class="glyphicon glyphicon-edit"></span> </a></td>
								<td><a href="/deleteStudentInfo?id=${s.id}"
									onclick="javascript:return del();"><span
										class="glyphicon glyphicon-trash"></span> </a></td>
							</tr>
						</c:forEach>
					</tbody>
				</table>

				<nav class="pageDIV">
					<ul class="pagination">
						<li <c:if test="${!page.hasPreviouse}">class="disabled"</c:if>>
							<a href="?page.start=0"> <span>«</span>
						</a>
						</li>

						<li <c:if test="${!page.hasPreviouse}">class="disabled"</c:if>>
							<a href="?page.start=${page.start-page.count}"> <span>‹</span>
						</a>
						</li>

						<c:forEach begin="0" end="${page.totalPage}" varStatus="status">

							<c:if
								test="${status.count*page.count-page.start<=30 && status.count*page.count-page.start>=-10}">
								<li
									<c:if test="${status.index*page.count==page.start}">class="disabled"</c:if>>
									<a href="?page.start=${status.index*page.count}"
									<c:if test="${status.index*page.count==page.start}">class="current"</c:if>>${status.count}</a>
								</li>
							</c:if>
						</c:forEach>

						<li <c:if test="${!page.hasNext}">class="disabled"</c:if>><a
							href="?page.start=${page.start+page.count}"> <span>›</span>
						</a></li>
						<li <c:if test="${!page.hasNext}">class="disabled"</c:if>><a
							href="?page.start=${page.last}"> <span>»</span>
						</a></li>
					</ul>
				</nav>
</html>