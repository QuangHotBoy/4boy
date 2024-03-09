package com.poly.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;  

import ch.qos.logback.core.model.Model;


@Controller
public class UserController {
    
    @RequestMapping("/user/index")
    public String index(Model model) {
        return "shop/layout/user/index";
    }

    @RequestMapping("/user/information")
    public String infomation(Model model) {
        return "shop/layout/user/information";
    }

    @RequestMapping("/user/information/changepass")
    public String changepass(Model model) {
        return "shop/layout/user/information-changepass";
    }

    @RequestMapping("/user/address")
    public String address(Model model) {
        return "shop/layout/user/address";
    }

    @RequestMapping("/user/address/add-new-address")
    public String addnewaddress(Model model) {
        return "shop/layout/user/add-new-address";
    }

    @RequestMapping("/user/address/update-address")
    public String updateaddress(Model model) {
        return "shop/layout/user/update-address";
    }

    @RequestMapping("/user/invoice")
    public String invoice(Model model) {
        return "shop/layout/user/invoice";
    }

    @RequestMapping("/user/invoice/detail-invoice")
    public String detaiinvoice(Model model) {
        return "shop/layout/user/detail-invoice";
    }


    @RequestMapping("/user/favorite")
    public String favorite(Model model) {
        return "shop/layout/user/favorites";
    }

    
}
