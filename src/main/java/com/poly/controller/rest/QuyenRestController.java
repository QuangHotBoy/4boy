package com.poly.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.model.Quyen;
import com.poly.service.QuyenService;

@CrossOrigin("*")
@RestController
public class QuyenRestController {

	@Autowired
	QuyenService QuyenService;
	
	@GetMapping("/admin/getquyen")
	List<Quyen> getAll(){
		return QuyenService.FindAll();
	}
	
}
