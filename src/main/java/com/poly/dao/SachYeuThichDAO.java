package com.poly.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.poly.model.SachYeuThich;





public interface SachYeuThichDAO extends JpaRepository<SachYeuThich, Long> {
    // Các phương thức tùy chỉnh nếu cần
    @Query("SELECT f FROM SachYeuThich f WHERE f.sanPham_yeuThich.isbn = :pId AND f.taiKhoan_yeuThich.tenDangNhap = :aId")
    List<SachYeuThich> findByProductAndUser(@Param("pId") Long pId, @Param("aId") String aId);

    @Query("SELECT f FROM SachYeuThich f WHERE f.sanPham_yeuThich.isbn = :pId AND f.taiKhoan_yeuThich.tenDangNhap = :aId")
    SachYeuThich findByProductAndAccount(@Param("pId") Long pId, @Param("aId") String aId);


    @Query("SELECT a FROM SachYeuThich a Where a.taiKhoan_yeuThich.tenDangNhap = :user")
    List<SachYeuThich> findByTNDSYT (@Param("user") String user);
}
