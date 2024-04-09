package com.poly.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poly.dao.ChiTietGioHangDAO;
import com.poly.dao.GioHangDAO;
import com.poly.dao.TaiKhoanDAO;
import com.poly.model.ChiTietGioHang;
import com.poly.model.GioHang;
import com.poly.service.CartService;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    GioHangDAO cartDAO;

    @Autowired
    ChiTietGioHangDAO detailDAO;

    @Autowired
    TaiKhoanDAO accountDAO;

    @Override
    public GioHang create(JsonNode cartData) {

        ObjectMapper mapper = new ObjectMapper();

        GioHang cart = mapper.convertValue(cartData, GioHang.class);

        GioHang findCart = cartDAO.findByTenDangNhap(cart.getTaiKhoan_gioHang().getTenDangNhap());

        TypeReference<List<ChiTietGioHang>> type = new TypeReference<List<ChiTietGioHang>>() {
        };

        List<ChiTietGioHang> details = mapper.convertValue(cartData.get("gioHang"), type).stream()
                .peek(c -> c.setGioHang(findCart)).collect(Collectors.toList());

        detailDAO.saveAll(details);

        return cart;
    }

    @Override
    public Map<Integer, ArrayList> findByUser(String id) {
        // TODO Auto-generated method stub
        Map<Integer, ArrayList> data = new HashMap<>();

        int key = 0;

        GioHang cart = cartDAO.findByTenDangNhap(id);

        List<ChiTietGioHang> list = detailDAO.findByGioHang(cart.getId());

        for (ChiTietGioHang dc : list) {
            ArrayList<String[]> arrays = new ArrayList<>();
            arrays.add(new String[]{"user", id});
            arrays.add(new String[]{"id", dc.getSanPham_gioHang().getIsbn() + ""});
            arrays.add(new String[]{"name", dc.getSanPham_gioHang().getTenSach()});
            arrays.add(new String[]{"price", dc.getSanPham_gioHang().getGiaBan() + ""});
            arrays.add(new String[]{"quantity", dc.getSoLuong() + ""});
            arrays.add(new String[]{"image", "/shop/image/product/" + dc.getSanPham_gioHang().getHinhAnh()});

            data.put(key++, arrays);
        }

        for (ChiTietGioHang chiTietGioHang : list) {
                detailDAO.delete(chiTietGioHang);
        }

        return data;
    }

}
