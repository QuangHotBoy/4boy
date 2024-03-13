package com.poly.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.poly.model.TinhTrangSanPham;



public interface TinhTrangSanPhamDAO extends JpaRepository<TinhTrangSanPham, Integer> {
    // Các phương thức tùy chỉnh nếu cần
}
