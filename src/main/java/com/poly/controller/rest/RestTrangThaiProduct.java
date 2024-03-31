package com.poly.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.model.NhaXuatBan;
import com.poly.model.SanPham;
import com.poly.model.TrangThaiSach;
import com.poly.service.ProductService;
import com.poly.service.TinhTrangProductService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/tinhtrangs")
public class RestTrangThaiProduct {
    @Autowired
    TinhTrangProductService tinhTrangProductService;

    @GetMapping
    public List<TrangThaiSach> getAll() {
        return tinhTrangProductService.findAll();
    }
    @GetMapping("{id}")
	public TrangThaiSach getOne(@PathVariable("id") Integer id) {
		return tinhTrangProductService.findById(id);
	}

	@PostMapping
	public TrangThaiSach post(@RequestBody TrangThaiSach trangThaiSach) {
		tinhTrangProductService.create(trangThaiSach);
		return trangThaiSach;
	}

	
}
