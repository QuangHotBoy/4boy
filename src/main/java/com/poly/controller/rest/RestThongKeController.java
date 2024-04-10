package com.poly.controller.rest;

import java.sql.Timestamp;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poly.model.SanPham;
import com.poly.service.ThongKeService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/topByTinhTrang")
public class RestThongKeController {
    @Autowired
    private ThongKeService thongKeService;

    @GetMapping("/topByTinhTrang")
    public List<Object[]> getTopSachByTinhTrang() {
        return thongKeService.getTopSachByTinhTrang();
    }

    @GetMapping("/toptonkho")
    public List<Object[]> getTopTonKho() {
        return thongKeService.findTopSachTonKhoNhieuNhat();
    }

    @GetMapping("/top10")
    public List<Object[]> getTop10() {
        return thongKeService.findTop10Products();
    }

    @GetMapping("/thongke")
    public List<Object[]> thongKeDoanhThuTheoThang() {
        return thongKeService.thongKeDoanhThuTheoThang();
    }

    @GetMapping("/doanhthu")
    public BigDecimal getDoanhThuByDateRange(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(23, 59, 59);
        BigDecimal totalRevenue = thongKeService.getTotalRevenueByDateRange(
                Timestamp.valueOf(startDateTime),
                Timestamp.valueOf(endDateTime));
        return totalRevenue;
    }

    @GetMapping("/tong-so-luong-san-pham")
    public List<Object[]> getTongSoLuongSanPham() {
        return thongKeService.getTongSoLuongSanPham();
    }
    @GetMapping("/tong-tien")
    public List<Object[]> getTongTien() {
        return thongKeService.getTongTien();
    }

    @GetMapping("/donhangcount")
    public List<Object[]> countDonDatHangThisMonth() {
        return thongKeService.countDonDatHangThisMonth();
    }
}
