package com.javen.dao;

import java.util.List;

import com.javen.model.User;


public interface IUserDao {
    int deleteByPrimaryKey(Integer id);

    int insert(User record);
    public List<User> getListUser();

    int insertSelective(User record);

    User selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
}