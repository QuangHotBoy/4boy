package com.poly.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poly.dao.SanPhamDAO;
import com.poly.dao.TinhTrangSanPhamDAO;
import com.poly.model.NhaXuatBan;
import com.poly.model.SanPham;
import com.poly.model.TrangThaiSach;
import com.poly.service.TinhTrangProductService;

@Service
@Transactional
public class TinhTrangProductImpl implements TinhTrangProductService {
    @Autowired
    TinhTrangSanPhamDAO tinhTrangDao;

    public List<TrangThaiSach> findAll() {
        return tinhTrangDao.findAll();

    }

    public TrangThaiSach findById(Integer id) {
        return tinhTrangDao.findById(id).get();
    }

    // public List<PhanLoai> findByCategoryId(String cid) {
    // return pldao.findByCategoryId(cid);
    // }

    public TrangThaiSach create(TrangThaiSach trangThaiSach) {
        return tinhTrangDao.save(trangThaiSach);
    }

    public TrangThaiSach update(TrangThaiSach trangThaiSach) {
        return tinhTrangDao.save(trangThaiSach);
    }

}
