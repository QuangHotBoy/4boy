package com.poly.service;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.poly.model.DonDatHang;

public interface OrderService {
    public DonDatHang create(JsonNode orderData) ;
    
    public DonDatHang findbyId(Integer maDonHang);
      
    public Map<String, Object> checkOrder(String id, Long isbn);

    List<DonDatHang> findByTDN(String tenDangNhap);
    
    List<Object[]> getTopSachByTinhTrang();

    public static DonDatHang getOrderById(String madonhangId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getOrderById'");
    }

    public DonDatHang cancelInvoice(Integer id);

    public DonDatHang successInvoice(Integer id);
}
