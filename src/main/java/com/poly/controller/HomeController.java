package com.poly.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	@RequestMapping("")
	public String home() {
		return "redirect:/shop/home";
	}
	
	@RequestMapping("shop/home")
	public String shopHome() {
		return "shop/index";
	}
	
	@RequestMapping("shop/product")
	public String detailProduct() {
		return "shop/detail-item";
	}

	@RequestMapping("shop/auth/cart")
	public String cart() {
		return "shop/cart";
	}
	
}
