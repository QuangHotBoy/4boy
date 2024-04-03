package com.poly.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.poly.model.TinhTrangDonDatHang;
@Service
public interface TinhTrangDonDatHangService {

       List<TinhTrangDonDatHang> findAll();

       TinhTrangDonDatHang findById(Integer id);

       TinhTrangDonDatHang create(TinhTrangDonDatHang tinhTrangDonDatHang);

       TinhTrangDonDatHang update(TinhTrangDonDatHang tinhTrangDonDatHang);
}
