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

            <form method="post" id="editForm" action="/updateStudentInfo" role="form">
                <table class="editTable">
                    <tr>
                        <td>学号：</td>
                        <td><input type="text" name="sno" id="sno" value="${studentinfo.sno}"
                                   placeholder="请在这里输入学号"></td>
                    </tr>
                    <tr>
                        <td>姓名：</td>
                        <td><input type="text" name="sname" id="sname" value="${studentinfo.sname}" placeholder="请在这里输入名字">
                        </td>
                    </tr>
                    <tr>
                        <td>年龄：</td>
                        <td><input type="text" name="age" id="age" value="${studentinfo.age}" placeholder="请在这里输入年龄"></td>
                    </tr>
                     <tr>
                        <td>班号：</td>
                        <td><input type="text" name="class_no" id="class_no" value="${studentinfo.class_no}" placeholder="请在这里输入班级号"></td>
                    </tr>
                      <tr>
                        <td>电话号码：</td>
                        <td><input type="text" name="phone" id="phone" value="${studentinfo.phone}" placeholder="请在这里输入班电话号"></td>
                    </tr>
                    <tr>
                        <td>性别：</td>
                        <td><input type="radio" <c:if test="${studentinfo.sex == '男'}">checked</c:if> class="radio radio-inline" name="sex" value="男"> 男
                            <input type="radio" <c:if test="${studentinfo.sex == '女'}">checked</c:if> class="radio radio-inline" name="sex" value="女"> 女
                        </td>
                    </tr>
                    <tr>
                        <td>出生日期：</td>
                        <td><input type="date" name="birth_date" id="birth_date" value="${studentinfo.birth_date}"
                                   placeholder="请在这里输入出生日期"></td>
                    </tr>
                     <tr>
                        <td>入学日期：</td>
                        <td><input type="date" name="attend_date" id="attend_date" value="${studentinfo.attend_date}"
                                   placeholder="请在这里输入入学日期"></td>
                    </tr>
                    <tr class="submitTR">
                        <td colspan="2" align="center">
                            <input type="hidden" name="id" value="${studentinfo.id}">
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
            
                if (!checkEmpty("sno", "学号"))
                    return false;
                if (!checkEmpty("sname", "姓名"))
                    return false;
                if (!checkEmpty("attend_date", "年龄"))
                    return false;
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