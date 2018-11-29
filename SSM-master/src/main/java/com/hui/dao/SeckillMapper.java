package com.hui.dao;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hui.dto.SeckillExecution;
import com.hui.entity.Seckill;
import com.hui.entity.Time;

public interface SeckillMapper {
	
	 int reduceNumber(@Param("seckillId") long seckillId);

	  
	   Seckill queryById(@Param("seckillId") long seckillId);
	   List<Time> queryTime();
	   void killByProcedure(Map<String,Object> paramMap);
	   /**
	    * 根据一个偏移量去查询秒杀的商品列表.
	    *
	    * @param offset 偏移量
	    * @param limit  限制查询的数据个数
	    * @return 符合偏移量查出来的数据个数
	    */
	   List<Seckill> queryAll(@Param("offset") int offset, @Param("limit") int limit);
}
