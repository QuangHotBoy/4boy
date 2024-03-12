package com.poly.controller;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/admin/product")
public class ProductController {

	/* Sản phẩm */
	@GetMapping("{id}")
	
	
	public List<Product>getAll() {

		return "/admin/product/product";
	}

	// add
	@RequestMapping("/admin/product/add-new")
	public String add_sanpham(@Validated Model model) throws IllegalAccessException, IOException {

		// List<PhanLoai> typeList = plDAO.findAll();
		// List<BoSach> gallaryList = bsDAO.findAll();
		// List<NhaXuatBan> nxbList = nxbDAO.findAll();
		// List<TinhTrangSanPham> tinhtrangs = tinhtrangDAO.findAll();
		// SanPham item = new SanPham();

		// item.setLoaiSanPham(typeList);
		// item.setBoSachs(gallaryList);
		// item.setNhaXuatBans(nxbList);
		// item.setTinhtrangs(tinhtrangs);

		// model.addAttribute("item", item);

		// model.addAttribute("listPL", boSachList);
		return "/admin/product/add-product";
	}

	// thêm sản phẩm
	@RequestMapping("/admin/product/createsp")
	public String add_product(){
		return "/admin/product/add-product";
	}


	
}