package com.poly.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.dao.ChiTietDonDatHangDAO;
import com.poly.model.ChiTietDonDatHang;
import com.poly.service.OrdersPlacedDetailService;

@Service
public class OdersPlacedDetailServiceImpl implements OrdersPlacedDetailService {

    @Autowired
    private ChiTietDonDatHangDAO ctddhDao;


    public List<ChiTietDonDatHang> findAll() {
        System.out.println(ctddhDao.findAll());
        return ctddhDao.findAll();
    }


    public ChiTietDonDatHang findById(Integer maChiTiet) {
        return ctddhDao.findById(maChiTiet).orElse(null);
    }


    public ChiTietDonDatHang create(ChiTietDonDatHang chiTietDonDatHang) {
        return ctddhDao.save(chiTietDonDatHang);
    }


    public ChiTietDonDatHang update(ChiTietDonDatHang chiTietDonDatHang) {
        return ctddhDao.save(chiTietDonDatHang);
    }

    public void delete(Integer maChiTiet) {
        ctddhDao.deleteById(maChiTiet);
    }
}
