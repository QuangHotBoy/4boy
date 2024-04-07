package com.poly.service.impl;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import com.poly.dao.ChiTietDonDatHangDAO;
import com.poly.dao.DonDatHangDAO;
import com.poly.dao.SanPhamDAO;
import com.poly.service.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

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
}
