package cn.wmyskxz.controller;

import java.io.File;
import java.io.FileInputStream;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;


import cn.wmyskxz.entity.Student;
import cn.wmyskxz.entity.StudentInfo;
import cn.wmyskxz.service.StudentInfoService;
import cn.wmyskxz.util.FileUtils;
import cn.wmyskxz.util.Page;

@Controller
@RequestMapping("")
public class StudentInfoController {
	@Autowired
	StudentInfoService studentInfo;
	
	@RequestMapping("/exportExcel")
	public void exportExcel(HttpServletRequest request,HttpServletResponse response) throws Exception{
		response.setContentType("application/vnd.ms-excel"); // 常见的文件 可以省略
		
		// 文件的打开方式 inline在线打开 attachment
		 String agent = request.getHeader("User-Agent");
		 String filename = FileUtils.encodeDownloadFilename("data.xls", agent);
		 response.setHeader("content-disposition", "attachment;fileName="+filename);
		 ServletOutputStream outputStream = response.getOutputStream();
		 
		 // 获取模板 在当前项目
		 ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
		 String templatePath = request.getSession().getServletContext().getRealPath("/")+"/temp"+File.separator+"data.xls";
		 System.out.println(templatePath);
		 FileInputStream fileInputStream = new FileInputStream(templatePath);
		 
		 studentInfo.exportAls(fileInputStream, outputStream);
		
	}
	
	@RequestMapping("/printStudentInfo")
	public ModelAndView printStudent(HttpServletRequest request,HttpServletResponse response) {
		
		List<StudentInfo>info=new ArrayList<StudentInfo>();
		info=studentInfo.listStudent();
		ModelAndView mav = new ModelAndView("printInfo");
	       
	       mav.addObject("studentList", info);
	        return mav;
	}
	
	@RequestMapping("/selectByChoose")
	public ModelAndView selectChoose(HttpServletRequest request,HttpServletResponse response) {
		String select=request.getParameter("select");
		String text=request.getParameter("content");
		List<StudentInfo> info=new ArrayList<StudentInfo>();
		if(select.equals("按照学号查询")) {
			info=studentInfo.getStudentByNo(text);
		}
		else if(select.equals("按照名字查询")) {
			info=studentInfo.getStudentByName(text);
		}
		else if(select.equals("按照班级号查询")) {
			info=studentInfo.getStudentByClass(Integer.parseInt(text));
		}
		
		 ModelAndView mav = new ModelAndView("resultView");
	       
	       mav.addObject("studentResult", info);
	        return mav;
	}
	
	 @RequestMapping("/listStudentInfo")
	    public String listStudent(HttpServletRequest request, HttpServletResponse response) {

	        // 获取分页参数
	        int start = 0;
	        int count = 10;

	        try {
	            start = Integer.parseInt(request.getParameter("page.start"));
	            count = Integer.parseInt(request.getParameter("page.count"));
	        } catch (Exception e) {
	        }

	        Page page = new Page(start, count);

	        List<StudentInfo> students = studentInfo.list(page.getStart(), page.getCount());
	        int total = studentInfo.getTotal();
	        page.setTotal(total);

	        request.setAttribute("students", students);
	        request.setAttribute("page", page);

	        return "listStudentInfo";
	    }
	@RequestMapping("/addStudentInfo")
	public String addStudentInfo(HttpServletRequest request,HttpServletResponse response) {
		StudentInfo info=new StudentInfo();
		info.setAge(Integer.parseInt(request.getParameter("age")));
		info.setSno(request.getParameter("sno"));
		info.setSname(request.getParameter("sname"));
		info.setClass_no(Integer.parseInt(request.getParameter("class_no")));
		info.setSex(request.getParameter("sex"));
		info.setPhone(request.getParameter("phone"));
		Date birthDate=null;
		Date attendDate=null;
		 SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
	        try {
	            birthDate = simpleDateFormat.parse(request.getParameter("birth_date"));
	            
	            attendDate=simpleDateFormat.parse(request.getParameter("attend_date"));
	        } catch (ParseException e) {
	            e.printStackTrace();
	        }
	        info.setAttend_date(attendDate);
	        info.setBirth_date(birthDate);
	        studentInfo.addStudent(info);
	        return "redirect:listStudentInfo";
	}
	  @RequestMapping("/deleteStudentInfo")
	    public String deleteStudent(int id) {
	        studentInfo.deleteStudent(id);
	        return "redirect:listStudentInfo";
	    }

	    @RequestMapping("/editStudentInfo")
	    public ModelAndView editStudent(int id) {
	        ModelAndView mav = new ModelAndView("editStudentInfo");
	        StudentInfo student = studentInfo.getStudent(id);
	        mav.addObject("studentinfo", student);
	        return mav;
	    }

	    @RequestMapping("/updateStudentInfo")
	    public String updateStudent(HttpServletRequest request, HttpServletResponse response) {

	    	StudentInfo info=new StudentInfo();
	    	info.setId(Integer.parseInt(request.getParameter("id")));
			info.setAge(Integer.parseInt(request.getParameter("age")));
			info.setSno(request.getParameter("sno"));
			info.setSname(request.getParameter("sname"));
			info.setClass_no(Integer.parseInt(request.getParameter("class_no")));
			info.setSex(request.getParameter("sex"));
			info.setPhone(request.getParameter("phone"));
			Date birthDate=null;
			Date attendDate=null;
			 SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		        try {
		            birthDate = simpleDateFormat.parse(request.getParameter("birth_date"));
		            attendDate=simpleDateFormat.parse(request.getParameter("attend_date"));
		        } catch (ParseException e) {
		            e.printStackTrace();
		        }
		        info.setAttend_date(attendDate);
		        info.setBirth_date(birthDate);
             System.out.println(info);
	        studentInfo.updateStudent(info);
	        return "redirect:listStudentInfo";
	    }

}
