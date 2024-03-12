package com.poly.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;  

import ch.qos.logback.core.model.Model;


@Controller
public class UserController {
    
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

    @RequestMapping("hop/auth/address/update-address")
    public String updateaddress(Model model) {
        return "shop/layout/user/update-address";
    }

    @RequestMapping("shop/auth/invoice")
    public String invoice(Model model) {
        return "shop/layout/user/invoice";
    }

    @RequestMapping("shop/auth/invoice/detail-invoice")
    public String detaiinvoice(Model model) {
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
