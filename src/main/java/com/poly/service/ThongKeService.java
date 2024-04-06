package com.poly.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.poly.dao.ChiTietDonDatHangDAO;

@Service
public interface ThongKeService {
    List<Object[]> getTopSachByTinhTrang();

    List<Object[]> findTopSachTonKhoNhieuNhat();

    List<Object[]> findTop10Products();

    List<Object[]> thongKeDoanhThuTheoThang();

    BigDecimal sumTotalRevenueByDateRange(LocalDate startDate, LocalDate endDate);
    
}
