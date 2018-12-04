package cn.wmyskxz.dao;

import java.util.List;

import cn.wmyskxz.entity.ClassInfo;
import cn.wmyskxz.entity.StudentInfo;

public interface ClassInfoDao {
	
	public List<ClassInfo> showClassInfo();
	public ClassInfo findClassByNo(int cno);
	ClassInfo getClass(int cno);
	void updateClass(ClassInfo classes);

}
