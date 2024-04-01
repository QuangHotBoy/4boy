package com.poly.service.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poly.dao.ChiTietDonDatHangDAO;
import com.poly.dao.DiaChi_TaiKhoanDAO;
import com.poly.dao.DonDatHangDAO;
import com.poly.dao.MaGiamGiaDAO;
import com.poly.dao.PhuongThucThanhToanDAO;
import com.poly.dao.TaiKhoanDAO;
import com.poly.dao.TinhTrangDonDatHangDAO;
import com.poly.model.ChiTietDonDatHang;
import com.poly.model.DiaChi_TaiKhoan;
import com.poly.model.DonDatHang;
import com.poly.model.MaGiamGia;
import com.poly.model.TaiKhoan;
import com.poly.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {
	@Autowired
	DonDatHangDAO orderDAO;

	@Autowired
	ChiTietDonDatHangDAO orderDetailDAO;

	@Autowired
	MaGiamGiaDAO voucherDAO;

	@Autowired
	TaiKhoanDAO accountDAO;

	@Autowired
	TinhTrangDonDatHangDAO statusDAO;

	@Autowired
	DiaChi_TaiKhoanDAO addressDAO;

	public DonDatHang create(JsonNode orderData) {
		ObjectMapper mapper = new ObjectMapper();

		DonDatHang order = mapper.convertValue(orderData, DonDatHang.class);

		//Đặt mã giảm giá mặc định khi ko có áp mã
		if (orderData.get("maGiamGia").asText() != "") {
			MaGiamGia voucher = voucherDAO.findById(order.getMaGiamGia().getId()).orElse(null);

			System.out.println(voucher.getId());

			if (voucher != null) {

				voucher.setDaSuDung(voucher.getDaSuDung() + 1);

				Integer total = order.getTongTien().intValue() - voucher.getSoTienGiam().intValue();

				order.setTongTien(new BigDecimal(total));

				voucherDAO.save(voucher);
			}
		} else {
			MaGiamGia voucher = voucherDAO.findById("DEFAULT").get();
			order.setMaGiamGia(voucher);
		}

		if(order.getPhuongThucThanhToan().getId() == 2){
			order.setTrangThai_donDatHang(statusDAO.findById(1).get());
		}

		orderDAO.save(order);

		TypeReference<List<ChiTietDonDatHang>> type = new TypeReference<List<ChiTietDonDatHang>>() {
		};
		List<ChiTietDonDatHang> details = mapper.convertValue(orderData.get("chiTietDonDatHang"), type)
				.stream().peek(d -> d.setDonDatHang(order)).collect(Collectors.toList());
		orderDetailDAO.saveAll(details);

		return order;
	}
}
