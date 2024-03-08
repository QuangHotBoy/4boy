package com.poly.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class AdminController {
    @RequestMapping("shop/admin")
	public String index() {
		return "index";
	}
}
