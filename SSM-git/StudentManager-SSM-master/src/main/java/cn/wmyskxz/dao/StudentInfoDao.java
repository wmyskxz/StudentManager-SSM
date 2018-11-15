package cn.wmyskxz.dao;

import java.util.List;
import cn.wmyskxz.entity.StudentInfo;

public interface StudentInfoDao {
	    int getTotal();
	    void addStudent(StudentInfo student);
	    void deleteStudent(int id);
	    void updateStudent(StudentInfo student);
	    StudentInfo getStudent(int id);
	    List<StudentInfo> list(int start, int count);
	    List<StudentInfo> getStudentByNo(String sno);
	    List<StudentInfo> getStudentByName(String sname);
	    List<StudentInfo> getStudentByClass(int class_no);
	    List<StudentInfo> listStudent();
	    List<StudentInfo> findAll();
}
