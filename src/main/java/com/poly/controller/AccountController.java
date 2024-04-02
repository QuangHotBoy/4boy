package com.poly.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.poly.dao.Quyen_TaiKhoanDAO;
import com.poly.dao.TaiKhoanDAO;
import com.poly.model.Quyen_TaiKhoan;

@Controller
public class AccountController {
    @Autowired
    TaiKhoanDAO tkDAO;

    @Autowired
    Quyen_TaiKhoanDAO quyenTKDao;

    @RequestMapping("shop/admin/super")
    public String TaiKhoanAdmin(Model model) {
        return ("admin/user/manager/manager");
    }

    @RequestMapping("shop/admin/staff")
    public String TaiKhoanStaff(Model model) {
        return ("admin/user/staff/staff");
    }

    @RequestMapping("shop/admin/user")
    public String TaiKhoanUser(Model model) {
        return ("admin/user/member/member");
    }

    @RequestMapping("/shop/admin/addnew_member")
    public String add_member() {
        return "admin/user/member/add_member";
    }

    @RequestMapping("/shop/admin/edit_member/{tenDangNhap}")
    public String edit_member(@PathVariable("tenDangNhap") String tenDangNhap) {
        return "admin/user/member/edit_member";
    }

    // @RequestMapping("shop/admin/edit")
    // public String edit_user() {
    // return "admin/user/edit_user";
    // }

}
