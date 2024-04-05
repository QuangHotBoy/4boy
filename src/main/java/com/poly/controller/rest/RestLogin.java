package com.poly.controller.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.poly.dao.DiaChi_TaiKhoanDAO;
import com.poly.dao.DonDatHangDAO;
import com.poly.dao.QuyenDAO;
import com.poly.dao.Quyen_TaiKhoanDAO;
import com.poly.dao.TaiKhoanDAO;
import com.poly.model.ChiTietDonDatHang;
import com.poly.model.DiaChi_TaiKhoan;
import com.poly.model.DonDatHang;
import com.poly.model.Quyen;
import com.poly.model.Quyen_TaiKhoan;
import com.poly.model.TaiKhoan;
import com.poly.service.AccountService;
import com.poly.service.AddressService;
import com.poly.service.DetailOrderService;
import com.poly.service.OrderService;

import jakarta.websocket.server.PathParam;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody; 

@CrossOrigin("*")
@RestController
public class RestLogin {

    @Autowired
    TaiKhoanDAO TKDao;

    @Autowired
	AccountService AccountService;

    @Autowired
    Quyen_TaiKhoanDAO QTKDao;

    @Autowired
    QuyenDAO quyenDao;

    @Autowired
    DiaChi_TaiKhoanDAO dChiDao;

    @Autowired
    DonDatHangDAO DHDao;
    
    @Autowired
    OrderService orderImp;

    @Autowired
    AddressService addressImp;

    @Autowired
    DetailOrderService detailOrderService;

    @GetMapping("/rest/login")
    public Map<String, Object> findall() {
         Map<String, Object> data = new HashMap<>();

        List<TaiKhoan> accounts = TKDao.findAll();
        List<DiaChi_TaiKhoan> address = dChiDao.findAll();

        data.put("users", accounts);
        data.put("address", address);

        return data;
    }
    
    @GetMapping("/rest/auth/invoice/{tenDangNhap}")
    List<DonDatHang> findbyTDN(@PathVariable("tenDangNhap") String tenDangNhap){
        return orderImp.findByTDN(tenDangNhap);
    }

    @GetMapping("/rest/auth/getTrueAddress/{tenDangNhap}")
    DiaChi_TaiKhoan findAddressTrue(@PathVariable("tenDangNhap") String tenDangNhap){
        return addressImp.getTrueAddress(tenDangNhap);
    }

    @GetMapping("/rest/auth/getFalseAddress/{tenDangNhap}")
    List<DiaChi_TaiKhoan> getAll(@PathVariable("tenDangNhap") String tenDangNhap){
        return addressImp.getDCFalse(tenDangNhap);
    }

//     @GetMapping("/rest/invoice/detailtinvoice/{maDonHang}")
//    DonDatHang detailInvoice(@PathVariable("maDonHang") Integer maDonHang){
//        return orderImp.findbyId(maDonHang);
//     }

   @GetMapping("/rest/auth/editpass/{tenDangNhap}")
	TaiKhoan editstaff(@PathVariable("tenDangNhap") String tenDangNhap) {
		return AccountService.FindById(tenDangNhap);
	}

   @GetMapping("/rest/getaddress/{id}")
   DiaChi_TaiKhoan getOne(@PathVariable("id") Long id) {
	   return addressImp.findbyId(id);
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
