package com.poly.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.poly.model.NhaXuatBan;




public interface NhaXuatBanDAO extends JpaRepository<NhaXuatBan, Integer> {
    // Các phương thức tùy chỉnh nếu cần
    // boolean existsByTenNhaXuatBan(String tenNhaXuatBan);

}
