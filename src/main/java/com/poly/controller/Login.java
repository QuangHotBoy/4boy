package com.poly.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Login {
    @RequestMapping("shop/login")
	public String login(Model model) {

		return "shop/layout/login/login";
	}
}
