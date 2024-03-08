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

    

    
}
