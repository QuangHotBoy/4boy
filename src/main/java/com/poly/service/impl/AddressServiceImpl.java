package com.poly.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.poly.dao.DiaChi_TaiKhoanDAO;
import com.poly.dao.TaiKhoanDAO;
import com.poly.model.DiaChi_TaiKhoan;
import com.poly.model.TaiKhoan;
import com.poly.service.AddressService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AddressServiceImpl implements AddressService {

	@Autowired
	DiaChi_TaiKhoanDAO dChiDao;

	@Autowired
	TaiKhoanDAO accountDAO;

	@Override
	public List<DiaChi_TaiKhoan> getDCFalse(String tenDangNhap) {
		return dChiDao.findALLDC(tenDangNhap);
	}

	@Override
	public DiaChi_TaiKhoan create(DiaChi_TaiKhoan diaChi) {
		if (diaChi.getMacDinh() == true) {
			String tenDangNhap = diaChi.getTaiKhoan_diaChi().getTenDangNhap();
			DiaChi_TaiKhoan dchi = dChiDao.findByTaiKhoan(tenDangNhap);
			dchi.setMacDinh(false);
			return dChiDao.save(diaChi);
		}
		return dChiDao.save(diaChi);
	}

	@Override
	public DiaChi_TaiKhoan update(DiaChi_TaiKhoan diachi) {
		if (diachi.getMacDinh() == true) {
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

	@Override
	public DiaChi_TaiKhoan delete(Long id) {

		dChiDao.deleteById(id);
		return null;
	}

	@Override
	public List<DiaChi_TaiKhoan> getAllByUser(String user_id) {
		// TODO Auto-generated method stub

		List<DiaChi_TaiKhoan> list = dChiDao.findByTaiKhoan_diaChi(user_id);

		return list;
	}

}
