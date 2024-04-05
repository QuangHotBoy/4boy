package com.poly.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class ThongkeController {
   
   

    @RequestMapping("/admin/statistical/statistics-by-revenue")
    public String statisticsByRevenue() {

        return "admin/statistical/statistics-by-revenue";
    }
    @RequestMapping("/admin/statistical/statistics-by-product")
    public String statisticsByProduct() {

        return "admin/statistical/statistics-by-product";
    }
    // tồn kho
    @RequestMapping("/admin/statistical/statistics-by-product-inventory")
    public String statisticsByProductInventory() {

        return "admin/statistical/statistics-by-product-inventory";
    }

}