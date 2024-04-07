package com.poly.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.poly.model.SachYeuThich;

@Service
public interface favoritesService {

	List<SachYeuThich> getAllProduct(String tenDangNhap);
	
}
