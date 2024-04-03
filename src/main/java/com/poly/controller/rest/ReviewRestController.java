package com.poly.controller.rest;

import java.sql.Timestamp;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.poly.dao.SanPhamDAO;
import com.poly.dao.TaiKhoanDAO;
import com.poly.model.DanhGia;
import com.poly.model.SanPham;
import com.poly.model.TaiKhoan;
import com.poly.service.ReviewService;

@RestController
public class ReviewRestController {

    @Autowired
    ReviewService reviewService;

    @Autowired
    SanPhamDAO productDAO;

    @Autowired
    TaiKhoanDAO accountDAO;

    @PostMapping("/rest/review/{id}/{rating}/{review}/{user}")
    @ResponseBody
    public DanhGia create(@PathVariable("id") Long id, @PathVariable("rating") int rating,
            @PathVariable("review") String comment, @PathVariable("user") String userId) {

        SanPham product = productDAO.findById(id).get();

        TaiKhoan account = accountDAO.findByTenDangNhap(userId);

        DanhGia review = new DanhGia();
        review.setNoiDung(comment);
        review.setRating(rating);
        review.setSanPham_danhGia(product);
        review.setTaiKhoan_danhGia(account);
        review.setNgayDanhGia(new Timestamp(System.currentTimeMillis()));

        return reviewService.create(review);
    }
}
