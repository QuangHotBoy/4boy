package com.poly.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
 
import com.poly.model.TaiKhoan;
import com.poly.service.AccountService;


@CrossOrigin("*")
@RestController
public class AccountRestController {

	@Autowired
	AccountService AccountService;
	
	@GetMapping("/rest/account/super")
	List<TaiKhoan> getSuper(){
		return AccountService.FindAll();
	} 

	@GetMapping("/rest/account/editmember/{tenDangNhap}")
	TaiKhoan editmember(@PathVariable("tenDangNhap") String tenDangNhap){
		return AccountService.FindById(tenDangNhap);
	} 

	@PutMapping("/rest/account/updatemember/{tenDangNhap}")
	public TaiKhoan putMember(@PathVariable("tenDangNhap") String tenDangNhap,@RequestBody TaiKhoan taiKhoan){
		return AccountService.update(taiKhoan);
	}

	@GetMapping("/rest/account/editstaff/{tenDangNhap}")
	TaiKhoan editstaff(@PathVariable("tenDangNhap") String tenDangNhap){
		return AccountService.FindById(tenDangNhap);
	} 

	@PutMapping("/rest/account/updatestaff/{tenDangNhap}")
	public TaiKhoan putStaff(@PathVariable("tenDangNhap") String tenDangNhap,@RequestBody TaiKhoan taiKhoan){
		return AccountService.update(taiKhoan);
	}

	
}
