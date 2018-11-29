package cn.wmyskxz.service;

import cn.wmyskxz.entity.User;

public interface UserService {



	User findByName(String principal);

	String getRoleByName(String userName);
	

}
