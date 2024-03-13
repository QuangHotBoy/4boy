package com.poly.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.dao.QuyenDAO;
import com.poly.model.Quyen;
import com.poly.service.QuyenService;

@Service
public class QuyenServiceImpl implements QuyenService{
    @Autowired
    QuyenDAO dao;

    public List<Quyen> findAll() {
		return dao.findAll();
	}
}
