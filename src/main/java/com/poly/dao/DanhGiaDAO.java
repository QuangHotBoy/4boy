package com.poly.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.poly.model.DanhGia;

import java.util.List;


public interface DanhGiaDAO extends JpaRepository<DanhGia, Integer>{
    @Query("SELECT r FROM DanhGia r WHERE r.sanPham_danhGia.isbn = :id")
    List<DanhGia> findBySanPham_danhGia(@Param("id") Long id);

    List<DanhGia> findByRating(Integer rating);

    @Query("SELECT r FROM DanhGia r WHERE r.taiKhoan_danhGia.tenDangNhap = :id AND r.sanPham_danhGia.isbn = :product")
    DanhGia findByTaiKhoan_danhGia(@Param("id") String id, @Param("product") Long product);
}
