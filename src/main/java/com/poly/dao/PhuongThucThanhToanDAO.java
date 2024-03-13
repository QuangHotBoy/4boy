package com.poly.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.poly.model.PhuongThucThanhToan;



public interface PhuongThucThanhToanDAO extends JpaRepository<PhuongThucThanhToan, Integer> {
    // Các phương thức tùy chỉnh nếu cần
}
