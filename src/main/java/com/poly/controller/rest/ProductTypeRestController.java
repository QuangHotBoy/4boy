
package com.poly.controller.rest;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.dao.PhanLoaiDAO;
import com.poly.model.PhanLoai;
import com.poly.service.ProductTypeService;



@CrossOrigin("*")
@RestController
@RequestMapping("/rest/productsType")
public class ProductTypeRestController {
	@Autowired
	ProductTypeService productTypeService;
	@Autowired
	PhanLoaiDAO plDao;
	@GetMapping
	public List<PhanLoai> getAll() {
		return productTypeService.findAll();
	}
	@GetMapping("{id}")
	public PhanLoai getOne(@PathVariable("id") Integer id) {
		return productTypeService.findById(id);
	}
	@PostMapping
	public PhanLoai post(@RequestBody PhanLoai phanLoai) {
		productTypeService.create(phanLoai);
		return phanLoai;
	}
	@PutMapping("{id}")
	public PhanLoai put(@PathVariable("id") Integer id, @RequestBody PhanLoai phanloai) {
		return productTypeService.update(phanloai);
	}
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") Integer id) {
		productTypeService.delete(id);
	}
}
