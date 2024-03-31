package com.poly.service;

import java.util.List;


import com.poly.model.TrangThaiSach;

public interface TinhTrangProductService {
    List<TrangThaiSach> findAll();
    TrangThaiSach findById(Integer id);

	// public List<PhanLoai> findByCategoryId(String cid) ;

	TrangThaiSach create(TrangThaiSach trangThaiSach);

	TrangThaiSach update(TrangThaiSach trangThaiSach);
}
