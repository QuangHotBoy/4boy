package com.poly.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.poly.model.DonDatHang;

@Service
public interface OrdersPlacedService {
    List<DonDatHang> findAll();

    DonDatHang findById(Integer maDonHang);

    DonDatHang create(DonDatHang donDatHang);

    DonDatHang update(DonDatHang donDatHang);

    void delete(Integer maDonHang);

}
