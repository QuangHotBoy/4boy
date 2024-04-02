package com.poly.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.poly.model.TaiKhoan;

@Service
public interface AccountService {

	List<TaiKhoan> FindAll();

	TaiKhoan FindById(String tenDangNhap);

	TaiKhoan create(TaiKhoan taiKhoan);

	TaiKhoan update(TaiKhoan taiKhoan); 

}
