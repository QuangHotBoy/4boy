package com.poly.controller;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.poly.dao.NhaXuatBanDAO;
import com.poly.dao.PhanLoaiDAO;
import com.poly.dao.SanPhamDAO;
import com.poly.dao.TinhTrangSanPhamDAO;
import com.poly.model.SanPham;

import jakarta.servlet.ServletContext;

import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProductController {

	@Autowired
	SanPhamDAO spDAO;

	@Autowired
	PhanLoaiDAO plDAO;

	@Autowired
	NhaXuatBanDAO nxbDAO;

	@Autowired
	TinhTrangSanPhamDAO tinhtrangDAO;
	@Autowired
	ServletContext app;

	/* Sản phẩm */
	@RequestMapping("/admin/product")
	public String product(Model model, @RequestParam(defaultValue = "0") int page) {

		List<SanPham> productPage = spDAO.findAll();
		model.addAttribute("products", productPage);
		// model.addAttribute("currentPage", page);
		// model.addAttribute("totalPages", productPage.getTotalPages());
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
	public String add_product() {
		return "/admin/product/add-product";
	}

}