package com.poly.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.dao.DanhGiaDAO;
import com.poly.dao.SanPhamDAO;
import com.poly.model.DanhGia;
import com.poly.model.SanPham;
import com.poly.service.ReviewService;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    DanhGiaDAO reviewDAO;

    @Autowired
    SanPhamDAO productDAO;

    @Override
    public DanhGia create(DanhGia reviewData) {

        return reviewDAO.save(reviewData);
    }

    @Override
    public List<DanhGia> findByProduct(Long id) {
        // TODO Auto-generated method stub
        SanPham product = productDAO.findById(id).get();

        List<DanhGia> reviews = reviewDAO.findBySanPham_danhGia(product.getIsbn());

        return reviews;
    }

    @Override
    public Map<String, Object> checkUserReview(String user, Long id) {
        // TODO Auto-generated method stub
        Map<String, Object> data = new HashMap<>();

        DanhGia checked = reviewDAO.findByTaiKhoan_danhGia(user, id);

        if (checked != null) {
            data.put("isTrue", true);
            data.put("rating", checked.getRating());
            data.put("review", checked.getNoiDung());
            data.put("date", checked.getNgayDanhGia());
        } else {
            data.put("isTrue", false);
        }

        return data;
    }

}
