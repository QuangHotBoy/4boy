package com.poly.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.dao.Quyen_TaiKhoanDAO;
import com.poly.model.Quyen_TaiKhoan;
import com.poly.model.TaiKhoan;
import com.poly.service.QuyenTKService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class QuyenTKServiceImpl implements QuyenTKService {

	@Autowired
	Quyen_TaiKhoanDAO QTKDao;
	
	@Override
	public List<Quyen_TaiKhoan> FindRoleMana() { 
		return QTKDao.findbyMana();
	}

	@Override
	public List<Quyen_TaiKhoan> FindRoleStaff() {
		return QTKDao.findbyStaff();
	}

	@Override
	public List<Quyen_TaiKhoan> FindRoleMember() {
		return QTKDao.findbyMember();
	}

	@Override
	public List<Quyen_TaiKhoan> FindAll() {
		return QTKDao.findAll();
	}

	@Override
	public Quyen_TaiKhoan save(String taiKhoan_quyen) {
		//  QTKDao.save(taiKhoan_quyen);
		return null;
	}
 

	
}
