package com.poly.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.poly.model.Quyen;
import com.poly.model.Quyen_TaiKhoan;

@Service
public interface QuyenService {

	List<Quyen> FindAll();
	 
	
}
