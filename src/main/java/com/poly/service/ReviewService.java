package com.poly.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.poly.model.DanhGia;

import jakarta.transaction.Transactional;

@Service
@Transactional
public interface ReviewService {

    DanhGia create(DanhGia reviewData);

    List<DanhGia> findByProduct(Long id);

    Map<String, Object> checkUserReview(String user, Long id);

}
