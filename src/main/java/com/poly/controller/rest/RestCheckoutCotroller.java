package com.poly.controller.rest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.poly.dao.MaGiamGiaDAO;
import com.poly.model.MaGiamGia;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin("*") 
@RestController
public class RestCheckoutCotroller {
    
    @Autowired
    MaGiamGiaDAO voucherDAO;

    @PostMapping("shop/check-out/add-voucher")
    @ResponseBody
    public Map<String, Object> checkVoucher(@RequestParam("voucher") String id) {
        Map<String, Object> response = new HashMap<>();

        MaGiamGia voucher = voucherDAO.findById(id).orElse(null);

        if(voucher != null){
            response.put("isValid", true);
            if (voucher.getSoLuong() == 0 || voucher.getKetThuc()) {
                response.put("isActive", true);
                response.put("discount", voucher.getSoTienGiam());
            }else{
                response.put("isActive", false);
            }
        }else{
            response.put("isValid", false);
        }

        return response;
    }
    
}
