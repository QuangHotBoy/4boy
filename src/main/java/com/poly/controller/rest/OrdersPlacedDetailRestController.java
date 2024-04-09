package com.poly.controller.rest;

import java.util.List;

import com.poly.model.ChiTietDonDatHang;
import com.poly.model.DonDatHang;
import com.poly.service.OrdersPlacedDetailService;
import com.poly.service.OrdersPlacedService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/orderPlacesDetail")
public class OrdersPlacedDetailRestController {

    @Autowired
    private OrdersPlacedDetailService ordersPlacedDetailService;

    @GetMapping
    public Object getAll() {
        Object Data = ordersPlacedDetailService.findAll();
        System.out.println(Data);
        return Data;
    }

    @GetMapping("{maChiTiet}")
    public ChiTietDonDatHang getOne(@PathVariable("maChiTiet") Integer maChiTiet) {
        return ordersPlacedDetailService.findById(maChiTiet);
    }

    @PostMapping
    public ChiTietDonDatHang create(@RequestBody ChiTietDonDatHang chiTietDonDatHang) {
        return ordersPlacedDetailService.create(chiTietDonDatHang);
    }

    @PutMapping("{maChiTiet}")
    public ChiTietDonDatHang update(@PathVariable("maChiTiet") Integer maChiTiet, @RequestBody ChiTietDonDatHang chiTietDonDatHang) {
        // Set the ID of the order to be updated
        chiTietDonDatHang.setMaChiTiet(maChiTiet);
        return ordersPlacedDetailService.update(chiTietDonDatHang);
    }

    @DeleteMapping("{maChiTiet}")
    public void delete(@PathVariable("maChiTiet") Integer maChiTiet) {
        ordersPlacedDetailService.delete(maChiTiet);
    }
    
}
