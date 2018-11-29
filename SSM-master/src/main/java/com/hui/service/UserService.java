package com.hui.service;

import java.util.List;

import com.hui.entity.Permission;
import com.hui.entity.User;

public interface UserService {
    /**
     * 根据账号获取账号密码
     * @param username
     * @return UserPojo
     */
     User getUserByUserName(String username);

    /**
     * 根据账号获取该账号的权限
     *
     * @param user
     * @return List
     */
     List<Permission> getPermissionsByUser(User user);
   
}
