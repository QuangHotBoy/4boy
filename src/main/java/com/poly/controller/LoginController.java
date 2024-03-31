package com.poly.controller;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.poly.dao.TaiKhoanDAO;
import com.poly.model.TaiKhoan;
import com.poly.service.ParamService;
import com.poly.service.SessionService_quenMatKhau;
import com.poly.service.impl.MailerServiceImpl;

@Controller
public class LoginController {
    @Autowired
    TaiKhoanDAO tkDao;

    @Autowired
    ParamService paramService;

    @Autowired
    MailerServiceImpl mailer;

    @Autowired
    SessionService_quenMatKhau sessionService_quenmatkhau;

    @RequestMapping("shop/login")
    public String login(Model model) {
        return "shop/layout/login/login";
    }

    @RequestMapping("shop/register")
    public String register(Model model) {
        return "shop/layout/login/register";
    }

    @RequestMapping("shop/forgot")
    public String forgot(Model model) {
        return "shop/layout/login/forgot";
    }
    @RequestMapping("shop/forgot1")
    public String forgo1t(Model model) {
        return "shop/layout/login/forgot_xacnhan";
    }

    public static String generateRandomString(Integer length) {
        if (length == null) {
            throw new IllegalArgumentException("Length must not be null");
        }
        String characters = "0123456789";
        Random random = new Random();
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < 6; i++) {
            int index = random.nextInt(characters.length());
            char randomChar = characters.charAt(index);
            sb.append(randomChar);
        }

        return sb.toString();
    }

    @RequestMapping("kiemtraemail")
    public String kiemtraemail(
            Model model,
            @RequestParam("email") String email,
            @RequestParam("tendangnhap") String tendangnhap) {
        if (tendangnhap == null || tendangnhap.isEmpty()) {
            model.addAttribute("kiemtratendangnhap", "<<<  Vui lòng nhập tên đăng nhập  >>>");
            return "shop/layout/login/forgot";
        }
        if (email == null || email.isEmpty()) {
            model.addAttribute("kiemtramail", "<<<  Vui lòng nhập email  >>>");
            return "shop/layout/login/forgot";
        }

        TaiKhoan kiemtramail = tkDao.findByEmail(email);
        if (kiemtramail == null) {
            model.addAttribute("kiemtramail", "<<<  Email không tồn tại  >>>");
            return "shop/layout/login/forgot";
        }

        // Kiểm tra xem email đã được gán cho tên đăng nhập nào chưa
        TaiKhoan foundUser = tkDao.findByTenDangNhapAndEmail(tendangnhap, email);
        if (foundUser == null) {
            model.addAttribute("kiemtratendangnhap", "<<<  Email không tương ứng với tên đăng nhập  >>>");
            return "shop/layout/login/forgot";
        }

        return "redirect:/sendemail/" + email;
    }

    String randomString = generateRandomString(10);
    String Subject = "███ Nhà Sách Trực Tuyến Knotrea Xin Chào, Đây là mã xác nhận của bạn ███";
    String icon1 = "Mã xác nhận email của bạn là: <h>&#x1F338;<strong>" + randomString + "</strong>&#x1F338;</h>\n";

    @RequestMapping("sendemail/{email}")
    public String sendemail(Model model, @PathVariable("email") String email) {
        sessionService_quenmatkhau.set("maxacnhan_email", randomString); // Lưu mã xác nhận vào session
        String styledIcon1 = icon1.replace("\n", "<br>");
        mailer.send(email, Subject, styledIcon1); // Gửi email xác nhận
        return "shop/layout/login/forgot";
    }

    String emailthaydoimatkhau = ""; // Biến để lưu email khi xác nhận mã thành công

    @RequestMapping("kiemtrama")
    public String kiemtrama(Model model, @RequestParam("maxacnhan") String maxacnhan) {
        if (maxacnhan.equals(sessionService_quenmatkhau.get("maxacnhan_email"))) {
            // Nếu mã xác nhận đúng, chuyển hướng đến trang tiếp theo
            return "redirect:/thaydoimatkhau";
        } else {
            // Nếu mã xác nhận không đúng, hiển thị thông báo lỗi hoặc xử lý khác
            return "shop/layout/login/forgot";
        }
    }

    @RequestMapping("xacnhanma/{email}")
    public String xacnhanma(Model model, @PathVariable("email") String email,
            @RequestParam("maxacnhan") String maxacnhan) {
        if (maxacnhan.equals("")) {
            model.addAttribute("kiemtramaxacnhan", "<<<  Vui lòng nhập mã xác nhận!  >>>");
            model.addAttribute("email", email);
            return "shop/layout/login/forgot";
        } else if (!maxacnhan.equals(sessionService_quenmatkhau.get("maxacnhan_email"))) {
            model.addAttribute("kiemtramaxacnhan", "<<<  Mã xác nhận không hợp lệ!  >>>");
            model.addAttribute("email", email);
            return "shop/layout/login/forgot";
        }
        emailthaydoimatkhau = email; // Lưu email vào biến để sử dụng sau này
        return "redirect:/thaydoimatkhau"; // Chuyển hướng đến trang thay đổi mật khẩu
    }

    String thongbaothaydoimatkhau_tendangnhap = "";
    String thongbaothaydoimatkhau_matkhau = "";
    String matk = "";

    @RequestMapping("thaydoimatkhau")
    public String thaydoimatkhau(Model model) {
        // Check if kiemTraTaiKhoanEmail is not null before using it
        TaiKhoan kiemTraTaiKhoanEmail = tkDao.findByEmail(emailthaydoimatkhau);
        if (kiemTraTaiKhoanEmail != null) {
            // Add attributes only if kiemTraTaiKhoanEmail is not null
            model.addAttribute("tenDangNhap", kiemTraTaiKhoanEmail.getTenDangNhap());
            model.addAttribute("email", emailthaydoimatkhau);
            model.addAttribute("matk", matk);
        } else {
            // Handle the situation where kiemTraTaiKhoanEmail is null
            // For example, you can log an error or return an appropriate response
            // Log the error
            System.err.println("TaiKhoan with email " + emailthaydoimatkhau + " not found");
            // Or return an error response
            // For web applications, you might redirect to an error page or return an error JSON response
            // Example:
            // return "error-page";
        }
        return "shop/layout/login/create_user";
    }
    

    // @RequestMapping("xacnhanthaydoimatkhau/{email}")
    // public String xacnhanthaydoimatkhau(
    // Model model,
    // @PathVariable("email") String email,
    // @RequestParam("matKhau") String matKhau,
    // @RequestParam("xacnhanmatkhau") String xacNhanMatKhau) {

    // // Regular expressions for password validation
    // TaiKhoan kiemTraTaiKhoanEmail = tkDao.findByEmail(email);
    // kiemTraTaiKhoanEmail.setMatKhau(matKhau);
    // tkDao.save(kiemTraTaiKhoanEmail);
    // return "shop/login";
    // }
    @RequestMapping("shop/create_user")
    public String create_user(Model model) {
        return "shop/layout/login/create_user";
    }
}
