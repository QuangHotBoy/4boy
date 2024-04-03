package com.poly.controller.rest;

import java.util.List;

import com.poly.model.DonDatHang;
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
@RequestMapping("/rest/orderPlaces")
public class OrdersPlacedRestController {

    @Autowired
    private OrdersPlacedService ordersPlacedService;

    @GetMapping
    public Object getAll() {

        Object Data = ordersPlacedService.findAll();
        System.out.println(Data);
        return Data;
    }

    @GetMapping("{maDonHang}")
    public DonDatHang getOne(@PathVariable("maDonHang") Integer maDonHang) {
        return ordersPlacedService.findById(maDonHang);
    }

    @PostMapping
    public DonDatHang create(@RequestBody DonDatHang donDatHang) {
        return ordersPlacedService.create(donDatHang);
    }

    @PutMapping("{maDonHang}")
    public DonDatHang update(@PathVariable("maDonHang") Integer maDonHang, @RequestBody DonDatHang donDatHang) {
        // Set the ID of the order to be updated
        donDatHang.setMaDonHang(maDonHang);
        return ordersPlacedService.update(donDatHang);
    }

    @DeleteMapping("{maDonHang}")
    public void delete(@PathVariable("maDonHang") Integer maDonHang) {
        ordersPlacedService.delete(maDonHang);
    }
    
}
