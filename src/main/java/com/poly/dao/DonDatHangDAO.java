package com.poly.dao;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.math.BigDecimal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.poly.model.DonDatHang;

public interface DonDatHangDAO extends JpaRepository<DonDatHang, Integer> {
    // Các phương thức tùy chỉnh nếu cần
    @Query("SELECT a FROM DonDatHang a Where a.taiKhoan_donHang.tenDangNhap = :user")
    List<DonDatHang> findByTDN(@Param("user") String user);

    // thống kê theo tháng
    // List<DonDatHang> findByNgayDatHangBetween(Timestamp startDate, Timestamp
    // endDate);

    // thống kê theo ngày

    // @Query("SELECT d FROM DonDatHang d WHERE DAY(d.ngayDatHang) = :day AND
    // MONTH(d.ngayDatHang) = :month AND YEAR(d.ngayDatHang) = :year AND
    // d.trangThai_donDatHang = '6'")
    // List<DonDatHang> findByNgayDatHangDate(@Param("day") int day, @Param("month")
    // int month, @Param("year") int year);

    // // thống kê tháng
    // @Query("SELECT d FROM DonDatHang d WHERE MONTH(d.ngayDatHang) = :month AND
    // d.trangThai_donDatHang = '6'")
    // List<DonDatHang> findByNgayDatHangMonth(@Param("month") int month);

    // // Thống kê theo năm
    // @Query("SELECT d FROM DonDatHang d WHERE YEAR(d.ngayDatHang) = :year AND
    // d.trangThai_donDatHang = '6'")
    // List<DonDatHang> findByNgayDatHangYear(int year);

    // // Thống kê doanh thu hôm nay
    // @Query("SELECT d FROM DonDatHang d WHERE CAST(d.ngayDatHang AS date) =
    // CURRENT_DATE AND d.trangThai_donDatHang = '6'")
    // List<DonDatHang> findAllByNgayDatHangToday();

    // // Doanh thu tháng này
    // @Query("SELECT d FROM DonDatHang d WHERE MONTH(d.ngayDatHang) =
    // MONTH(CURRENT_DATE) AND YEAR(d.ngayDatHang) = YEAR(CURRENT_DATE) AND
    // d.trangThai_donDatHang = '6'")
    // List<DonDatHang> findAllByNgayDatHangThisMonth();

    // // Doanh thu năm hiện tại
    // @Query("SELECT d FROM DonDatHang d WHERE YEAR(d.ngayDatHang) =
    // YEAR(CURRENT_DATE) AND d.trangThai_donDatHang = '6'")
    // List<DonDatHang> findAllByNgayDatHangThisYear();

    @Query("SELECT a FROM DonDatHang a Where a.taiKhoan_donHang.tenDangNhap = :user")
    DonDatHang findByTenDangNhap(@Param("user") String user);

    // @Query("SELECT d.maDonHang FROM DonDatHang d")
    // Page<DonDatHang> findByMaDonHang(@Param("maDonHang") int maDonHang, Pageable
    // pageable);
    @Query("SELECT d FROM DonDatHang d WHERE d.maDonHang = :maDonHang")
    Page<DonDatHang> findByMaDonHang(@Param("maDonHang") Integer maDonHang, Pageable pageable);

    @Query("SELECT s FROM DonDatHang s WHERE s.taiKhoan_donHang.tenDangNhap = :user AND s.maGiamGia.id = :voucher")
    DonDatHang findByUserAndVoucher(@Param("user") String user, @Param("voucher") String voucher);

    @Query(value = "SELECT d FROM DonDatHang d ORDER BY d.id DESC")
    List<DonDatHang> findLatestOrders();

    // thống kê doanh thu tháng
    @Query("SELECT MONTH(dh.ngayDatHang) AS thang, SUM(dh.tongTien) AS doanhThu, SUM(ct.soLuong) AS soLuongBan " +
            "FROM DonDatHang dh " +
            "LEFT JOIN ChiTietDonDatHang ct ON dh.maDonHang = ct.donDatHang.maDonHang " +
            "WHERE dh.trangThai_donDatHang.id = 5 " +
            "GROUP BY MONTH(dh.ngayDatHang)")
    List<Object[]> thongKeDoanhThuTheoThang();

    // thống kê doanh thu nhập vào
    @Query("SELECT SUM(d.tongTien) FROM DonDatHang d WHERE d.ngayDatHang BETWEEN :startDate AND :endDate")
    BigDecimal sumTotalRevenueByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

}
