package com.javen.controller;

import java.util.ArrayList;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import com.javen.model.TbItem;

import com.javen.service.ItemService;

@Controller
public class ItemController {
	@Autowired
	private ItemService itemService;
	
	@RequestMapping("/item/list")
	@ResponseBody
	
    public Map<String,Object> getAllItem(@RequestParam(required = false, defaultValue = "2") int startPage,
    		@RequestParam(required = false, defaultValue = "10")int PageSize) {
        PageHelper.startPage(startPage, PageSize,true);
        List<TbItem> users = new ArrayList<TbItem>();
        users =itemService.findAllItem();
        PageInfo<TbItem> pi = new PageInfo<TbItem>(users);
        users =pi.getList();
        //获取总数
        long count =pi.getTotal();
        //前台接收到的json，map会自动转为json，可以在F12控制台查看
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("total",count);
        map.put("rows",users);
        return map;
    }
}
