<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
 <script src="js/jquery/2.0.0/jquery.min.js"></script>
    <link href="css/bootstrap/3.3.6/bootstrap.min.css" rel="stylesheet">
    <script src="js/bootstrap/3.3.6/bootstrap.min.js"></script>
    <link href="css/style.css" rel="stylesheet">

    <title>学生管理页面 - 编辑页面</title>
</head>
<body>
<div class="editDIV">

    <div class="panel panel-success">
        <div class="panel-heading">
            <h3 class="panel-title">编辑学生</h3>
        </div>
        <div class="panel-body">

            <form method="post" id="editForm" action="/updateClassInfo" role="form">
                <table class="editTable">
                   <%--  <tr>
                        <td>班级号：</td>
                        <td><input type="text" name="cno" id="cno" value="${classinfo.cno}"
                                   placeholder="请在这里输入班级号"></td>
                                <td><input type="hidden" name="cno_old" id="cno_old" value="${classinfo.cno}"
                                   placeholder="请在这里输入班级号"></td>     
                   </tr> --%>
                    <tr>
                        <td>班主任：</td>
                        <td><input type="text" name="head" id="head" value="${classinfo.head}" placeholder="请在这里输入名字">
                        </td>
                    </tr>
             
                
                 <%--    <tr>
                        <td>成立日期：</td>
                        <td><input type="date" name="birth_date" id="birth_date" value="${studentinfo.birth_date}"
                                   placeholder="请在这里输入出生日期"></td>
                 	</tr> --%>
                    <tr class="submitTR">
                        <td colspan="2" align="center">
                            <input type="hidden" name="cno" value="${classinfo.cno}">
                            <button type="submit" class="btn btn-success">提 交</button>
                        </td>

                    </tr>

                </table>
            </form>
        </div>
    </div>

</div>

</body>
 <script>
        $(function () {
            $("#editForm").submit(function () {
            
                if (!checkEmpty("cno", "班号"))
                    return false;
                if (!checkEmpty("head", "班主任"))
                    return false;
                /* if (!checkEmpty("attend_date", "年龄"))
                    return false; */
                return true;
            });
        });
        function checkEmpty(id, name) {
            var value = $("#" + id).val();
            if (value.length == 0) {
                alert(name + "不能为空");
                $("#" + id).focus();
                return false;
            }
            return true;
        }
    </script>
</html>