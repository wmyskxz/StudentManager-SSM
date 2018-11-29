package com.hui.service;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hui.dao.UserMapper;
import com.hui.entity.Permission;
import com.hui.entity.User;


@Service("userService")
public class UserServiceImpl implements UserService{
@Autowired
UserMapper userService;




	public User getUserByUserName(String username) {
		// TODO Auto-generated method stub
		  User userByUserName = userService.getUserByUserName(username);
	        return userByUserName;
	}
	  public List<Permission> getPermissionsByUser(User user) {
	        //获取到用户角色userRole
	        List<Integer> roleId = userService.getUserRoleByUserId(user.getId());
	        List<Permission> perArrary = new ArrayList<Permission>();

	        if (roleId!=null&&roleId.size()!=0) {
	            //根据roleid获取peimission
	            for (Integer i : roleId) {
	                perArrary.addAll(userService.getPermissionsByRoleId(i));
	            }
	        }

	        System.out.println(perArrary);
	        return perArrary;
	    }

	

}
