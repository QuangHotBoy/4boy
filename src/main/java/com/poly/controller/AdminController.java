package com.poly.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
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
	public String voucher(Model model) {
		List<MaGiamGia> mggs = mggDAO.findAll();	
		model.addAttribute("mggs", mggs);
		return "admin/voucher/voucher";
	}
	@RequestMapping("shop/admin/addnew_mgg")
	public String add_voucher_new(@Validated @ModelAttribute("voucher") MaGiamGia voucher,
			BindingResult result, Model model) throws IllegalAccessException, IOException {
			LocalDate currentDate = LocalDate.now();
			model.addAttribute("ngayBatDau", currentDate);
			return "admin/voucher/add_voucher";
	}
	@RequestMapping("shop/admin/voucher/createmgg")
	public String add_voucher(@Validated @ModelAttribute("voucher") MaGiamGia voucher,
							  BindingResult result, Model model) throws IllegalAccessException, IOException {
	
		Date ngayBatDau = voucher.getNgayBatDau();
		Date ngayKetThuc = voucher.getNgayKetThuc();
		System.out.println("Ngày bắt đầu: " + ngayBatDau);
		System.out.println("Ngày kết thúc: " + ngayKetThuc);
		mggDAO.save(voucher);
		
		// Clear the voucher object for a new form and redirect to the desired page
		voucher = new MaGiamGia();
		model.addAttribute("voucher", voucher);
		return "redirect:/admin/voucher/add_voucher";
	}
	@RequestMapping("admin/voucher/edit/{id}")
	public String edit_voucher(Model model, @PathVariable("id") String id) {
		MaGiamGia voucher = mggDAO.findById(id).get();

		model.addAttribute("voucher", voucher);

		return "/admin/voucher/update_voucher";
	}
	@RequestMapping("admin/voucher/updatemgg")
	public String udte_voucher(@Validated @ModelAttribute("voucher") MaGiamGia voucher,
			BindingResult result, Model model) throws IllegalAccessException, IOException {

		return "/admin/voucher/update_voucher";
	}
	@RequestMapping("shop/admin/order")
	public String order() {
		return "admin/order/order";
	}
}
