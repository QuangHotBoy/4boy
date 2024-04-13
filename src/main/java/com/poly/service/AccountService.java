package com.poly.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.poly.model.TaiKhoan;

@Service
public interface AccountService {

	List<TaiKhoan> FindAll();

	TaiKhoan FindById(String tenDangNhap);

	TaiKhoan create(TaiKhoan taiKhoan, String id); 
	
	TaiKhoan update(TaiKhoan taiKhoan); 

	TaiKhoan updatePass(TaiKhoan taiKhoan,String matKhau);
	
	TaiKhoan register(TaiKhoan taiKhoan, String id);

	
}
