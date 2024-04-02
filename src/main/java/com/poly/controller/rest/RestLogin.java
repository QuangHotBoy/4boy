package com.poly.controller.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.poly.dao.DiaChi_TaiKhoanDAO;
import com.poly.dao.QuyenDAO;
import com.poly.dao.Quyen_TaiKhoanDAO;
import com.poly.dao.TaiKhoanDAO;
import com.poly.model.DiaChi_TaiKhoan;
import com.poly.model.Quyen;
import com.poly.model.Quyen_TaiKhoan;
import com.poly.model.TaiKhoan;
 

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody; 

@CrossOrigin("*")
@RestController
public class RestLogin {

    @Autowired
    TaiKhoanDAO TKDao;

    @Autowired
    Quyen_TaiKhoanDAO QTKDao;

    @Autowired
    QuyenDAO quyenDao;

    @Autowired
    DiaChi_TaiKhoanDAO dChiDao;

    @GetMapping("/rest/login")
    public Map<String, Object> findall() {
         Map<String, Object> data = new HashMap<>();

        List<TaiKhoan> accounts = TKDao.findAll();
        List<DiaChi_TaiKhoan> address = dChiDao.findAll();

        data.put("users", accounts);
        data.put("address", address);

        return data;
    }

    @PostMapping("/rest/register")
    public TaiKhoan register(@RequestBody TaiKhoan taiKhoan) {
        TKDao.save(taiKhoan);
        System.out.println(taiKhoan);
        // them quyen
        Quyen quyen = quyenDao.findById("CUST").get();
        Quyen_TaiKhoan QTK = new Quyen_TaiKhoan();
        QTK.setQuyen(quyen);
        QTK.setTaiKhoan_quyen(taiKhoan);
        // them dia chi
        DiaChi_TaiKhoan diaChi = new DiaChi_TaiKhoan();
        diaChi.setTaiKhoan_diaChi(taiKhoan);
        diaChi.setHoTen(taiKhoan.getHoTen());
        diaChi.setDiaChi("Chưa có địa chỉ");
        diaChi.setMacDinh(true);
        dChiDao.save(diaChi);
        return taiKhoan;

        

    }

    

}
