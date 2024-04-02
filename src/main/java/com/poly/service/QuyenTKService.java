package com.poly.service;

import java.util.List;

import org.springframework.stereotype.Service;
 
import com.poly.model.Quyen_TaiKhoan;

@Service
public interface QuyenTKService {

	List<Quyen_TaiKhoan> FindAll();
	
	List<Quyen_TaiKhoan> FindRoleMana();
	
	List<Quyen_TaiKhoan> FindRoleStaff();
	
	List<Quyen_TaiKhoan> FindRoleMember();
	
}
