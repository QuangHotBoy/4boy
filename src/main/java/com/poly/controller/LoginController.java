package com.poly.controller;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.poly.dao.TaiKhoanDAO;
import com.poly.model.TaiKhoan;
import com.poly.service.CartService;
import com.poly.service.ParamService;
import com.poly.service.SessionService_quenMatKhau;
import com.poly.service.impl.MailerServiceImpl;

@Controller
public class LoginController {
    @Autowired
    TaiKhoanDAO tkDao;

    @Autowired
    CartService cartService;

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

    @GetMapping("shop/log-out")
    public String logout(Model model) {

        return "redirect:/shop/home";
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

    @RequestMapping("shop/create")
    public String create(Model model) {
        return "shop/layout/login/create_user";
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

    String randomString = generateRandomString(10);
    String Subject = "███ Nhà Sách Trực Tuyến Knotrea Xin Chào, Đây là mã xác nhận của bạn ███";
    String icon1 = "Mã xác nhận email của bạn là: <h>&#x1F338;<strong>" + randomString + "</strong>&#x1F338;</h>\n";

    @RequestMapping("sendemail/{email}")
    public String sendemail(Model model, @PathVariable("email") String email) {
        sessionService_quenmatkhau.set("maxacnhan_email", randomString); // Lưu mã xác nhận vào session
        String styledIcon1 = icon1.replace("\n", "<br>");
        mailer.send(email, Subject, styledIcon1); // Gửi email xác nhận
        return "shop/layout/login/forgot_xacnhan";
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
    @RequestMapping("xacnhanma/{email}")
    public String xacnhanma(Model model, @PathVariable("email") String email,
            @RequestParam("maxacnhan") String maxacnhan) {
        if (maxacnhan.equals("")) {
            model.addAttribute("kiemtramaxacnhan", "<<<  Vui lòng nhập mã xác nhận!  >>>");
            model.addAttribute("email", email);
            return "shop/quenmatkhau_xacnhanma";
        } else if (!maxacnhan.equals(sessionService_quenmatkhau.get("maxacnhan_email"))) {
            model.addAttribute("kiemtramaxacnhan", "<<<  Mã xác nhận không hợp lệ!  >>>");
            model.addAttribute("email", email);
            return "shop/layout/login/forgot_xacnhan";
        }
        emailthaydoimatkhau = email;
        return "redirect:/thaydoimatkhau";
    }
    @RequestMapping("kiemtrama")
public String kiemtrama(Model model, @RequestParam("maxacnhan") String maxacnhan,
                         @RequestParam("email") String email) {
    if (maxacnhan.equals(sessionService_quenmatkhau.get("maxacnhan_email"))) {
        // Nếu mã xác nhận đúng, chuyển hướng đến trang tiếp theo
        emailthaydoimatkhau = email;
        return "redirect:/thaydoimatkhau";
    } else {
        // Nếu mã xác nhận không đúng, hiển thị thông báo lỗi hoặc xử lý khác
        return "shop/layout/login/forgot_xacnhan";
    }
}

String thongbaothaydoimatkhau_tendangnhap = "";
String thongbaothaydoimatkhau_matkhau = "";
String matk = "";
String emailthaydoimatkhau; // Define emailthaydoimatkhau variable

@RequestMapping("thaydoimatkhau")
public String thaydoimatkhau(Model model) {
    TaiKhoan kiemTraTaiKhoanEmail = tkDao.findByEmail(emailthaydoimatkhau);
    if (kiemTraTaiKhoanEmail != null) {
        model.addAttribute("tenDangNhap", kiemTraTaiKhoanEmail.getTenDangNhap());
    }
    model.addAttribute("email", emailthaydoimatkhau);
    model.addAttribute("thongbaothaydoimatkhau_tendangnhap", thongbaothaydoimatkhau_tendangnhap);
    model.addAttribute("thongbaothaydoimatkhau_matkhau", thongbaothaydoimatkhau_matkhau);
    model.addAttribute("matk", matk);
    return "shop/layout/login/create_user";
}


@RequestMapping("xacnhanthaydoimatkhau/{email}")
public String xacnhanthaydoimatkhau(
        Model model,
        @PathVariable("email") String email,
        @RequestParam("matKhau") String matKhau,
        @RequestParam("xacnhanmatkhau") String xacNhanMatKhau) {

    // Find the user by email
    TaiKhoan kiemTraTaiKhoanEmail = tkDao.findByEmail(email);

    // Check if the user is found
    if (kiemTraTaiKhoanEmail != null) {
        // Set the new password
        kiemTraTaiKhoanEmail.setMatKhau(matKhau);
        
        // Save the updated user
        tkDao.save(kiemTraTaiKhoanEmail);

        return "shop/login";
    } else {
        // Handle the case when user is not found
        // For example, you can return a message indicating that the user does not exist
        model.addAttribute("error", "User with email " + email + " does not exist");
        return "shop/error-page";
    }
}

    @RequestMapping("shop/create_user")
    public String create_user(Model model) {
        return "shop/layout/login/create_user";
    }
}

