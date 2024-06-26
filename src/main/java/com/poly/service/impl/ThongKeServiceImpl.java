package com.poly.service.impl;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

import com.poly.dao.ChiTietDonDatHangDAO;
import com.poly.dao.DonDatHangDAO;
import com.poly.dao.SanPhamDAO;
import com.poly.model.SanPham;
import com.poly.service.ThongKeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ThongKeServiceImpl implements ThongKeService {
    @Autowired
    ChiTietDonDatHangDAO chiTietDonDatHangDAO;
    @Autowired
    SanPhamDAO sanPhamDAO;
    @Autowired
    DonDatHangDAO donDatHangDAO;

    public List<Object[]> getTopSachByTinhTrang() {
        return chiTietDonDatHangDAO.getTopSachByTinhTrang();
    }

    public List<Object[]> findTopSachTonKhoNhieuNhat() {
        return sanPhamDAO.findTopSachTonKhoNhieuNhat();
    }

    public List<Object[]> findTop10Products() {
        return sanPhamDAO.findTop10Products();
    }

    public List<Object[]> thongKeDoanhThuTheoThang() {
        return donDatHangDAO.thongKeDoanhThuTheoThang();
    }

    public BigDecimal getTotalRevenueByDateRange(Timestamp startDate, Timestamp endDate) {
        return donDatHangDAO.getTotalRevenueByDateRange(startDate, endDate);
    }

    public List<Object[]> getTongSoLuongSanPham() {
        return sanPhamDAO.getTongSoLuongSanPham();
    }
    public List<Object[]> getTongTien() {
        return sanPhamDAO.getTongTien();
    }
    public List<Object[]> countDonDatHangThisMonth() {
        return sanPhamDAO.countDonDatHangThisMonth();
    }
}
