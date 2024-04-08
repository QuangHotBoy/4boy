package com.poly.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.poly.config.VNPayService;
import com.poly.dao.ChiTietDonDatHangDAO;
import com.poly.dao.DonDatHangDAO;
import com.poly.dao.SanPhamDAO;
import com.poly.dao.TinhTrangDonDatHangDAO;
import com.poly.model.ChiTietDonDatHang;
import com.poly.model.DonDatHang;
import com.poly.model.SanPham;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class VNPaymentController {

    @Autowired
    VNPayService vnPayService;

    @Autowired
    DonDatHangDAO orderDAO;

    @Autowired
    ChiTietDonDatHangDAO detailOrderDAO;

    @Autowired
    SanPhamDAO productDAO;

    @Autowired
    TinhTrangDonDatHangDAO statusDAO;

    @GetMapping("/shop/order/vnpay-payment")
    public String index(Model model, @RequestParam("amount") Long amount, @RequestParam("order-id") int id,
            @RequestParam("hoTen") String hoTen, @RequestParam("soDienThoai") String sdt,
            @RequestParam("mail") String mail) {

        model.addAttribute("hoTen", hoTen);
        model.addAttribute("amount", amount);
        model.addAttribute("orderId", id);
        model.addAttribute("sdt", sdt);
        model.addAttribute("mail", mail);

        return "shop/payment-order";
    }

    @PostMapping("/shop/order/submitOrder")
    public String submidOrder(@RequestParam("amount") int orderTotal,
            @RequestParam("orderInfo") String orderInfo,
            HttpServletRequest request) {
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String vnpayUrl = vnPayService.createOrder(orderTotal, orderInfo, baseUrl);
        return "redirect:" + vnpayUrl;
    }

    @GetMapping("vnpay-payment/complete")
    public String GetMapping(HttpServletRequest request, Model model) {
        int paymentStatus = vnPayService.orderReturn(request);

        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTimeStr = request.getParameter("vnp_PayDate");
        SimpleDateFormat sdfInput = new SimpleDateFormat("yyyyMMddHHmmss");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount");

        DonDatHang order = orderDAO.findById(Integer.parseInt(orderInfo)).get();

        String price = totalPrice.substring(0, totalPrice.length() - 2);

        Date paymentTime = new Date();

        try {
            paymentTime = sdfInput.parse(paymentTimeStr);
        } catch (Exception e) {
            // TODO: handle exception
        }

        if(paymentStatus == 1){
            order.setTrangThai_donDatHang(statusDAO.findById(1).get());
        }else{
            List<ChiTietDonDatHang> list = detailOrderDAO.findByDonDatHang(order);

            for (ChiTietDonDatHang dc : list) {
                SanPham product = productDAO.findById(dc.getSanPham_donDatHang().getIsbn()).get();

                product.setSoLuong(product.getSoLuong() + dc.getSoLuong());

                productDAO.save(product);
            }
        }

        orderDAO.save(order);

        model.addAttribute("orderId", orderInfo);
        model.addAttribute("totalPrice", price);
        model.addAttribute("paymentTime", paymentTime);
        model.addAttribute("transactionId", transactionId);

        return paymentStatus == 1 ? "shop/complete-order" : "shop/order-fail";
    }
}
