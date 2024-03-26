package com.poly.service;

import java.util.List;



import com.poly.model.PhanLoai;

public interface ProductTypeService {
    public List<PhanLoai> findAll();
	
	public PhanLoai findById(Integer id) ;

	//  public List<PhanLoai> findByCategoryId(String cid) ;

	public PhanLoai create(PhanLoai phanLoai) ;

	public PhanLoai update(PhanLoai PhanLoai) ;

	public void delete(Integer id) ;
}
