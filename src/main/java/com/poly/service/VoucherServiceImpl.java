package com.poly.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.dao.DonDatHangDAO;
import com.poly.dao.MaGiamGiaDAO;
import com.poly.dao.TaiKhoanDAO;
import com.poly.model.DonDatHang;
import com.poly.model.MaGiamGia;
@Service
public class VoucherServiceImpl implements VoucherService {

    @Autowired
    MaGiamGiaDAO mggDAO;

    @Autowired
    TaiKhoanDAO accountDAO;

    @Autowired
    DonDatHangDAO orderDAO;

    public List<MaGiamGia> findAll() {
        return mggDAO.findAll();
    }

    public MaGiamGia findById(String id) {
        return mggDAO.findById(id).orElse(null);
    }

    public MaGiamGia create(MaGiamGia maGiamGia) {
        return mggDAO.save(maGiamGia);
    }

    public MaGiamGia update(MaGiamGia maGiamGia) {
        return mggDAO.save(maGiamGia);
    }

    public void delete(String id) {
        mggDAO.deleteById(id);
    }

    public MaGiamGia findByTenMa(String tenMa) {
        return mggDAO.findByTenMa(tenMa);
    }

    public Map<String, Object> checkVoucher(String voucherCdoe, Long total, String id){

        MaGiamGia voucher = mggDAO.findById(voucherCdoe).orElse(null);

        DonDatHang order = orderDAO.findByUserAndVoucher(id, voucherCdoe);

        Map<String, Object> response = new HashMap<>();

        if (voucher != null) {
            response.put("isValid", true);
            if (voucher.getSoLuong() >= voucher.getDaSuDung() || voucher.getKetThuc()) {
                response.put("isActive", true);
                if(order == null){
                    response.put("isUse", true);
                    if (voucher.getDieuKien().longValue() <= total) {
                        response.put("isTrue", true);
                        response.put("dateEnd", voucher.getNgayKetThuc());
                        response.put("discount", voucher.getSoTienGiam());
                    } else {
                        response.put("isTrue", false);
                    }
                }else{
                    response.put("isUse", false);
                }
            } else {
                response.put("isActive", false);
            }
        } else {
            response.put("isValid", false);
        }

        return response;
    }
}
