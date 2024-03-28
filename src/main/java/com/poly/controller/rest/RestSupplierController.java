
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
import com.poly.model.NhaXuatBan;
import com.poly.model.PhanLoai;
import com.poly.service.ProductTypeService;
import com.poly.service.SupplierService;



@CrossOrigin("*")
@RestController
@RequestMapping("/rest/suppliers")
public class RestSupplierController {
	@Autowired
	SupplierService supplierService;
	
	@GetMapping
	public List<NhaXuatBan> getAll() {
		return supplierService.findAll();
	}
	@GetMapping("{id}")
	public NhaXuatBan getOne(@PathVariable("id") Integer id) {
		return supplierService.findById(id);
	}
	@PostMapping
	public NhaXuatBan post(@RequestBody NhaXuatBan nhaxuatBan) {
		supplierService.create(nhaxuatBan);
		return nhaxuatBan;
	}
	@PutMapping("{id}")
	public NhaXuatBan put(@PathVariable("id") Integer id, @RequestBody NhaXuatBan nhaXuatBan) {
		return supplierService.update(nhaXuatBan);
	}
	
}
