package com.poly.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


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

	@RequestMapping("shop/list")
	public String listProduct(){
		return "shop/list";
	}
	
	@RequestMapping("shop/product")
	public String detailProduct() {
		return "shop/detail-item";
	}

	@RequestMapping("shop/gallary")
	public String detailGallary(){
		return "shop/detail-gallary";
	}

	@RequestMapping("shop/auth/cart")
	public String cart() {
		return "shop/cart";
	}
	
	@RequestMapping("shop/auth/order/check-out")
	public String checkOut() {
		return "shop/checkout";
	}
	
}
