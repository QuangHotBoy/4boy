package com.poly.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.poly.model.SanPham;

import org.springframework.data.domain.Pageable;




public interface SanPhamDAO extends JpaRepository<SanPham, Long> {

    // Các phương thức tùy chỉnh nếu cần
    @Query("SELECT s FROM SanPham s WHERE s.phanLoai.id = :maPL")
    List<SanPham> findByPhanLoai(@Param("maPL") Integer maPL);

    @Query("SELECT s FROM SanPham s WHERE s.nhaXuatBan.id = :maNCC")
    List<SanPham> findByNhaCungCap(@Param("maNCC") Long mcc);

    @Query("SELECT s FROM SanPham s WHERE s.boSach.id = :id")
    List<SanPham> findByBoSach(@Param("id") Long id);

    List<SanPham> findByTenSachContaining(String tenSanPham);

    @Query("SELECT p FROM SanPham p ORDER BY p.isbn DESC")
    List<SanPham> findAllSapXep();

    // Thống kê sản phẩm bán được
//     @Query("SELECT s.id AS maSach, s.tenSach, COALESCE(SUM(ctdh.soLuong), 0) AS soLuongBanDuoc, COALESCE(s.donGia * SUM(ctdh.soLuong), 0) AS tongDoanhSo "
//             +
//             "FROM SanPham s " +
//             "LEFT JOIN ChiTietDonDatHang ctdh ON s.id = ctdh.sanPham_donDatHang " +
//             "LEFT JOIN DonDatHang ddh ON ctdh.donDatHang = ddh.maDonHang " +
//             "GROUP BY s.id, s.tenSach, s.donGia " +
//             "ORDER BY soLuongBanDuoc DESC")
//     List<Object[]> thongKeSanPhamBanDuocTop5(Pageable pageable);

//     @Query("SELECT s.hinhAnh, s.id, s.tenSach, s.donGia, s.giaGoc, COALESCE(SUM(ctdh.soLuong), 0) AS soLuongBanDuoc "
//             +
//             "FROM SanPham s " +
//             "LEFT JOIN ChiTietDonDatHang ctdh ON s.id = ctdh.sanPham_donDatHang " +
//             "LEFT JOIN DonDatHang ddh ON ctdh.donDatHang = ddh.maDonHang " +
//             "GROUP BY s.hinhAnh, s.id, s.tenSach, s.donGia, s.giaGoc " +
//             "ORDER BY soLuongBanDuoc DESC")
//     List<Object[]> thongKeSanPhamBanDuocTop8(Pageable pageable);

    // tổng số lượng tồn
    @Query("SELECT SUM(sp.soLuong) FROM SanPham sp")
    Long getTongSoLuongSanPham();
}
