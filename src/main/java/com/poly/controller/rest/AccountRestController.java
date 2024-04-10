package com.poly.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.poly.dao.DiaChi_TaiKhoanDAO;
import com.poly.dao.QuyenDAO;
import com.poly.dao.Quyen_TaiKhoanDAO;
import com.poly.model.DiaChi_TaiKhoan;
import com.poly.model.Quyen;
import com.poly.model.Quyen_TaiKhoan;
import com.poly.model.TaiKhoan;
import com.poly.service.AccountService;
import com.poly.service.QuyenTKService;

import org.springframework.web.bind.annotation.PostMapping;

@CrossOrigin("*")
@RestController
public class AccountRestController {

	@Autowired
	AccountService AccountService;

	@Autowired
	QuyenTKService quyenTKService;

	@Autowired
	Quyen_TaiKhoanDAO quyenTKDao;

	@Autowired
	QuyenDAO quyenDao;

	  @Autowired
    DiaChi_TaiKhoanDAO dctkDAO;


	@GetMapping("/rest/account/super")
	List<TaiKhoan> getSuper() {
		return AccountService.FindAll();
	}

	@GetMapping("/rest/account/editmember/{tenDangNhap}")
	TaiKhoan editmember(@PathVariable("tenDangNhap") String tenDangNhap) {
		return AccountService.FindById(tenDangNhap);
	}

	@PutMapping("/rest/account/updatemember/{tenDangNhap}")
	public TaiKhoan putMember(@PathVariable("tenDangNhap") String tenDangNhap, @RequestBody TaiKhoan taiKhoan) {
		return AccountService.update(taiKhoan);
	}

	@GetMapping("/rest/account/editstaff/{tenDangNhap}")
	TaiKhoan editstaff(@PathVariable("tenDangNhap") String tenDangNhap) {
		return AccountService.FindById(tenDangNhap);
	}

	@PutMapping("/rest/account/updatestaff/{tenDangNhap}")
	public TaiKhoan putStaff(@PathVariable("tenDangNhap") String tenDangNhap, @RequestBody TaiKhoan taiKhoan) {
		return AccountService.update(taiKhoan);
	}

	@PostMapping("/rest/account/addmember")
	public TaiKhoan postMember(@RequestBody TaiKhoan taikhoan) {
		AccountService.create(taikhoan, "CUST");
		return null;
	}

	@PostMapping("/rest/register")
	public TaiKhoan register(@RequestBody TaiKhoan taikhoan) {
		AccountService.create(taikhoan, "CUST");
		return null;
	}



	@PostMapping("/rest/account/addstaff")
	public TaiKhoan postStaff(@RequestBody TaiKhoan taikhoan) {
		AccountService.create(taikhoan,"STAF");
		return null;
	}

}
