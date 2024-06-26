package com.poly.controller.rest;

import java.sql.Timestamp;
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
import com.poly.model.DiaChi_TaiKhoan;
import com.poly.model.DonDatHang;
import com.poly.model.Quyen_TaiKhoan;
import com.poly.model.SachYeuThich;
import com.poly.model.SanPham;
import com.poly.model.TaiKhoan;
import com.poly.service.AccountService;
import com.poly.service.AddressService;
import com.poly.service.DetailOrderService;
import com.poly.service.OrderService;
import com.poly.service.QuyenService;
import com.poly.service.QuyenTKService;
import com.poly.service.FavoritesService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

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

	@Autowired
	FavoritesService favoriteService;

	@Autowired
	QuyenTKService QuyenTKService;

	@GetMapping("/rest/login")
	public Map<String, Object> findall() {
		Map<String, Object> data = new HashMap<>();

		List<TaiKhoan> accounts = TKDao.findAll();
		List<DiaChi_TaiKhoan> address = dChiDao.findAll();

		data.put("users", accounts);
		data.put("address", address);

		return data;
	}
 

    @GetMapping("/rest/findrole/{tenDangNhap}")
    Quyen_TaiKhoan findbyId(@PathVariable("tenDangNhap") String tenDangnhap){
        return QuyenTKService.findById(tenDangnhap);
    }

	@PostMapping("/rest/register")
	TaiKhoan postMethodName(@RequestBody TaiKhoan taiKhoan) {
		AccountService.register(taiKhoan, "CUST");
		return taiKhoan;
	}

	@GetMapping("/rest/auth/invoice/{tenDangNhap}")
	List<DonDatHang> findbyTDN(@PathVariable("tenDangNhap") String tenDangNhap) {
		return orderImp.findByTDN(tenDangNhap);
	}

	@GetMapping("/rest/auth/getTrueAddress/{tenDangNhap}")
	DiaChi_TaiKhoan findAddressTrue(@PathVariable("tenDangNhap") String tenDangNhap) {
		return addressImp.getTrueAddress(tenDangNhap);
	}

	@GetMapping("/rest/auth/getFalseAddress/{tenDangNhap}")
	List<DiaChi_TaiKhoan> getAll(@PathVariable("tenDangNhap") String tenDangNhap) {
		return addressImp.getDCFalse(tenDangNhap);
	}

	@GetMapping("/rest/auth/editpass/{tenDangNhap}")
	TaiKhoan editstaff(@PathVariable("tenDangNhap") String tenDangNhap) {
		return AccountService.FindById(tenDangNhap);
	}

	@GetMapping("/rest/getaddress/{id}")
	DiaChi_TaiKhoan getOne(@PathVariable("id") Long id) {
		return addressImp.findbyId(id);
	}

	@PutMapping("/rest/account/update/{tenDangNhap}")
	TaiKhoan updateinfo(@PathVariable("tenDangNhap") String tendangNhap, @RequestBody TaiKhoan taiKhoan) {
		return AccountService.update(taiKhoan);
	}

	@PutMapping("/rest/account/updatepass/{tenDangNhap}")
	TaiKhoan updatepass(@PathVariable("tenDangNhap") String tenDangNhap, @RequestParam("pass1") String matKhaumoi) {
		TaiKhoan tk = AccountService.FindById(tenDangNhap);
		return AccountService.updatePass(tk, matKhaumoi);
	}

	@PutMapping("/rest/address/updateTrue/{id}")
	DiaChi_TaiKhoan updateTrue(@PathVariable("id") Integer id, @RequestBody DiaChi_TaiKhoan diachi) {
		return addressImp.update(diachi);
	}

	@PutMapping("/rest/address/updateFalse/{id}")
	DiaChi_TaiKhoan updateFalse(@PathVariable("id") Integer id, @RequestBody DiaChi_TaiKhoan diachi) {
		return addressImp.update(diachi);

	}

	@PostMapping("/rest/address/add/{tenDangNhap}")
	DiaChi_TaiKhoan post(@PathVariable("tenDangNhap") String tenDangNhap, @RequestBody DiaChi_TaiKhoan diachi) {
		TaiKhoan tk = AccountService.FindById(tenDangNhap);
		diachi.setTaiKhoan_diaChi(tk);
		return addressImp.create(diachi);
	}

	@DeleteMapping("/rest/address/delete/{id}")
	public void delete(@PathVariable("id") Long id) {
		addressImp.delete(id);
	}

	@GetMapping("/rest/address/all-of-user/{id}")
	public List<DiaChi_TaiKhoan> findAllByUser(@PathVariable("id") String id) {
		return addressImp.getAllByUser(id);
	}

	@PostMapping("/rest/account/addfavorite/{user}/{product}")
	public SachYeuThich post(@PathVariable("user") String user, @PathVariable("product") Long isbn) {

		return favoriteService.addSachYT(user, isbn);
	}

	@GetMapping("/rest/account/deletefavorite/{user}/{product}")
	public SachYeuThich deleteFavovite(@PathVariable("user") String user, @PathVariable("product") Long isbn) {
		return favoriteService.deleteSach(user, isbn);
	}

	@GetMapping("/rest/accont/favorites/{tenDangNhap}")
	List<SachYeuThich> GetAll(@PathVariable("tenDangNhap") String tenDangNhap) {
		return favoriteService.getAllProduct(tenDangNhap);
	}

}
