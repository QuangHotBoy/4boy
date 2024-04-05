package com.poly.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.poly.model.ChiTietDonDatHang;
import com.poly.model.DonDatHang;

import java.util.List;




public interface ChiTietDonDatHangDAO extends JpaRepository<ChiTietDonDatHang, Integer> {
    // Các phương thức tùy chỉnh nếu cần
    List<ChiTietDonDatHang> findByDonDatHang(DonDatHang donDatHang);

    @Query("SELECT s FROM ChiTietDonDatHang s WHERE s.donDatHang.id = :idOrder AND s.sanPham_donDatHang.isbn = :idProduct")
    ChiTietDonDatHang findByDonDatHangAndSanPhamDonDatHang(@Param("idOrder") Integer idOrder, @Param("idProduct") Long id);

    @Query("SELECT s FROM ChiTietDonDatHang s WHERE s.donDatHang.id = :idOrder")
    List<ChiTietDonDatHang> findByMaDonDatHang(@Param("idOrder") Integer idOrder);

}
