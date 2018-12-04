package cn.wmyskxz.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.wmyskxz.dao.ClassInfoDao;
import cn.wmyskxz.entity.ClassInfo;
import cn.wmyskxz.entity.StudentInfo;

@Service()
public class ClassInfoServiceImpl implements ClassInfoService {

	@Autowired
	private ClassInfoDao classInfoDao;
	
	public List<ClassInfo> showClassInfo() {
		List<ClassInfo> list = classInfoDao.showClassInfo();
		return list;
	}

	public ClassInfo findClassByNo(int cno) {
		ClassInfo info = classInfoDao.findClassByNo(cno);
		return info;
	}

	public ClassInfo getClass(int cno) {
		
		return classInfoDao.getClass(cno);
	}

	public void updateClass(ClassInfo classes) {

		classInfoDao.updateClass(classes);
	}

}
