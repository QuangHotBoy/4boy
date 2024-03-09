package com.poly.controller;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class BoController {
    /* Bộ sưu tập */
    @RequestMapping("/admin/product-series")
    public String bosuutap(Model model, @RequestParam(defaultValue = "0") int page) {

        // List<BoSach> bosachPage = boSachDAO.findAll();
        // model.addAttribute("bosachs", bosachPage);

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
