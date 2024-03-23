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

import com.poly.dao.DonDatHangDAO;
import com.poly.dao.MaGiamGiaDAO;
import com.poly.model.DonDatHang;
import com.poly.model.MaGiamGia;


@Controller
public class AdminController {

	@Autowired
	MaGiamGiaDAO mggDAO;

	@Autowired
	DonDatHangDAO ddhDAO;

    @RequestMapping("admin/dashboard")
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
	public String add_voucher_new(){
			return "admin/voucher/add_voucher";
	}
	
	@RequestMapping("admin/voucher/updatemgg")
	public String udte_voucher(@Validated @ModelAttribute("voucher") MaGiamGia voucher,
			BindingResult result, Model model) throws IllegalAccessException, IOException {
		return "/admin/voucher/update_voucher";
	}
	@RequestMapping("shop/admin/order")
	public String order(Model model) {
		List<DonDatHang> ddhs = ddhDAO.findAll();	
		model.addAttribute("ddhs", ddhs);
		return "admin/order/order";
	}
	@RequestMapping("shop/admin/information")
	public String information(){
			return "admin/information/information";
	}

}
