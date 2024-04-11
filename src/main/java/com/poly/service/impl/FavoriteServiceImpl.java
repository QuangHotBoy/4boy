package com.poly.service.impl;

import java.sql.Timestamp; 
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.dao.SachYeuThichDAO;
import com.poly.dao.SanPhamDAO;
import com.poly.dao.TaiKhoanDAO;
import com.poly.model.SachYeuThich;
import com.poly.model.SanPham;
import com.poly.model.TaiKhoan;
import com.poly.service.FavoritesService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FavoriteServiceImpl implements FavoritesService {

	@Autowired
	SachYeuThichDAO SYTDao;

	@Autowired
	SanPhamDAO productDAO;

	@Autowired
	TaiKhoanDAO accountDAO;
	
	@Override
	public List<SachYeuThich> getAllProduct(String tenDangNhap) { 
		return SYTDao.findByTNDSYT(tenDangNhap);
	}
 
	 

	@Override
	public SachYeuThich addSachYT(String taiKhoan, Long isbn) {
		Timestamp ngayHienTai = new Timestamp(System.currentTimeMillis());
		SachYeuThich sachYeuThich = new SachYeuThich(); 
	    
		SanPham product = productDAO.findById(isbn).get();
		TaiKhoan account = accountDAO.findByTenDangNhap(taiKhoan);

		sachYeuThich.setSanPham_yeuThich(product);
		sachYeuThich.setTaiKhoan_yeuThich(account);
		sachYeuThich.setNgayThich(ngayHienTai);

		return SYTDao.save(sachYeuThich);
	}



	 

}
