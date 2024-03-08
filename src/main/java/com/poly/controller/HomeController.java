package com.poly.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	@RequestMapping("")
	public String home() {
		return "shop/index";
	}
	
	@RequestMapping("shop/product")
	public String list() {
		return "shop/list";
	}
}
