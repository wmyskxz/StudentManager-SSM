<%@page contentType="text/html; charset=UTF-8" language="java"
	import="java.text.*,org.json.JSONObject,java.util.ArrayList,java.io.PrintWriter"
	import="java.util.HashMap,java.util.List,java.sql.*,java.util.Map,java.io.IOException"%>
<%
	//说明：本例子需要引入json.jar包和jdbc包，拷贝到Tomcat的common/lib下重启Tomcat或者应用的WEB-INF/lib下
	
	String userId=request.getParameter("user_id");
	//String FildName=request.getParameter("fild_name");
	//String LinkId=request.getParameter("fild_link");
//String Path=request.getParameter("path");
	String action="action";
	System.out.println("获得的参数是：action="+action);
	//开始查询数据库
	List<List<String>> jsonList = new ArrayList<List<String>>();
	try {
		Class.forName("com.mysql.jdbc.Driver");
	} catch (ClassNotFoundException classnotfoundexception) {
		classnotfoundexception.printStackTrace();
	}
	try {
		Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/data?user=huihui&password=123456&useUnicode=true&characterEncoding=UTF-8");
		Statement statement = conn.createStatement();
		System.out.println("连接数据库Ok！！！");
		//构造sql语句，根据传递过来的查询条件参数，
		String sql="select * from osg_tree  order by fild_id";
		System.out.println("构造出来的sql语句是："+sql);
		ResultSet rs = statement.executeQuery(sql);
		while (rs.next()) {
			//Map map = new HashMap();
			//map.put("id",rs.getString("id"));
			//map.put("FildName",rs.getString("fild_name"));
			//map.put("LinkId",rs.getString("fild_link"));
			//map.put("Path",rs.getString("path"));
			
			//jsonList.add(map);
	List<String> list=new ArrayList<String>();
	list.add(rs.getString("id"));
	list.add(rs.getString("fild_name"));
	list.add(rs.getString("fild_link"));

	list.add(rs.getString("path"));
	jsonList.add(list);
		}
		statement.close();
		conn.close();
		System.out.println("数据库关闭了！！！");
	} catch (SQLException sqlexception) {
		sqlexception.printStackTrace();
	}
	//////////数据库查询完毕，得到了json数组jsonList//////////
	//下面开始构建返回的json
	JSONObject json=new JSONObject();
	json.put("aaData",jsonList);
	json.put("action",action);
	json.put("result_msg","ok");	//如果发生错误就设置成"error"等
	json.put("result_code",0);	//返回0表示正常，不等于0就表示有错误产生，错误代码
	System.out.println("最后构造得到的json是："+json.toString());
	response.setContentType("text/html; charset=UTF-8");
	try {
		
		response.getWriter().flush();
		response.getWriter().close();
	} catch (IOException e) {
		e.printStackTrace();
	}
	System.out.println("返回结果给调用页面了。");
%>