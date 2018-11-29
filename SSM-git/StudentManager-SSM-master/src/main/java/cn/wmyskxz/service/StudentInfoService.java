package cn.wmyskxz.service;

import java.io.FileInputStream;
import java.util.List;

import javax.servlet.ServletOutputStream;

import cn.wmyskxz.entity.StudentGroup;
import cn.wmyskxz.entity.StudentInfo;

public interface StudentInfoService {
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
	    public void exportAls(FileInputStream fileInputStream, ServletOutputStream outputStream);
	    List<StudentGroup> groupByYear();
}
