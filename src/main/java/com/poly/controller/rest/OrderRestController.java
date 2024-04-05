package com.poly.controller.rest;

import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.poly.model.DonDatHang;
import com.poly.model.GioHang;
import com.poly.service.CartService;
import com.poly.service.OrderService;
import com.poly.service.VoucherService;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest")
public class OrderRestController {
    @Autowired
    OrderService orderService;

    @Autowired
    VoucherService voucherService;

    @Autowired
    CartService cartService;

    @PostMapping("/orders")
    public DonDatHang purchase(@RequestBody JsonNode orderData) {
        return orderService.create(orderData);
    }

    @GetMapping("/voucher")
    @ResponseBody
    public Map<String, Object> checkVoucher(@RequestParam("voucher") String voucherCode,
            @RequestParam("total") Long total, @RequestParam("user") String id) {
        return voucherService.checkVoucher(voucherCode, total, id);
    }

    @PostMapping("/add-cart")
    public GioHang add(@RequestBody JsonNode cartData) {
        return cartService.create(cartData);
    }

    @GetMapping("/order/check/{user}/{isbn}")
    @ResponseBody
    public Map<String, Object> checkOrder(@PathVariable("user") String id,
            @PathVariable("isbn") Long isbn) {
                return orderService.checkOrder(id, isbn);
    }

    @GetMapping("/cart/{user}")
    @ResponseBody
    public Map<Integer, ArrayList> getDetailCart(@PathVariable("user") String user){
        return cartService.findByUser(user);
    }
}
