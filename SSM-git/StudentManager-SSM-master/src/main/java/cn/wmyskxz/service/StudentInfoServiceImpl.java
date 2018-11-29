package cn.wmyskxz.service;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletOutputStream;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.wmyskxz.dao.StudentInfoDao;
import cn.wmyskxz.entity.StudentGroup;
import cn.wmyskxz.entity.StudentInfo;

@Service(value="studentInfo")
public class StudentInfoServiceImpl implements StudentInfoService {
	 @Autowired
	 StudentInfoDao studentDao;
	public int getTotal() {
		// TODO Auto-generated method stub
		return studentDao.getTotal();
	}

	public void addStudent(StudentInfo student) {
		// TODO Auto-generated method stub
		studentDao.addStudent(student);
	}

	public void deleteStudent(int id) {
		// TODO Auto-generated method stub
		studentDao.deleteStudent(id);
	}

	public void updateStudent(StudentInfo student) {
		// TODO Auto-generated method stub
		studentDao.updateStudent(student);
	}

	public StudentInfo getStudent(int id) {
		// TODO Auto-generated method stub
		return studentDao.getStudent(id);
	}

	public List<StudentInfo> list(int start, int count) {
		// TODO Auto-generated method stub
		return studentDao.list(start, count);
	}

	public List<StudentInfo> getStudentByNo(String sno) {
		// TODO Auto-generated method stub
		return studentDao.getStudentByNo(sno);
	}

	public List<StudentInfo> getStudentByName(String sname) {
		// TODO Auto-generated method stub
		return studentDao.getStudentByName(sname);
	}



	public List<StudentInfo> getStudentByClass(int class_no) {
		// TODO Auto-generated method stub
		return studentDao.getStudentByClass(class_no);
	}

	public List<StudentInfo> listStudent() {
		// TODO Auto-generated method stub
		return studentDao.listStudent();
	}

	public void exportAls(FileInputStream fileInputStream, ServletOutputStream outputStream) {
		// TODO Auto-generated method stub
		HSSFWorkbook book = null;
		try {
			book =new HSSFWorkbook(fileInputStream);
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		 
		  // 工作表 sheet
		  HSSFSheet sheet = book.getSheetAt(0); 
		// 获取第二个sheet中的第一行第一列的样式 及边框
		  //    XSSFCellStyle cellStyle = book.getSheetAt(1).getRow(0).getCell(0).getCellStyle();
		  List<StudentInfo> list = studentDao.findAll();
		  System.out.println(list.size());
		  int rowIndex = 1; // 让表格从第二行开始导入
		HSSFCell cell = null;
		  for (StudentInfo dataProcess : list) {
		 // 新建一行
		 HSSFRow row = sheet.createRow(rowIndex);
		  cell = row.createCell(0); // 第一个单元格
		  //    设定已经准备好单元格的样式
		  //    cell.setCellStyle(cellStyle);
		  String sno = dataProcess.getSno();
		  if(sno!= null){
		  cell.setCellValue(sno);
		 }
		  
		 cell = row.createCell(1); // 第一个单元格
		  String name = dataProcess.getSname();
		if(name != null){
		  cell.setCellValue(name);
		 }
		 
		  cell = row.createCell(2); // 第二个单元格
		 String guige = dataProcess.getPhone();
		  if(guige != null){
		  cell.setCellValue(guige);
		 }
		 
		 cell = row.createCell(3); // 第三个单元格
		 Date xdata = dataProcess.getAttend_date();
		 if(xdata != null){
		 cell.setCellValue(xdata);
		  }
		 
		  cell = row.createCell(4); // 第四个单元格
		  Integer jdate = dataProcess.getAge();
		  if(jdate != null){
		  cell.setCellValue(jdate);
		  }
		 
		 /*cell = row.createCell(5); // 第五个单元格
		 89 Integer sourceCount = dataProcess.getP_sourceCount();
		 90 if(sourceCount != null){
		 91 cell.setCellValue(sourceCount);
		 92 }*/
		 cell = row.createCell(6); // 第六个单元格
		  Integer descCount = dataProcess.getClass_no();
		  if (descCount != null) {
		  cell.setCellValue(descCount);
		}
		
		  rowIndex++;
		 }
		 // 把工作簿放在输出流中
		 try {
		 book.write(outputStream);
		 } catch (IOException e) {
		 e.printStackTrace();
		 }
	}

	public List<StudentGroup> groupByYear() {
		// TODO Auto-generated method stub
		return studentDao.groupByYear();
	}

	
}
