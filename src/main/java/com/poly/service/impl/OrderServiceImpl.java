package com.poly.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poly.dao.ChiTietDonDatHangDAO;
import com.poly.dao.DonDatHangDAO;
import com.poly.dao.TaiKhoanDAO;
import com.poly.model.ChiTietDonDatHang;
import com.poly.model.DonDatHang;
import com.poly.model.TaiKhoan;
import com.poly.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    DonDatHangDAO orderDAO;

    @Autowired
    ChiTietDonDatHangDAO orderDetailDAO;

	@Autowired
	TaiKhoanDAO accountDAO;

    public DonDatHang create(JsonNode orderData) {
		ObjectMapper mapper = new ObjectMapper();

		DonDatHang order = mapper.convertValue(orderData, DonDatHang.class);
		orderDAO.save(order);

		System.out.println(order);
		
		TypeReference<List<ChiTietDonDatHang>> type = new TypeReference<List<ChiTietDonDatHang>>() {};
		List<ChiTietDonDatHang> details = mapper.convertValue(orderData.get("chiTietDonDatHang"), type)
				.stream().peek(d -> d.setDonDatHang(order)).collect(Collectors.toList());
		orderDetailDAO.saveAll(details);
		
		return order;
	}
}
