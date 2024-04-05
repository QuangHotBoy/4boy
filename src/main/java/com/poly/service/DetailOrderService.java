package com.poly.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.poly.model.ChiTietDonDatHang;
import com.poly.model.DonDatHang;

@Service
public interface DetailOrderService {

	List<ChiTietDonDatHang> getall(Integer maDonHang); 
	
}
