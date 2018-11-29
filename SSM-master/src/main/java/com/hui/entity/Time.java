package com.hui.entity;

import java.sql.Timestamp;


public class Time {
	  private long seckillId;
	    /*  秒杀商品名字 */
	    private String name;
	    /* 秒杀的商品编号 */
	    private int number;
	    /* 开始秒杀的时间 */
	    private Timestamp startTime;
	    /* 结束秒杀的时间 */
	    private Timestamp endTime;
	    /* 创建的时间 */
	    private Timestamp createTime;
	   
		public long getSeckillId() {
			return seckillId;
		}
		public void setSeckillId(long seckillId) {
			this.seckillId = seckillId;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public int getNumber() {
			return number;
		}
		public void setNumber(int number) {
			this.number = number;
		}
		public Timestamp getStartTime() {
			return startTime;
		}
		public void setStartTime(Timestamp startTime) {
			this.startTime = startTime;
		}
		public Timestamp getEndTime() {
			return endTime;
		}
		public void setEndTime(Timestamp endTime) {
			this.endTime = endTime;
		}
		public Timestamp getCreateTIme() {
			return createTime;
		}
		public void setCreateTIme(Timestamp createTIme) {
			this.createTime = createTIme;
		}


}
