package com.javen.controller;

import java.io.IOException;
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
import com.javen.model.TbUser;
import com.javen.service.ItemService;
import com.javen.service.UserService;
@Controller
@RequestMapping("/veigar")
public class UIController {
	@Autowired
	private ItemService itemService;
	 
	@RequestMapping("/testJson")
	@ResponseBody
	public Map<String,Object> testJson(@RequestParam int page, int rows) throws IOException {
	        /*
	         * page:第几页
	         * rows:每页多少条数据
	         * 进行count查询。第三个參数设为true
	         */
	        PageHelper.startPage(page, rows, true);
	        //执行查询所有对象
	        List<TbItem> list  = this.itemService.findAllItem();
	        //将list传入PageInfo
	        PageInfo<TbItem> info = new PageInfo(list);
	        //以下list是已经做好分页的list
	        list =info.getList();
	        //获取总数
	        long count = info.getTotal();
	        //前台接收到的json，map会自动转为json，可以在F12控制台查看
	        Map<String,Object> map = new HashMap<String,Object>();
	        map.put("total",count);
	        map.put("rows",list);
	        return map;
	    }

}
