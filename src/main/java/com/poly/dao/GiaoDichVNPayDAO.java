package com.poly.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.poly.model.GiaoDichVNPay;




public interface GiaoDichVNPayDAO extends JpaRepository<GiaoDichVNPay, Integer> {
    // Các phương thức tùy chỉnh nếu cần
}
