package com.poly.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.poly.model.GiaoDichCOD;





public interface GiaoDichCODDAO extends JpaRepository<GiaoDichCOD, Integer> {
    // Các phương thức tùy chỉnh nếu cần
}
