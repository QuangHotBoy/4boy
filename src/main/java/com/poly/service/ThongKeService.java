package com.poly.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.poly.dao.ChiTietDonDatHangDAO;

@Service
public interface ThongKeService {
    List<Object[]> getTopSachByTinhTrang();
}
