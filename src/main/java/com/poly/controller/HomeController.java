package com.poly.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.poly.service.QuyenService;


@Controller
public class HomeController {

	@Autowired
	QuyenService quyenService;

	@RequestMapping("")
	public String home() {
		return "redirect:/shop/home";
	}
	
	@RequestMapping("shop/home")
	public String shopHome() {
		System.out.println(quyenService.findAll());
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
