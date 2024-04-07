package com.poly.service.impl;

import java.math.BigDecimal;
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
import com.poly.dao.ChiTietDonDatHangDAO;
import com.poly.dao.DiaChi_TaiKhoanDAO;
import com.poly.dao.DonDatHangDAO;
import com.poly.dao.MaGiamGiaDAO;
import com.poly.dao.SanPhamDAO;
import com.poly.dao.TaiKhoanDAO;
import com.poly.dao.TinhTrangDonDatHangDAO;
import com.poly.model.ChiTietDonDatHang;
import com.poly.model.DonDatHang;
import com.poly.model.MaGiamGia;
import com.poly.model.SanPham;
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

	@Autowired
	SanPhamDAO productDAO;

	public DonDatHang create(JsonNode orderData) {
		ObjectMapper mapper = new ObjectMapper();

		DonDatHang order = mapper.convertValue(orderData, DonDatHang.class);

		String getVoucher = order.getMaGiamGia().getId();

		//Đặt mã giảm giá mặc định khi ko có áp mã
		if (getVoucher != "") {
			MaGiamGia voucher = voucherDAO.findById(order.getMaGiamGia().getId()).orElse(null);

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

		if(order.getPhuongThucThanhToan().getId() == 1){
			order.setTrangThai_donDatHang(statusDAO.findById(1).get());
		}

		orderDAO.save(order);

		TypeReference<List<ChiTietDonDatHang>> type = new TypeReference<List<ChiTietDonDatHang>>() {
		};
		List<ChiTietDonDatHang> details = mapper.convertValue(orderData.get("chiTietDonDatHang"), type)
				.stream().peek(d -> d.setDonDatHang(order)).collect(Collectors.toList());
		orderDetailDAO.saveAll(details);

		for (ChiTietDonDatHang dt : details) {
			SanPham products = productDAO.findById(dt.getSanPham_donDatHang().getIsbn()).get();

			products.setSoLuong(products.getSoLuong() - dt.getSoLuong());

			productDAO.save(products);
		}

		return order;
	}

	@Override
	public Map<String, Object> checkOrder(String id, Long isbn) {
		// TODO Auto-generated method stub
		Map<String, Object> data = new HashMap<>();

		List<DonDatHang> order = orderDAO.findByTDN(id);

		List<ChiTietDonDatHang> detailOrders = new ArrayList();
		
		for (DonDatHang o : order) {
			List<ChiTietDonDatHang> detailOrder= orderDetailDAO.findByDonDatHang(o);

			for (ChiTietDonDatHang dc : detailOrder) {
				detailOrders.add(dc);
			}
		}

		for (ChiTietDonDatHang dc : detailOrders) {
			if(dc.getSanPham_donDatHang().getIsbn() == isbn){
				data.put("isTrue", true);
				break;
			}else{
				
				data.put("isTrue", false);
			}
		}
		return data;
	}

	@Override
	public List<DonDatHang> findByTDN(String tenDangNhap) {
		 
		return orderDAO.findByTDN(tenDangNhap);
	}

	@Override
	public DonDatHang findbyId(Integer maDonHang) { 
		return orderDAO.findById(maDonHang).get();
	}

	@Override
	public List<Object[]> getTopSachByTinhTrang() {
		// TODO Auto-generated method stub
		return orderDetailDAO.getTop8SachByTinhTrang();
	}
  
	 

	 
}
