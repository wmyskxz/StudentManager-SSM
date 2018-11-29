# StudentManager_SSM

fork的版本已经搭建好SSM框架，并且使用bookstrap做前端框架，已经实现了学生列表页面、学生信息修改页面和删除功能。
而我在他的基础上：
1. 做了登陆界面，shiro的权限控制，md5加密，新增导航栏用来导航不同模块，做了新的学生入学信息模块，实现了学生信息的分页查询、增加新的学生信息、导出学生信息到excel,打印学生成绩、统计各年份学生人数变化等。

2. 用shiro对不同身份，老师、学生、管理员等做了权限限制。管理员可以查看所有页面。学生只能查看学生列表，老师能查看、导出、打印学生信息。但是不能对学生信息进行修改。

该项目需要先配置好maven，然后eclipse 中import->existing maven project 导进去
参考博客：
https://www.jianshu.com/p/a5b515be6f8b
https://www.jianshu.com/p/438d1785275b
https://www.jianshu.com/p/ba07a9b2dc47
