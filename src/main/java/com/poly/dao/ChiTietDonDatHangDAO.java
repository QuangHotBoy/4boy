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
	ChiTietDonDatHang findByDonDatHangAndSanPhamDonDatHang(@Param("idOrder") Integer idOrder,
			@Param("idProduct") Long id);

	@Query("SELECT s FROM ChiTietDonDatHang s WHERE s.donDatHang.id = :idOrder")
	List<ChiTietDonDatHang> findByMaDonDatHang(@Param("idOrder") Integer idOrder);

	// top 5 sản phẩm bán chạy
	@Query("SELECT s.tenSach AS TenSach, SUM(ct.soLuong) AS TongSoLuongDaBan, SUM(ct.soLuong * ct.donGia) AS TongDoanhThu "
			+ "FROM ChiTietDonDatHang ct " + "INNER JOIN ct.sanPham_donDatHang s " + "INNER JOIN ct.donDatHang ddh "
			+ "INNER JOIN ddh.trangThai_donDatHang tt " + "WHERE tt.id = 6 " + "GROUP BY s.tenSach "
			+ "ORDER BY SUM(ct.soLuong) DESC")
	List<Object[]> getTopSachByTinhTrang();

	@Query("SELECT s.tenSach AS TenSach, SUM(ct.soLuong) AS TongSoLuongDaBan, s.hinhAnh AS HinhAnh, s.giaBan AS DonGia, s.isbn AS Id "
			+ "FROM ChiTietDonDatHang ct " + "INNER JOIN ct.sanPham_donDatHang s " + "INNER JOIN ct.donDatHang ddh "
			+ "INNER JOIN ddh.trangThai_donDatHang tt " + "WHERE tt.id = 6 " + "GROUP BY s.tenSach, s.hinhAnh, s.giaBan, s.isbn "
			+ "ORDER BY SUM(ct.soLuong) DESC")
	List<Object[]> getTop8SachByTinhTrang();

}
