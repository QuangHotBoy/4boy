package com.poly.controller;
 
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.poly.dao.ChiTietDonDatHangDAO;
import com.poly.dao.DonDatHangDAO;
import com.poly.dao.TaiKhoanDAO;
import com.poly.model.ChiTietDonDatHang;
import com.poly.model.DonDatHang;
 

@Controller
public class UserController {

    @Autowired
    TaiKhoanDAO TKDao;

    @Autowired
    DonDatHangDAO donDatHangDAO;

    @Autowired 
    ChiTietDonDatHangDAO CTDDHDao;

    @RequestMapping("shop/auth/index")
    public String index(Model model) {
        return "shop/layout/user/index";
    }

    @RequestMapping("shop/auth/information")
    public String infomation(Model model) {
        return "shop/layout/user/information";
    }

    @RequestMapping("shop/auth/information/changepass")
    public String changepass(Model model) {
        return "shop/layout/user/information-changepass";
    }

    @RequestMapping("shop/auth/address")
    public String address(Model model) {
        return "shop/layout/user/address";
    }

    @RequestMapping("shop/auth/address/add-new-address")
    public String addnewaddress(Model model) {
        return "shop/layout/user/add-new-address";
    }

    @RequestMapping("shop/auth/address/update-address")
    public String updateaddress(Model model) {
        return "shop/layout/user/update-address";
    }

    @RequestMapping("shop/auth/invoice")
    public String invoice(Model model) {
        return "shop/layout/user/invoice";
    }

    @RequestMapping("shop/auth/invoice/detail-invoice/{maDonHang}")
    public String edit_donHang(Model model, @PathVariable("maDonHang") Integer madonhang) {
        DonDatHang invoice = donDatHangDAO.findById(madonhang).get();

        List<ChiTietDonDatHang> listDetail = CTDDHDao.findByDonDatHang(invoice);

        // boolean isTrangThaiCancell = "7".equals(invoice.getTrangThai_donDatHang().getTenTrangThai());

        // // model.addAttribute("isTrangThaiCancell", isTrangThaiCancell);
        model.addAttribute("invoice", invoice);
        model.addAttribute("listDetail", listDetail);

        return "shop/layout/user/detail-invoice";
    }

    @RequestMapping("shop/auth/favorite")
    public String favorite(Model model) {
        return "shop/layout/user/favorites";
    }

    @RequestMapping("shop/auth/demo")
    public String demo(Model model) {
        return "shop/layout/user/demo";
    }

}
