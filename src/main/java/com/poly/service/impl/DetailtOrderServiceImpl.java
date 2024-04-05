package com.poly.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.dao.ChiTietDonDatHangDAO;
import com.poly.model.ChiTietDonDatHang;
import com.poly.model.DonDatHang;
import com.poly.service.DetailOrderService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DetailtOrderServiceImpl implements DetailOrderService {

	
	@Autowired
	ChiTietDonDatHangDAO CTDDHDao;
	
	  
	@Override
	public List<ChiTietDonDatHang> getall(Integer maDonHang) { 
		return CTDDHDao.findByMaDonDatHang(maDonHang);
	}

	 

}
