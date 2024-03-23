package com.poly.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.poly.dao.NhaXuatBanDAO;
import com.poly.dao.PhanLoaiDAO;
import com.poly.dao.SanPhamDAO;
import com.poly.model.SanPham;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class HomeController {

	@Autowired
	SanPhamDAO productDAO;

	@Autowired
	PhanLoaiDAO typeDao;

	@Autowired
	NhaXuatBanDAO publisingDAO;

	@RequestMapping("")
	public String home() {
		return "redirect:/shop/home";
	}

	@RequestMapping("shop/home")
	public String shopHome(Model model) {

		List<SanPham> products = productDAO.findAllSapXep();
		List<SanPham> top8Product = products.subList(0, Math.min(products.size(), 8));
		List<SanPham> productsSale = productDAO.findByTinhTrangSanPham(3);
		List<SanPham> top8Sale = productsSale.subList(0, Math.min(productsSale.size(), 4));

		model.addAttribute("sale", top8Sale);
		model.addAttribute("top8Product", top8Product);
		model.addAttribute("title", "Knotrea - Trang chủ");

		return "shop/index";
	}

	@RequestMapping("shop/list")
	public String listProduct(Model model) {

		List<SanPham> list = productDAO.findAllSapXep();

		model.addAttribute("list", list);
		model.addAttribute("title", "Knotrea - Danh sách sản phẩm");

		return "shop/list";
	}

	@RequestMapping("shop/product/{isbn}")
	public String detailProduct(Model model, @PathVariable("isbn") Long isbn) {

		SanPham product = productDAO.findById(isbn).get();
		List<SanPham> relatedNXB = productDAO.findByNhaCungCap(product.getNhaXuatBan().getId());
		List<SanPham> relatedType = productDAO.findByPhanLoai(product.getPhanLoai().getId());

		ArrayList<SanPham> relatedProducts = new ArrayList<>();
		relatedProducts.addAll(relatedType);
		relatedProducts.addAll(relatedNXB);

		// Loại bỏ các phần tử trùng lặp từ relatedProducts
		HashSet<SanPham> uniqueRelatedProducts = new HashSet<>(relatedProducts);
		relatedProducts.clear();
		relatedProducts.addAll(uniqueRelatedProducts);
		relatedProducts.remove(product);

		Collections.shuffle(relatedProducts);

		if (relatedProducts.size() >= 4) {
			List<SanPham> products = relatedProducts.subList(0, 4);
			model.addAttribute("relatedProducts", products);
		}else{
			List<SanPham> products = productDAO.findAll();

			Random random = new Random();

			int randomIndex = random.nextInt(products.size());

			relatedProducts.add(products.get(randomIndex));

			model.addAttribute("relatedProducts", relatedProducts);
		}

		model.addAttribute("product", product);
		model.addAttribute("title", product.getTenSach());

		return "shop/detail-item";
	}

	// @RequestMapping("shop/publishing/{id}")
	// public String detailPublishing(Model model, @PathVariable("id") Long id) {

	// 	NhaXuatBan publising = publisingDAO.findById(id).get();

	// 	model.addAttribute("pub", publising);

	// 	return "shop/publishing";
	// }
	
	@RequestMapping("shop/auth/cart")
	public String cart() {
		return "shop/cart";
	}

	@RequestMapping("shop/auth/order/check-out")
	public String checkOut() {
		return "shop/checkout";
	}

	@RequestMapping("shop/buy-now")
	public String buyNow(Model model, @RequestParam Long isbn, @RequestParam Integer quantity) {
		SanPham product = productDAO.findById(isbn).get();

		model.addAttribute("quantity", quantity);
		model.addAttribute("products", product);

		return "shop/buy-now";
	}
	

}
