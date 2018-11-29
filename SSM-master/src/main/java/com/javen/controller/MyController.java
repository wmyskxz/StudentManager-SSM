package com.javen.controller;

import java.util.ArrayList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.javen.model.TbUser;
import com.javen.service.UserService;

@Controller
public class MyController {
	@Autowired
   private UserService userServic;
 
    @RequestMapping("/insertUser")
    @ResponseBody
    public TbUser insertUser(TbUser user) {
        userServic.saveUser(user);
        TbUser resultUser = userServic.findUserById(user.getId());
        return resultUser;
    }
 
    @RequestMapping("/getAllUser")
    @ResponseBody
    public List<TbUser> getAllUser(@RequestParam(required = false, defaultValue = "1") Integer startPage,
            @RequestParam(required = false, defaultValue = "5") Integer PageSize) {
        PageHelper.startPage(startPage, PageSize);
        List<TbUser> users = new ArrayList<TbUser>();
        users = userServic.findAllUser();
        PageInfo<TbUser> pi = new PageInfo<TbUser>(users);
        return users;
    }

}
