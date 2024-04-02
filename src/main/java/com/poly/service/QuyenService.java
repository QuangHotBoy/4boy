package com.poly.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.poly.model.Quyen;

@Service
public interface QuyenService {

	List<Quyen> FindAll();
	
}
