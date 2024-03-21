package com.poly.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.poly.dao.Quyen_TaiKhoanDAO;
import com.poly.dao.TaiKhoanDAO;
import com.poly.model.Quyen_TaiKhoan;
import com.poly.model.TaiKhoan;

@Controller
public class AccountController {
    @Autowired
    TaiKhoanDAO tkDAO;

    @Autowired
    Quyen_TaiKhoanDAO quyenTKDao;

    @RequestMapping("shop/admin/super")
    public String TaiKhoanAdmin(Model model) {
        int a = 2;
        List<Quyen_TaiKhoan> Staff = quyenTKDao.findbyMana();
        model.addAttribute("tk", Staff);
        model.addAttribute("Vaitro", "Quản trị");
        model.addAttribute("quyen", "admin");
        model.addAttribute("addnew", "add-new-staff-account");
        model.addAttribute("a", a);
        return ("admin/user/user");
    }

    @RequestMapping("shop/admin/staff")
    public String TaiKhoanStaff(Model model) {
        int a = 2;
        List<Quyen_TaiKhoan> Staff = quyenTKDao.findbyStaff();
        model.addAttribute("tk", Staff);
        model.addAttribute("Vaitro", "Nhân viên");
        model.addAttribute("quyen", "staff");
        model.addAttribute("addnew", "add-new-staff-account");
        model.addAttribute("a", a);
        return ("admin/user/user");
    }

    @RequestMapping("shop/admin/user")
    public String TaiKhoanUser(Model model) {
        int a = 2;
        List<Quyen_TaiKhoan> Staff = quyenTKDao.findbyMember();
        model.addAttribute("tk", Staff);
        model.addAttribute("Vaitro", "Khách hàng");
        model.addAttribute("quyen", "user");
        model.addAttribute("addnew", "add-new-staff-account");
        model.addAttribute("a", a);
        return ("admin/user/user");
    }

    @RequestMapping("shop/admin/addnew_user")
    public String add_user_new() {
        return "admin/user/add_user";
    }

    @RequestMapping("shop/admin/edit")
    public String edit_user() {
        return "admin/user/edit_user";
    }

}
