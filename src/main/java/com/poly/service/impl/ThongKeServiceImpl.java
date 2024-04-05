package com.poly.service.impl;
import java.util.List;
import com.poly.dao.ChiTietDonDatHangDAO;
import com.poly.service.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ThongKeServiceImpl implements ThongKeService {
    @Autowired
    ChiTietDonDatHangDAO chiTietDonDatHangDAO;
    
    public List<Object[]> getTopSachByTinhTrang() {
        return chiTietDonDatHangDAO.getTopSachByTinhTrang();
    }
}
