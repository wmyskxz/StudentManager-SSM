package com.javen.service;

import java.util.List;

import com.javen.model.TbUser;
import com.javen.model.User;

public interface UserService {
	TbUser findUserById(Long id);
	 
    Integer saveUser(TbUser user);
   
    List<TbUser> findAllUser();

}
