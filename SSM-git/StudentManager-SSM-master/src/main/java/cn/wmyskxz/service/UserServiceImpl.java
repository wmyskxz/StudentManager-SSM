package cn.wmyskxz.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.wmyskxz.dao.UserDao;
import cn.wmyskxz.entity.User;
@Service("userService")
public class UserServiceImpl implements UserService{
@Autowired
private UserDao userdao;
	public User findByName(String principal) {
		// TODO Auto-generated method stub
		return userdao.FindUserByName(principal);
	}

	public String getRoleByName(String userName) {
		// TODO Auto-generated method stub
		User user=userdao.FindUserByName(userName);
		int userid=user.getId();
		int roleid=userdao.FindRoseIdByUser(userid);
		return userdao.FindRole(roleid);
		
	}

}
