package com.poly.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.poly.model.TrangThaiSach;



public interface TinhTrangSanPhamDAO extends JpaRepository<TrangThaiSach, Integer> {
    // Các phương thức tùy chỉnh nếu cần
}
