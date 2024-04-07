package com.poly.service.impl;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.dao.SachYeuThichDAO;
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
	
	@Override
	public List<SachYeuThich> getAllProduct(String tenDangNhap) { 
		return SYTDao.findByTNDSYT(tenDangNhap);
	}
 
	 

	@Override
	public SachYeuThich addSachYT(SanPham sanPham, TaiKhoan taiKhoan) {
		Timestamp ngayHienTai = new Timestamp(System.currentTimeMillis());
		SachYeuThich sachYeuThich = new SachYeuThich();
	    sachYeuThich.setSanPham_yeuThich(sanPham);
	    sachYeuThich.setTaiKhoan_yeuThich(taiKhoan);
	    sachYeuThich.setNgayThich(ngayHienTai);
		return SYTDao.save(sachYeuThich);
	}

}
