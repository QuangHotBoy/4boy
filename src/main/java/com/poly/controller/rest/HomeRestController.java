package com.poly.controller.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class HomeRestController {

    @GetMapping("/get-session-data")
    @ResponseBody
    public String getSessionData(HttpServletRequest request) {
        // Lấy đối tượng HttpSession từ HttpServletRequest
        HttpSession session = request.getSession();
        
        // // Lấy dữ liệu từ session (ví dụ: id của người dùng đã đăng nhập)
        // Integer userId = (Integer) session.getAttribute("userId");

        String userId = "poly";
        
        // Trả về dữ liệu session dưới dạng văn bản
        return userId + "";
    }
}
