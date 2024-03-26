package com.poly.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.poly.model.MaGiamGia;

@Service
public interface VoucherService {
    List<MaGiamGia> findAll();

    MaGiamGia findById(String id);

    MaGiamGia create(MaGiamGia maGiamGia);

    MaGiamGia update(MaGiamGia maGiamGia);

    void delete(String id);
}
