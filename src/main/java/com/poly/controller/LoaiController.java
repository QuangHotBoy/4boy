package com.poly.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.poly.dao.PhanLoaiDAO;
import com.poly.model.PhanLoai;
import com.poly.service.ProductTypeService;

@Controller
public class LoaiController {
    @Autowired
    PhanLoaiDAO plDAO;
    // @Autowired
    // ProductTypeService productTypeService;
    /* loại Sản phẩm */
    @RequestMapping("/admin/product-type")
    public String list(Model model, @RequestParam(defaultValue = "0") int page) {

        List<PhanLoai> list = plDAO.findAll();
        model.addAttribute("items", list);

        return "/admin/product-types/product-type";
    }

    // @RequestMapping("/admin/product-type/{id}")
	// public String detail(Model model, @PathVariable("id") Integer id) {
	// 	PhanLoai item = productTypeService.findById(id);
	// 	model.addAttribute("item", item);
	// 	return "/admin/product-types/product-type";
	// }

    // form loại
    // @RequestMapping("/admin/product-type/add")
    // public String formloai() {
    // // List<PhanLoai> boSachList = plDAO.findAll();
    // // System.out.println(boSachList);

    // // model.addAttribute("listPL", boSachList);
    // return "/admin/product-types/add-product-type";
    // }

    // thêm loại
    @RequestMapping("/admin/product-type/create-type")
    public String add_product() {

        return "/admin/layout/product-type/add-product-type";
    }

}