package com.javen.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.javen.dao.TbItemMapper;
import com.javen.model.EasyUIDataGridResult;
import com.javen.model.TbItem;
import com.javen.model.TbItemExample;
import com.javen.model.TbUser;
import com.javen.service.ItemService;
@Service(value="itemService")
public class ItemServiceImpl implements ItemService {
	@Autowired
	private TbItemMapper itemMapper;

	public TbItem findItemById(Long id) {
		// TODO Auto-generated method stub
		return itemMapper.findItemById(id);
	}

	public Integer saveItem(TbItem item) {
		// TODO Auto-generated method stub
		return itemMapper.saveItem(item);
	}

	public List<TbItem> findAllItem() {
		// TODO Auto-generated method stub
		return itemMapper.findAllItem();
	}

	


	

}
