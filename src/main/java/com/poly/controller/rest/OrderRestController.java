package com.poly.controller.rest;

import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.poly.model.DonDatHang;
import com.poly.model.GioHang;
import com.poly.service.CartService;
import com.poly.service.OrderService;
import com.poly.service.ReviewService;
import com.poly.service.VoucherService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
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

    @Autowired
    ReviewService reviewService;

    @PostMapping("/orders")
    public DonDatHang purchase(@RequestBody JsonNode orderData) {
        return orderService.create(orderData);
    }
    
    @GetMapping("/top-8-ban-chay")
    public List<Object[]> getTop8SachBanChay(){
    	return orderService.getTopSachByTinhTrang();
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
    public Map<Integer, ArrayList> getDetailCart(@PathVariable("user") String user) {
        return cartService.findByUser(user);
    }

    @GetMapping("/banned-word")
    @ResponseBody
    public List<Object> getMyList() {
        List<Object> resultList = Arrays.asList("Lừa đảo", "Gian lận", "Trái pháp luật", "Xúc phạm", "Tấn công cá nhân",
                "Quấy rối", "Bạo lực", "Nội dung không phù hợp", "Tự tử", "Fraud", "Scam", "Illegal", "Offensive",
                "Personal attack", "Harassment", "Violence", "Inappropriate content", "Hate speech", "Suicide");
        return resultList;
    }

    @GetMapping("/review-check/{user}/{id}")
    @ResponseBody
    public Map<String, Object> checkUserReview(@PathVariable("user") String user, @PathVariable("id") Long isbn){
        return reviewService.checkUserReview(user, isbn);
    }

    @GetMapping("/cancel-invoice/{id}")
    public DonDatHang cancelInvoice(@PathVariable("id") Integer id){
        return orderService.cancelInvoice(id);
    }

    @GetMapping("/success-invoice/{id}")
    public DonDatHang successInvoice(@PathVariable("id") Integer id){
        return orderService.successInvoice(id);
    }
}
