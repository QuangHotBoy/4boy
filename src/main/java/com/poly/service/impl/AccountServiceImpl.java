package com.poly.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.dao.TaiKhoanDAO;
import com.poly.model.TaiKhoan;
import com.poly.service.AccountService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {

	@Autowired
	TaiKhoanDAO TKDao;
	
	@Override
	public List<TaiKhoan> FindAll() { 
		return TKDao.findAll();
	}

	@Override
	public TaiKhoan FindById(String tenDangNhap) {
		 return TKDao.findById(tenDangNhap).get();
	}

	@Override
	public TaiKhoan create(TaiKhoan taiKhoan) {
		return TKDao.save(taiKhoan);
	}

	@Override
	public TaiKhoan update(TaiKhoan taiKhoan) { 
		return TKDao.save(taiKhoan);
	}
 
	 
}
