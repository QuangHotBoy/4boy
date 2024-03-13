package com.poly.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.poly.dao.SanPhamDAO;
import com.poly.model.SanPham;



@Controller
public class HomeController {

	@Autowired
	SanPhamDAO productDAO;

	@RequestMapping("")
	public String home() {
		return "redirect:/shop/home";
	}
	
	@RequestMapping("shop/home")
	public String shopHome(Model model) {
		
		return "shop/index";
	}

	@RequestMapping("shop/list")
	public String listProduct(Model model){
		List<SanPham> list = productDAO.findAll();
		model.addAttribute("list", list);
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
