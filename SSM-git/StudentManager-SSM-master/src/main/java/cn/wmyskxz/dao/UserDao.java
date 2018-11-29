package cn.wmyskxz.dao;

import org.apache.ibatis.annotations.Select;

import cn.wmyskxz.entity.Role;
import cn.wmyskxz.entity.User;

public interface UserDao {
	@Select("select * from stu_user where username=#{username}")
	public User FindUserByName(String username) ;
	@Select("select roleid from stu_user_role where userid=#{userid} ")
	public int FindRoseIdByUser(int userid);
	@Select("select role from stu_role where id=#{roleid}")
	public String FindRole(int roleid);

}
