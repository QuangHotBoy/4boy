package com.poly.controller.rest;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RestController;

import com.poly.dao.ChiTietDonDatHangDAO;
import com.poly.dao.DiaChi_TaiKhoanDAO;
import com.poly.dao.DonDatHangDAO;
import com.poly.dao.MaGiamGiaDAO;
import com.poly.dao.PhuongThucThanhToanDAO;
import com.poly.dao.SanPhamDAO;
import com.poly.dao.TaiKhoanDAO;
import com.poly.dao.TinhTrangDonDatHangDAO;
import com.poly.model.ChiTietDonDatHang;
import com.poly.model.DiaChi_TaiKhoan;
import com.poly.model.DonDatHang;
import com.poly.model.MaGiamGia;
import com.poly.model.PhuongThucThanhToan;
import com.poly.model.SanPham;
import com.poly.model.TaiKhoan;
import com.poly.model.TinhTrangDonDatHang;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin("*")
@RestController
public class RestCheckoutCotroller {

    @Autowired
    MaGiamGiaDAO voucherDAO;

    @Autowired
    TaiKhoanDAO accountDAO;

    @Autowired
    DonDatHangDAO orderDAO;

    @Autowired
    ChiTietDonDatHangDAO orderDetailDAO;

    @Autowired
    SanPhamDAO productDAO;

    @Autowired
    TinhTrangDonDatHangDAO orderStatusDAO;

    @Autowired
    PhuongThucThanhToanDAO paymentDAO;

    @Autowired
    DiaChi_TaiKhoanDAO addressDAO;

    @PostMapping("shop/check-out/add-voucher")
    @ResponseBody
    public Map<String, Object> checkVoucher(@RequestParam("voucher") String id, @RequestParam("total") Long total) {
        Map<String, Object> response = new HashMap<>();

        MaGiamGia voucher = voucherDAO.findById(id).orElse(null);

        if (voucher != null) {
            response.put("isValid", true);
            if (voucher.getSoLuong() == 0 || voucher.getKetThuc()) {
                response.put("isActive", true);
                if (voucher.getDieuKien().longValue() <= total) {
                    response.put("isTrue", true);
                    response.put("dateEnd", voucher.getNgayKetThuc());
                    response.put("discount", voucher.getSoTienGiam());
                } else {
                    response.put("isTrue", false);
                }
            } else {
                response.put("isActive", false);
            }
        } else {
            response.put("isValid", false);
        }

        return response;
    }

    @RequestMapping("shop/order/complete")
    public String orderComplete(@Valid DonDatHang donDatHang, BindingResult bindingResult,
            HttpServletRequest req) {
        TaiKhoan currentUser = accountDAO.findByTenDangNhap("poly");
        DiaChi_TaiKhoan addressDefault = addressDAO.findByTaiKhoan(currentUser.getTenDangNhap());
        TinhTrangDonDatHang status = orderStatusDAO.findById(9).get();

        String hoTen = req.getParameter("hoTen");
        String dienThoai = req.getParameter("dienThoai");
        String email = req.getParameter("email");
        String voucher = req.getParameter("voucher");
        String total = req.getParameter("payments");

        PhuongThucThanhToan pttt = paymentDAO.findById(Integer.parseInt(req.getParameter("pay-method"))).get();

        DonDatHang order = new DonDatHang();
        order.setTaiKhoan_donHang(currentUser);
        order.setHoTen(hoTen);
        order.setDiaChiNhanHang(addressDefault);
        order.setSoDienThoai(dienThoai);
        order.setMail(email);
        if (voucher != null) {
            MaGiamGia maGiamGia = voucherDAO.findById(voucher).orElse(null);
            order.setMaGiamGia(maGiamGia);
            if (pttt.getId() == 1 && maGiamGia != null) {
                maGiamGia.setSoLuong(maGiamGia.getSoLuong() - 1);
                voucherDAO.save(maGiamGia);
            }

        } else {
            order.setMaGiamGia(null);
        }

        order.setPhuongThucThanhToan(pttt);
        order.setNgayDatHang(new Timestamp(System.currentTimeMillis()));
        order.setTongTien(new BigDecimal("100000"));
        order.setTrangThai_donDatHang(status);

        orderDAO.save(order);

        // ArrayList<ChiTietDonDatHang> listDInvoice = new ArrayList<>();

        Long maSP = Long.parseLong(req.getParameter("maSP"));
        SanPham item = productDAO.findById(maSP).get();
        String donGiaParam = req.getParameter("prices");
        BigDecimal donGia = new BigDecimal(donGiaParam);
        Integer soLuong = Integer.parseInt(req.getParameter("soLuong"));

        ChiTietDonDatHang detailOrder = new ChiTietDonDatHang();
        detailOrder.setDonDatHang(order);
        detailOrder.setDonGia(donGia);
        detailOrder.setSanPham_donDatHang(item);
        detailOrder.setSoLuong(soLuong);

        orderDetailDAO.save(detailOrder);

        SanPham product = productDAO.findById(maSP).get();

        Integer pSoLuong = product.getSoLuong() - soLuong;

        product.setSoLuong(pSoLuong);

        productDAO.save(product);

        return new String();
    }

}
