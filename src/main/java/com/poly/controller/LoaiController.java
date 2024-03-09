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



@Controller
public class LoaiController {
   

    /* loại Sản phẩm */
    @RequestMapping("/admin/product-type")
    public String loaisanpham(Model model, @RequestParam(defaultValue = "0") int page) {

        // List<PhanLoai> productPage = plDAO.findAll();
        // model.addAttribute("phanloais", productPage);

        // List<PhanLoai> productType = plDAO.findAll();
        // model.addAttribute("phanloais", productType);
        return "/admin/product-types/product-type";
    }

    
    // form loại
    @RequestMapping("/admin/product-type/add")
    public String formloai()  {
        // List<PhanLoai> boSachList = plDAO.findAll();
        // System.out.println(boSachList);

        // model.addAttribute("listPL", boSachList);
        return "/admin/product-types/add-product-type";
    }

    // thêm loại
    @RequestMapping("/admin/product-type/create-type")
    public String add_product() {
       

        return "/admin/layout/product-type/add-product-type";
    }

}