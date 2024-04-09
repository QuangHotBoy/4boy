package com.poly.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.poly.model.ChiTietGioHang;





public interface ChiTietGioHangDAO extends JpaRepository<ChiTietGioHang, Long> {
    // Các phương thức tùy chỉnh nếu cần

    @Query("SELECT dc FROM ChiTietGioHang dc JOIN GioHang c on dc.gioHang.id = c.id WHERE c.id = :id")
    List<ChiTietGioHang> findByGioHang(@Param("id") Long id);

    @Query("SELECT dc FROM ChiTietGioHang dc JOIN SanPham p on dc.sanPham_gioHang.isbn = p.isbn WHERE p.isbn = :isbn")
    ChiTietGioHang findBySanPham(@Param("isbn") Long isbn);

    @Modifying
    @Query("UPDATE ChiTietGioHang c SET c.soLuong = :soLuong WHERE c.id = :id")
    void capNhatSoLuong(@Param("soLuong") int soLuong, @Param("id") Long id);

    @Query("SELECT c FROM ChiTietGioHang c WHERE c.gioHang.id = :cartId AND c.sanPham_gioHang.isbn = :productId")
    ChiTietGioHang findByGioHangAndSanPham(@Param("cartId") Long idCart, @Param("productId") Long isbn);
    
    @Query("DELETE FROM ChiTietGioHang dc WHERE dc.gioHang.id = :id")
	ChiTietGioHang deleteListGioHang(@Param("id") Long id);
    
}
