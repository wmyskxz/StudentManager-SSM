package com.javen.service;  

import java.util.List;

import com.javen.model.User;
  
  
public interface IUserService {  
    public User getUserById(int userId);  
    public List<User> getListUser();
}  