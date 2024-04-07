package com.poly.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.poly.model.TaiKhoan;



public interface TaiKhoanDAO extends JpaRepository<TaiKhoan, String> {
    // Các phương thức tùy chỉnh nếu cần
    @Query("SELECT t FROM TaiKhoan t WHERE t.tenDangNhap = :tenDangNhap and t.matKhau = :matKhau")
    TaiKhoan findByTenTaiKhoanThongThuong(@Param("tenDangNhap") String tenDangNhap, @Param("matKhau") String matKhau);

    @Query("SELECT tk FROM TaiKhoan tk WHERE tk.tenDangNhap = :tenTaiKhoan")
    TaiKhoan findByTenTaiKhoan(@Param("tenTaiKhoan") String tenTaiKhoan);

    @Query("SELECT tk FROM TaiKhoan tk WHERE tk.email = :email")
    TaiKhoan findByEmail(@Param("email") String email);

    @Query("SELECT tk FROM TaiKhoan tk WHERE tk.hoTen = :hoTen")
    List<TaiKhoan> findByTenNguoiDung(String hoTen);

    @Query("SELECT tk FROM TaiKhoan tk WHERE tk.tenDangNhap = :tenDangNhap")
    TaiKhoan findByTenDangNhap(@Param("tenDangNhap") String tenDangNhap);
 
    
    TaiKhoan findByTenDangNhapAndEmail(String tenDangNhap, String email);

   
    
    
}
