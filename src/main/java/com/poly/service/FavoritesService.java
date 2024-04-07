package com.poly.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.poly.model.SachYeuThich;
import com.poly.model.SanPham;
import com.poly.model.TaiKhoan;

@Service
public interface FavoritesService {

	List<SachYeuThich> getAllProduct(String tenDangNhap);
	
	SachYeuThich addSachYT(SanPham sanPham,TaiKhoan taiKhoan);
	
}
