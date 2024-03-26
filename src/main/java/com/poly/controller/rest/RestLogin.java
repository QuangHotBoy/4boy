package com.poly.controller.rest;


import java.util.List; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.RestController;

import com.poly.dao.TaiKhoanDAO;
import com.poly.model.PhanLoai;
import com.poly.model.TaiKhoan;

import jakarta.websocket.server.PathParam;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping; 
 
 

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/login")
public class RestLogin {

    @Autowired
    TaiKhoanDAO TKDao;
     

    // @GetMapping
    // public List<TaiKhoan> findall() {
    //     return TKDao.findAll();
    // }
    @GetMapping
	public TaiKhoan getOne(@PathParam("tenDangNhap") String tenDangNhap, @PathParam("matKhau") String matKhau) {
		return TKDao.findByTenTaiKhoanThongThuong(tenDangNhap, matKhau);
	}
      
    
    
    

}
