package com.javen.service.impl;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.dubbo.common.logger.Logger;
import com.alibaba.dubbo.common.logger.LoggerFactory;
import com.javen.dao.UserMapper;
import com.javen.model.TbUser;
import com.javen.model.User;
import com.javen.service.UserService;

@Service(value = "userServic")
public class UserServiceImp implements UserService {
	  private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private UserMapper userMapper;

	public TbUser findUserById(Long id) {
		// TODO Auto-generated method stub
		return userMapper.findUserById(id);
	}

	public Integer saveUser(TbUser user) {
		// TODO Auto-generated method stub
		return userMapper.saveUser(user);
	}

	public List<TbUser> findAllUser() {
		// TODO Auto-generated method stub
		return userMapper.findAllUser();
	}



 
 
}

