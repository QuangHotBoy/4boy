package com.poly.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.poly.model.SanPham;
import com.poly.model.TrangThaiSach;



@Service
public interface ProductService {
    List<SanPham> findAll();

	

	SanPham findById(Long isbn);

	// public List<PhanLoai> findByCategoryId(String cid) ;

	SanPham create(SanPham sanPham);

	SanPham update(SanPham sanPham);
}
