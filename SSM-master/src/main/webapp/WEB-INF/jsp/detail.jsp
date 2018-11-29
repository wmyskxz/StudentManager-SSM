<%--
 Created by IntelliJ IDEA.
 User: jianrongsun
 Date: 17-5-25
 Time: 下午5:03
 To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="common/tag.jsp" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
<head>
   <title>秒杀商品详情页面</title>
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta charset="utf-8">
   <%-- 引入JQ和Bootstrap --%>
 
    <link href="/Myseckill/bootstrap-3.3.0/css/bootstrap.min.css" rel="stylesheet">
  
<link href="/Myseckill/bootstrap-3.3.0/css/bootstrap-theme.css" rel="stylesheet">
</head>
<body>
<div class="container">
   <div class="panel panel-default">
    <div class="panel-heading">
        <a>开始秒杀时间</a>
           <h1>${seckill.startTime}</h1>
       </div>
       <div class="panel-heading">
           <h1>${seckill.name}</h1>
       </div>
       
       <a>结束秒杀时间</a>
        <div class="panel-heading">
           <h1>${seckill.endTime}</h1>
       </div>
       <div class="panel-body">
           <h2 class="text-danger">
               <span class="glyphicon glyphicon-time"></span>
               <span class="glyphicon" id="seckill-box"></span>
           </h2>
       </div>
   </div>
</div>

<div id="killPhoneModal" class="modal fade">
   <div class="modal-dialog">
       <div class="modal-content">
           <div class="modal-header">
               <h3 class="modal-title text-center">
                   <span class="glyphicon glyphicon-phone"></span>秒杀电话:
               </h3>
           </div>
       </div>

       <div class="modal-body">
           <div class="row">
               <div class="col-xs-8 col-xs-offset-2">
                   <input type="text" name="killPhone" id="killPhoneKey" placeholder="填写手机号码"  value="13688385212" class="form-control">
               </div>
           </div>
       </div>

       <div class="modal-footer">
           <span id="killPhoneMessage" class="glyphicon"></span>
           <button type="button" id="killPhoneBtn" class="btn btn-success">
               <span class="glyphicon glyphicon-phone"></span>
               提交
           </button>
       </div>
   </div>
</div>
</body>

<script src="/Myseckill/bootstrap-3.3.0/jquery.js"></script>
<script src="/Myseckill/bootstrap-3.3.0/js/bootstrap.min.js"></script>
<script src="/Myseckill/bootstrap-3.3.0/jquery.cookie.min.js"></script>
<script src="/Myseckill/bootstrap-3.3.0/jquery.countdown.min.js"></script>
<script src="/Myseckill/js/seckill.js"></script>
<script type="text/javascript">
   $(function () {
       var startTimeVal = "${seckill.startTime} ";
       var endTimeVal = "${seckill.endTime} " ;
       console.log("startTimeVal========" + startTimeVal);
       console.log("endTimeVal========" + endTimeVal);
       // 传入参数
       seckill.detail.init({
           seckillId:"${seckill.seckillId}",
           startTime: startTimeVal,
           endTime: endTimeVal
       })
      
   })
</script>

</html>