package com.javen.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import com.javen.model.TbUser;

public interface UserMapper {
	  @Select("select * from tb_user where id = #{id}")
	    TbUser findUserById(Long id);
	 
	    @Insert("insert into tb_user(userName, birth) values(#{userName}, #{birth})")
	    @Options(useGeneratedKeys = true, keyProperty = "id")
	    public Integer saveUser(TbUser user);
	    
	    @Select("select * from tb_user")
	public List<TbUser> findAllUser();
}
