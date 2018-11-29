package com.hui.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import com.hui.entity.Permission;
import com.hui.entity.User;
@Component
public interface UserMapper {
	 User getUserByUserName(String username);
	  List<Permission> getPermissionsByRoleId(int roleId);

	    /**
	     * 根据userId获取角色id
	     * @param id
	     * @return LIST
	     */
	    List<Integer> getUserRoleByUserId(int id);
	 

}
