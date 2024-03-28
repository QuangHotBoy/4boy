package com.poly.service.impl;

import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.poly.dao.NhaXuatBanDAO;

import com.poly.model.NhaXuatBan;

import com.poly.service.SupplierService;
import org.springframework.transaction.annotation.Transactional;
@Service
@Transactional
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    NhaXuatBanDAO nxbDao;

    public List<NhaXuatBan> findAll() {
        return nxbDao.findAll();
    }

    public NhaXuatBan findById(Integer id) {
        return nxbDao.findById(id).get();
    }

    // public List<PhanLoai> findByCategoryId(String cid) {
    // return pldao.findByCategoryId(cid);
    // }

    public NhaXuatBan create(NhaXuatBan nhaXuatBan) {
        return nxbDao.save(nhaXuatBan);
    }

    public NhaXuatBan update(NhaXuatBan nhaXuatBan) {
        return nxbDao.save(nhaXuatBan);
    }

    // public void delete(Integer id) {
    //     nxbDao.deleteById(id);
    // }
}
