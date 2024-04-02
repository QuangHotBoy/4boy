package com.poly.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.model.Quyen_TaiKhoan;
import com.poly.service.QuyenTKService;

@CrossOrigin("*")
@RestController
public class QuyenTKRestController {

	@Autowired
	QuyenTKService QTKService;
	
	@GetMapping("/qtk/getmana")
	List<Quyen_TaiKhoan> getMana(){
		return QTKService.FindRoleMana();
	}

	@GetMapping("/qtk/getstaff")
	List<Quyen_TaiKhoan> getstaff(){
		return QTKService.FindRoleStaff();
	}

	@GetMapping("/qtk/getmember")
	List<Quyen_TaiKhoan> getmember(){
		return QTKService.FindRoleMember();
	}
	
	
}
