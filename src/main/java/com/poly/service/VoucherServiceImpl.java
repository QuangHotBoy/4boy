package com.poly.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.dao.MaGiamGiaDAO;
import com.poly.model.MaGiamGia;

@Service
public class VoucherServiceImpl implements VoucherService {

    @Autowired
    MaGiamGiaDAO mggDAO;

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
}
