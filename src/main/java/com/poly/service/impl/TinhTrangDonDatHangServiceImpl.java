package com.poly.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.model.TinhTrangDonDatHang;
import com.poly.service.TinhTrangDonDatHangService;
import com.poly.dao.TinhTrangDonDatHangDAO;

@Service
public class TinhTrangDonDatHangServiceImpl implements TinhTrangDonDatHangService {

    @Autowired
    private TinhTrangDonDatHangDAO tinhTrangDonDatHangDAO;

    public List<TinhTrangDonDatHang> findAll() {
        return tinhTrangDonDatHangDAO.findAll();
    }

    public TinhTrangDonDatHang findById(Integer id) {
        return tinhTrangDonDatHangDAO.findById(id).orElse(null);
    }

    public TinhTrangDonDatHang create(TinhTrangDonDatHang tinhTrangDonDatHang) {
        return tinhTrangDonDatHangDAO.save(tinhTrangDonDatHang);
    }

    public TinhTrangDonDatHang update(TinhTrangDonDatHang tinhTrangDonDatHang) {
        return tinhTrangDonDatHangDAO.save(tinhTrangDonDatHang);
    }
}

