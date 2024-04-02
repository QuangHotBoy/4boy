package com.poly.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.dao.DonDatHangDAO;
import com.poly.model.DonDatHang;
import com.poly.service.OrdersPlacedService;

@Service
public class OdersPlacedServiceImpl implements OrdersPlacedService {

    @Autowired
    private DonDatHangDAO donDatHangDAO;


    public List<DonDatHang> findAll() {
        System.out.println(donDatHangDAO.findAll());
        return donDatHangDAO.findAll();
    }


    public DonDatHang findById(Integer maDonHang) {
        return donDatHangDAO.findById(maDonHang).orElse(null);
    }


    public DonDatHang create(DonDatHang donDatHang) {
        return donDatHangDAO.save(donDatHang);
    }


    public DonDatHang update(DonDatHang donDatHang) {
        return donDatHangDAO.save(donDatHang);
    }

    public void delete(Integer maDonHang) {
        donDatHangDAO.deleteById(maDonHang);
    }
}
