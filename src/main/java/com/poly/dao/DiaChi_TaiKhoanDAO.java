package com.poly.dao;
 

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.poly.model.DiaChi_TaiKhoan;



public interface DiaChi_TaiKhoanDAO extends JpaRepository<DiaChi_TaiKhoan, Long> {
    // Các phương thức tùy chỉnh nếu cần
    @Query("SELECT a FROM DiaChi_TaiKhoan a WHERE a.taiKhoan_diaChi.tenDangNhap = :user AND a.macDinh = true")
    DiaChi_TaiKhoan findByTaiKhoan(@Param("user") String user);

     @Query("SELECT a FROM DiaChi_TaiKhoan a WHERE a.id = :id")
    DiaChi_TaiKhoan findDCByID(@Param("id") Long id);


    @Query("SELECT a FROM DiaChi_TaiKhoan a WHERE a.taiKhoan_diaChi.tenDangNhap = :user AND a.macDinh = false")
    List<DiaChi_TaiKhoan> findALLDC(@Param("user") String user);

      @Query("SELECT a FROM DiaChi_TaiKhoan a WHERE a.macDinh = true")
    List<DiaChi_TaiKhoan> findALLDCTrue();
}