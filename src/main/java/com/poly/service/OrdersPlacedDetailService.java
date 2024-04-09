package com.poly.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.poly.model.ChiTietDonDatHang;


@Service
public interface OrdersPlacedDetailService {
    List<ChiTietDonDatHang> findAll();

    ChiTietDonDatHang findById(Integer maChiTiet);

    ChiTietDonDatHang create(ChiTietDonDatHang chiTietDonDatHang);

    ChiTietDonDatHang update(ChiTietDonDatHang chiTietDonDatHang);

    void delete(Integer maChiTiet);
}
