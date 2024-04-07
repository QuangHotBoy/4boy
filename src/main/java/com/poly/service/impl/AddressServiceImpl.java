package com.poly.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.dao.DiaChi_TaiKhoanDAO;
import com.poly.model.DiaChi_TaiKhoan;
import com.poly.service.AddressService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AddressServiceImpl  implements AddressService{

	@Autowired
	DiaChi_TaiKhoanDAO dChiDao;
	
	@Override
	public List<DiaChi_TaiKhoan> getDCFalse(String tenDangNhap) { 
		return dChiDao.findALLDC(tenDangNhap) ;
	}
 
	@Override
	public DiaChi_TaiKhoan create(DiaChi_TaiKhoan diaChi) { 
		return dChiDao.save(diaChi);
	}

	@Override
	public DiaChi_TaiKhoan update(DiaChi_TaiKhoan diachi) { 
		if(diachi.getMacDinh()== true){
			String tenDangNhap = diachi.getTaiKhoan_diaChi().getTenDangNhap();
			DiaChi_TaiKhoan dchi = dChiDao.findByTaiKhoan(tenDangNhap);
			dchi.setMacDinh(false);
			return dChiDao.save(diachi);
		} 
		return dChiDao.save(diachi);
	}

	@Override
	public DiaChi_TaiKhoan getTrueAddress(String tenDangNhap) { 
		
		return dChiDao.findByTaiKhoan(tenDangNhap);
	}

	@Override
	public DiaChi_TaiKhoan findbyId(Long id) { 
		return dChiDao.findById(id).get();
	}

	@Override
	public DiaChi_TaiKhoan findDCTrue() { 
		return dChiDao.findALLDCTrue();
	}

}
