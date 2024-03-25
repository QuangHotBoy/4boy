package com.poly.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.poly.dao.MaGiamGiaDAO;
import com.poly.model.MaGiamGia;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
public class RestCheckoutCotroller {
    
    @Autowired
    MaGiamGiaDAO voucherDAO;

    @RequestMapping("shop/check-out/voucher/{id}")
    public String checkVoucher(@PathVariable("id") String id) {

        MaGiamGia voucher = voucherDAO.findById(id).get();

        return new String();
    }
    
}
