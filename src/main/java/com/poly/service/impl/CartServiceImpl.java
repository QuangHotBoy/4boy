package com.poly.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poly.dao.ChiTietGioHangDAO;
import com.poly.dao.GioHangDAO;
import com.poly.model.ChiTietGioHang;
import com.poly.model.GioHang;
import com.poly.service.CartService;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    GioHangDAO cartDAO;

    @Autowired
    ChiTietGioHangDAO detailDAO;

    @Override
    public GioHang create(JsonNode cartData) {

        ObjectMapper mapper = new ObjectMapper();

        GioHang check = cartDAO.findByTenDangNhap(cartData.get("taiKhoan_gioHang").asText());

        GioHang cart = mapper.convertValue(cartData, GioHang.class);

        if (check == null) {
            cartDAO.save(cart);
        }else{
            cart.setId(check.getId());
        }

        TypeReference<List<ChiTietGioHang>> type = new TypeReference<List<ChiTietGioHang>>() {
        };

        List<ChiTietGioHang> details = mapper.convertValue(cartData.get("gioHang"), type).stream()
                .peek(c -> c.setGioHang(cart)).collect(Collectors.toList());

        detailDAO.saveAll(details);

        return cart;
    }

}
