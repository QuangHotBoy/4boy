package com.poly.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.poly.model.PhanLoai;



public interface PhanLoaiDAO extends JpaRepository<PhanLoai, Integer> {
    // Các phương thức tùy chỉnh nếu cần
    boolean existsByTenLoai(String tenLoai);
}
