package com.poly.service;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.poly.model.DonDatHang;

public interface OrderService {
    public DonDatHang create(JsonNode orderData) ;

    public Map<String, Object> checkOrder(String id, Long isbn);

    List<DonDatHang> findByTDN(String tenDangNhap);
}
