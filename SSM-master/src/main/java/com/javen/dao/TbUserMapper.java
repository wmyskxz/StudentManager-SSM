package com.javen.dao;


import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.javen.model.TbUser;
import com.javen.model.TbUserExample;

public interface TbUserMapper {
	  int countByExample(TbUserExample example);

	    int deleteByExample(TbUserExample example);

	    int deleteByPrimaryKey(Long id);

	    int insert(TbUser record);

	    int insertSelective(TbUser record);

	    List<TbUser> selectByExample(TbUserExample example);

	    TbUser selectByPrimaryKey(Long id);

	    int updateByExampleSelective(@Param("record") TbUser record, @Param("example") TbUserExample example);

	    int updateByExample(@Param("record") TbUser record, @Param("example") TbUserExample example);

	    int updateByPrimaryKeySelective(TbUser record);

	    int updateByPrimaryKey(TbUser record);
}