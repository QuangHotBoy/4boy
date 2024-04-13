package com.poly.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.dao.QuyenDAO;
import com.poly.dao.Quyen_TaiKhoanDAO;
import com.poly.model.Quyen;
import com.poly.model.Quyen_TaiKhoan;
import com.poly.service.QuyenService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class QuyenServiceImpl implements QuyenService {

	@Autowired
	QuyenDAO QDao;
	 
	
	@Override
	public List<Quyen> FindAll() { 
		return QDao.findAll();
	}
	 

}
