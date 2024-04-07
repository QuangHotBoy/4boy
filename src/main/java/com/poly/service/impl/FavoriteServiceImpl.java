package com.poly.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.dao.SachYeuThichDAO;
import com.poly.model.SachYeuThich;
import com.poly.service.favoritesService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FavoriteServiceImpl implements favoritesService {

	@Autowired
	SachYeuThichDAO SYTDao;
	
	@Override
	public List<SachYeuThich> getAllProduct(String tenDangNhap) { 
		return SYTDao.findByTNDSYT(tenDangNhap);
	}

}
