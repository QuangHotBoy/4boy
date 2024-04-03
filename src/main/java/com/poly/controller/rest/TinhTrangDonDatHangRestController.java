package com.poly.controller.rest;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.dao.TinhTrangDonDatHangDAO;
import com.poly.model.TinhTrangDonDatHang;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/tinhtrangdhds")
public class TinhTrangDonDatHangRestController {

    @Autowired
    private TinhTrangDonDatHangDAO ttddhDao;

    public List<TinhTrangDonDatHang> getAllTinhTrangDonDatHangs() {
        return ttddhDao.findAll();
    }
}
