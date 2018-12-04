package cn.wmyskxz.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import cn.wmyskxz.entity.ClassInfo;
import cn.wmyskxz.entity.StudentInfo;
import cn.wmyskxz.service.ClassInfoService;

@Controller
public class ClassController {
	@Autowired
	private ClassInfoService classInfoService;
	
	/**
	 * 班级信息显示
	 * @return
	 */

	@RequestMapping("/classinfo")
	public String classInfo(HttpServletRequest request, HttpServletResponse response) {
		List<ClassInfo> classes = classInfoService.showClassInfo();
		
		 request.setAttribute("classes", classes);
		 
		 for(int i=0;i< classes.size();i++) {
			 System.out.println(classes.get(i));
		 }
		 
		return "classinfo";
	}
	//编辑班级信息
	@RequestMapping("/editClassInfo")
    public ModelAndView editStudent(int id) {
        ModelAndView mav = new ModelAndView("editClassInfo");
        ClassInfo classes = classInfoService.getClass(id);
        mav.addObject("classinfo", classes);
        return mav;
    }
	
	@RequestMapping("/updateClassInfo")
    public String updateStudent(HttpServletRequest request, HttpServletResponse response) {

		ClassInfo info = new ClassInfo();
		info.setcno(Integer.parseInt(request.getParameter("cno")));
		info.setHead(request.getParameter("head"));
		
    	
        classInfoService.updateClass(info);
        return "redirect:classinfo";
    }

}
