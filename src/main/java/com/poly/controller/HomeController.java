package com.poly.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.poly.dao.BoSachDAO;
import com.poly.dao.SanPhamDAO;
import com.poly.model.BoSach;
import com.poly.model.SanPham;

@Controller
public class HomeController {

	@Autowired
	SanPhamDAO productDAO;

	@Autowired
	BoSachDAO gallaryDAO;

	@RequestMapping("")
	public String home() {
		return "redirect:/shop/home";
	}
	
	@RequestMapping("shop/home")
	public String shopHome(Model model) {
		
		List<SanPham> products = productDAO.findAllSapXep();
		List<SanPham> top8Product = products.subList(0, Math.min(products.size(), 8));

		List<BoSach> gallarys = gallaryDAO.findAll();
		List<BoSach> top4Gallary = gallarys.subList(0, Math.min(gallarys.size(), 4));

		model.addAttribute("top8Product", top8Product);
		model.addAttribute("top4Gallary", top4Gallary);

		return "shop/index";
	}

	@RequestMapping("shop/list")
	public String listProduct(Model model){

		List<SanPham> list = productDAO.findAllSapXep();
		model.addAttribute("list", list);
		
		return "shop/list";
	}
	
	@RequestMapping("shop/product/{isbn}")
	public String detailProduct(Model model, @PathVariable("isbn") Long isbn) {

		SanPham product = productDAO.findById(isbn).get();
		

		model.addAttribute("product", product);

		return "shop/detail-item";
	}

	@RequestMapping("shop/gallary/{id}")
	public String detailGallary(Model model, @PathVariable("id") Long id){

		BoSach gallary = gallaryDAO.findById(id).get();
		List<SanPham> products = productDAO.findByBoSach(id);

		model.addAttribute("gallary", gallary);
		model.addAttribute("tacGia", products.get(0).getTacGia());
		model.addAttribute("products", products);

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
