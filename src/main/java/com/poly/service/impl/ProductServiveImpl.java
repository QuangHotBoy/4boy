package com.poly.service.impl;

import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.poly.dao.SanPhamDAO;
import com.poly.model.SanPham;
import com.poly.service.ProductService;

import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional

public class ProductServiveImpl implements ProductService {
    @Autowired
    SanPhamDAO spDao;

    public List<SanPham> findAll() {
        return spDao.findAll();
    }

    public SanPham findById(Long id) {

        return spDao.findById(id).orElse(null);
    }

    // public List<PhanLoai> findByCategoryId(String cid) {
    // return pldao.findByCategoryId(cid);
    // }

    public SanPham create(SanPham sanPham) {
        return spDao.save(sanPham);
    }

    public SanPham update(SanPham sanPham) {
        return spDao.save(sanPham);
    }

    // public void delete(Integer id) {
    // nxbDao.deleteById(id);
    // }
}
