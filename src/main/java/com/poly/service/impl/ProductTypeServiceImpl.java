package com.poly.service.impl;

import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.poly.dao.PhanLoaiDAO;
import com.poly.model.PhanLoai;
import com.poly.service.ProductTypeService;
import org.springframework.transaction.annotation.Transactional;
@Service
@Transactional
public class ProductTypeServiceImpl implements ProductTypeService {

    @Autowired
    PhanLoaiDAO pldao;

    public List<PhanLoai> findAll() {
        return pldao.findAll();
    }

    public PhanLoai findById(Integer id) {
        return pldao.findById(id).get();
    }

    // public List<PhanLoai> findByCategoryId(String cid) {
    // return pldao.findByCategoryId(cid);
    // }

    public PhanLoai create(PhanLoai phanLoai) {
        return pldao.save(phanLoai);
    }

    public PhanLoai update(PhanLoai phanLoai) {
        return pldao.save(phanLoai);
    }

    public void delete(Integer id) {
        pldao.deleteById(id);
    }
}
