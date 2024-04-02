package com.poly.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.poly.model.MaGiamGia;




public interface MaGiamGiaDAO extends JpaRepository<MaGiamGia, String> {
    MaGiamGia findByTenMa(String tenMa);
}
