package com.poly.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.dao.DiaChi_TaiKhoanDAO;
import com.poly.dao.QuyenDAO;
import com.poly.dao.Quyen_TaiKhoanDAO;
import com.poly.dao.TaiKhoanDAO;
import com.poly.model.DiaChi_TaiKhoan;
import com.poly.model.Quyen;
import com.poly.model.Quyen_TaiKhoan;
import com.poly.model.TaiKhoan;
import com.poly.service.AccountService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {

	@Autowired
	TaiKhoanDAO TKDao;

	@Autowired
	Quyen_TaiKhoanDAO quyenTKDao;

	@Autowired
	QuyenDAO quyenDao;

	@Autowired
	DiaChi_TaiKhoanDAO dctkDAO;

	@Override
	public List<TaiKhoan> FindAll() {
		return TKDao.findAll();
	}

	@Override
	public TaiKhoan FindById(String tenDangNhap) {
		return TKDao.findById(tenDangNhap).get();
	}

	@Override
	public TaiKhoan create(TaiKhoan taiKhoan, String id) {
		TaiKhoan taikhoan = TKDao.save(taiKhoan);
		// them quyen
		Quyen quyen = quyenDao.findById(id).get();
		Quyen_TaiKhoan qTK = new Quyen_TaiKhoan();
		qTK.setQuyen(quyen);
		qTK.setTaiKhoan_quyen(taikhoan);
		quyenTKDao.save(qTK);
		// them dia chi
		DiaChi_TaiKhoan dctk = new DiaChi_TaiKhoan();
		dctk.setTaiKhoan_diaChi(taikhoan);
		dctk.setHoTen(taikhoan.getHoTen());
		dctk.setDiaChi("Chưa có địa chỉ");
		dctk.setSdt(taikhoan.getSdt());
		dctk.setMacDinh(true);
		dctkDAO.save(dctk);
		return null;
	}

	@Override
	public TaiKhoan update(TaiKhoan taiKhoan) {
		return TKDao.save(taiKhoan);
	}

	@Override
	public TaiKhoan updatePass(TaiKhoan taiKhoan, String matKhau) { 
		
	    taiKhoan.setMatKhau(matKhau);  
	    return TKDao.save(taiKhoan);
	}

}
