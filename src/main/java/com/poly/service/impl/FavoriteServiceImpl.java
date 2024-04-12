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

		SachYeuThich kiemtraSach = SYTDao.findByProductAndAccount(isbn, taiKhoan);
		if (kiemtraSach == null) {
			sachYeuThich.setSanPham_yeuThich(product);
			sachYeuThich.setTaiKhoan_yeuThich(account);
			sachYeuThich.setNgayThich(ngayHienTai);
			SYTDao.save(sachYeuThich);
		} else {
			sachYeuThich.setSanPham_yeuThich(product);
			sachYeuThich.setTaiKhoan_yeuThich(account);
			sachYeuThich.setNgayThich(ngayHienTai); 
			SYTDao.delete(kiemtraSach);
			SYTDao.save(sachYeuThich);
		}
		return sachYeuThich;

	}

	@Override
	public SachYeuThich deleteSach(String taiKhoan, Long isbn) {
		SanPham product = productDAO.findById(isbn).get();
		TaiKhoan account = accountDAO.findByTenDangNhap(taiKhoan);
		SachYeuThich sachYeuThich = SYTDao.findByProductAndAccount(isbn, taiKhoan);
		System.out.println(sachYeuThich);
		SYTDao.delete(sachYeuThich);
		return sachYeuThich;
	}

}
