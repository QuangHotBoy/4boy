package com.poly.controller.rest;

import org.springframework.web.bind.annotation.RestController;

import com.poly.model.MaGiamGia;
import com.poly.service.VoucherService;

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
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin("*") 
@RestController
@RequestMapping("/rest/vouchers")
public class RestVoucherController {
    @Autowired
    VoucherService voucherService;

    @GetMapping()
    public List<MaGiamGia> getAll() {
        return voucherService.findAll();
    }

	@GetMapping("{id}")
	public MaGiamGia getOne(@PathVariable("id") String id) {
		return voucherService.findById(id);
	}
	@PostMapping
	public MaGiamGia post(@RequestBody MaGiamGia maGiamGia) {
		voucherService.create(maGiamGia);
		return maGiamGia;
	}
	@PutMapping("{id}")
	public MaGiamGia put(@PathVariable("id") Integer id, @RequestBody MaGiamGia maGiamGia) {
		return voucherService.update(maGiamGia);
	}
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") String id) {
		voucherService.delete(id);
	}
	@GetMapping("/search")
	public MaGiamGia getByCode(@RequestParam("tenMa") String tenMa) {
		return voucherService.findByTenMa(tenMa);
	}
    
}
