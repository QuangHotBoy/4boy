package com.poly.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.poly.model.PhanLoai;

@Service
public interface ProductTypeService {
	List<PhanLoai> findAll();

	PhanLoai findById(Integer id);

	// public List<PhanLoai> findByCategoryId(String cid) ;

	PhanLoai create(PhanLoai phanLoai);

	PhanLoai update(PhanLoai PhanLoai);

	void delete(Integer id);
}
