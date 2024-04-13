package com.poly.service;

import java.util.List;

import org.springframework.stereotype.Service;
 
import com.poly.model.Quyen_TaiKhoan;
import com.poly.model.TaiKhoan;

@Service
public interface QuyenTKService {

	List<Quyen_TaiKhoan> FindAll();
	
	List<Quyen_TaiKhoan> FindRoleMana();
	
	List<Quyen_TaiKhoan> FindRoleStaff();
	
	List<Quyen_TaiKhoan> FindRoleMember();
 
	Quyen_TaiKhoan save(String taiKhoan_quyen) ;
	
	Quyen_TaiKhoan findById(String tenDangNhap);
}
