package com.poly.controller;

import java.io.IOException;


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

import com.poly.dao.BoSachDAO;
import com.poly.model.BoSach;
@Controller
public class BoController {
    @Autowired
    BoSachDAO boSachDAO;
    /* Bộ sưu tập */
    @RequestMapping("/admin/product-series")
    public String bosuutap(Model model, @RequestParam(defaultValue = "0") int page) {

        List<BoSach> bosachPage = boSachDAO.findAll();
        model.addAttribute("bosachs", bosachPage);

        return "/admin/series/series";
    }
    // form bộ sưu tập
    @RequestMapping("/admin/product-series/add-new")
    public String formbo(){
        // List<PhanLoai> boSachList = plDAO.findAll();
        // System.out.println(boSachList);

        // model.addAttribute("listPL", boSachList);
        return "/admin/series/add-new-series";
    }
}
