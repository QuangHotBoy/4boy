package com.poly.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.poly.model.DiaChi_TaiKhoan;

@Service
public interface AddressService {

	List<DiaChi_TaiKhoan> getDCFalse(String tenDangNhap);
	
	DiaChi_TaiKhoan getTrueAddress(String tenDangNhap);
	
	DiaChi_TaiKhoan create(DiaChi_TaiKhoan diaChi);
	
	DiaChi_TaiKhoan update(DiaChi_TaiKhoan diachi);
	 
	DiaChi_TaiKhoan delete(Long id);
	
	DiaChi_TaiKhoan findbyId(Long id);

	DiaChi_TaiKhoan findDCTrue();

	List<DiaChi_TaiKhoan> getAllByUser(String user);
}
