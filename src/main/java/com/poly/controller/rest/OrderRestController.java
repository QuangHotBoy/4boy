package com.poly.controller.rest;

import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.poly.model.DonDatHang;
import com.poly.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/orders")
public class OrderRestController {
    @Autowired
	OrderService orderService;

    @PostMapping
	public DonDatHang purchase(@RequestBody JsonNode orderData) {
        System.out.println(1);
		return orderService.create(orderData);
	}


    // @PostMapping("shop/check-out/add-voucher")
    // @ResponseBody
    // public Map<String, Object> checkVoucher(@RequestParam("voucher") String id, @RequestParam("total") Long total) {
    //     Map<String, Object> response = new HashMap<>();

    //     MaGiamGia voucher = voucherDAO.findById(id).orElse(null);

    //     if (voucher != null) {
    //         response.put("isValid", true);
    //         if (voucher.getSoLuong() == 0 || voucher.getKetThuc()) {
    //             response.put("isActive", true);
    //             if (voucher.getDieuKien().longValue() <= total) {
    //                 response.put("isTrue", true);
    //                 response.put("dateEnd", voucher.getNgayKetThuc());
    //                 response.put("discount", voucher.getSoTienGiam());
    //             } else {
    //                 response.put("isTrue", false);
    //             }
    //         } else {
    //             response.put("isActive", false);
    //         }
    //     } else {
    //         response.put("isValid", false);
    //     }

    //     return response;
    // }

}
