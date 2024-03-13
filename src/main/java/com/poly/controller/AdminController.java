package com.poly.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.poly.dao.MaGiamGiaDAO;
import com.poly.model.MaGiamGia;


@Controller
public class AdminController {

	@Autowired
	MaGiamGiaDAO mggDAO;

    @RequestMapping("shop/admin")
	public String index() {
		return "index";
	}
	@RequestMapping("shop/admin/voucher")
	public String voucher(Model model, @RequestParam(defaultValue = "0") int page) {
		int pageSize = 5; // Số sản phẩm trên mỗi trang
		Page<MaGiamGia> voucherPage = mggDAO.findAll(PageRequest.of(page, pageSize));
		model.addAttribute("vouchers", voucherPage.getContent());
		model.addAttribute("currentPage", page);
		model.addAttribute("totalPages", voucherPage.getTotalPages());
		List<MaGiamGia> vouchers = mggDAO.findAll();
	model.addAttribute("vouchers", vouchers);
		return "admin/voucher/voucher";
	}
	@RequestMapping("shop/admin/order")
	public String order() {
		return "admin/order/order";
	}
}
