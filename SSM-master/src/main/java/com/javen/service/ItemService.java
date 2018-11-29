package com.javen.service;

import java.util.List;

import com.javen.model.EasyUIDataGridResult;
import com.javen.model.TbItem;
import com.javen.model.TbUser;

public interface ItemService {
	TbItem findItemById(Long id);
	 
    Integer saveItem(TbItem user);
    
    List<TbItem> findAllItem();
}
