package com.poly.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.poly.model.GioHang;




public interface GioHangDAO extends JpaRepository<GioHang, Long> {
    // Các phương thức tùy chỉnh nếu cần
    @Query("INSERT INTO GioHang (taiKhoan_gioHang) VALUES (:id)")
    GioHang createCart(@Param("id") String id);

    @Query("SELECT u FROM GioHang u WHERE u.taiKhoan_gioHang.tenDangNhap = :username")
    GioHang findByTenDangNhap(@Param("username") String id);

}
