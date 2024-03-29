package com.poly.controller;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.poly.dao.NhaXuatBanDAO;
import com.poly.model.NhaXuatBan;

// import com.model.BoSach;
// import com.model.NhaXuatBan;
// import com.model.PhanLoai;
// import com.model.SanPham;
// import com.model.TinhTrangSanPham;
// import com.repository.NhaXuatBanDAO;

import jakarta.servlet.ServletContext;

@Controller
public class NhaCungCapController {

    @Autowired
    NhaXuatBanDAO nccDAO;
    // @Autowired
    // ServletContext app;

    /* Bộ sưu tập */
    @RequestMapping("/admin/supplier")
    public String nhacungcap(Model model, @RequestParam(defaultValue = "0") int page) {

        // List<NhaXuatBan> nhacungcapPage = nccDAO.findAll();
        // model.addAttribute("nhacungcaps", nhacungcapPage);

        return "/admin/suppliers/supplier";
    }

    // edit bộ
    // @RequestMapping("/admin/supplier/edit/{id}")
    // public String editncc(Model model, @PathVariable("id") Long id) {
    // NhaXuatBan item = nccDAO.findById(id).get();

    // model.addAttribute("item", item);

    // return "/admin/layout/suppliers/update-suppliers";
    // }

    // // form nhà cung cấp
    @RequestMapping("/admin/supplier/add-new-suppliers")
    public String formncc() {
        // List<PhanLoai> boSachList = plDAO.findAll();
        // System.out.println(boSachList);

        // model.addAttribute("listPL", boSachList);
        return "/admin/suppliers/add-new-suppliers";
    }
}
