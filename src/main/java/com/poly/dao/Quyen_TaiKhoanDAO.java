package com.poly.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.poly.model.Quyen_TaiKhoan;




public interface Quyen_TaiKhoanDAO extends JpaRepository<Quyen_TaiKhoan, Long> {
    // Các phương thức tùy chỉnh nếu cần
    @Query("SELECT a FROM Quyen_TaiKhoan a where a.taiKhoan_quyen.tenDangNhap = :un")
    Quyen_TaiKhoan findbyTenDangNhap(@Param("un") String tenDangNhap);
}
