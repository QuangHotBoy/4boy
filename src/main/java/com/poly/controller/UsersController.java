package com.poly.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.poly.dao.TaiKhoanDAO;
import com.poly.model.TaiKhoan;

@Controller
public class UsersController {
    @Autowired
	TaiKhoanDAO tkDAO;

    @RequestMapping("shop/admin/user")
	public String user(Model model) {
        List<TaiKhoan> tks = tkDAO.findAll();	
		model.addAttribute("tks", tks);
        return "admin/user/user";
	}
    @RequestMapping("shop/admin/addnew_user")
	public String add_user_new(){
		
			return "admin/user/add_user";
	}
   
}
