package com.poly.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.poly.model.NhaXuatBan;

@Service
public interface SupplierService {
    List<NhaXuatBan> findAll();

	NhaXuatBan findById(Integer id);

	// public List<PhanLoai> findByCategoryId(String cid) ;

	NhaXuatBan create(NhaXuatBan nhaXuatBan);

	NhaXuatBan update(NhaXuatBan nhaXuatBan);

	
}
