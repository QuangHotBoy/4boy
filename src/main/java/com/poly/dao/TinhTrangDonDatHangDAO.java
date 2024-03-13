package com.poly.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import com.poly.model.TinhTrangDonDatHang;

public interface TinhTrangDonDatHangDAO extends JpaRepository<TinhTrangDonDatHang, Integer>{
    TinhTrangDonDatHang findByTenTrangThai(String tenTrangThai);
//    List<DonDatHang> findByTenTrangThaiContaining(String keyword);

    
    
}
