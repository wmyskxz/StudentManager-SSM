package com.javen.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.javen.model.User;
import com.javen.service.IUserService;
@Controller
public class DubboController {
	private static Logger log=LoggerFactory.getLogger( DubboController.class);
	@Autowired
	private IUserService userService;
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	 public String list(HttpServletRequest request,Model model) {
        //获取列表页
        List<User> list = userService.getListUser();
        log.debug(list.toString());
        System.out.println(list.get(0));
        model.addAttribute("user", list.get(0));
        
        //list.jsp + model = ModelAndView
        return "showUser";// /WEB-INF/jsp/"list".jsp
    }

}
