package com.poly.controller.rest;

import java.io.IOException;
import java.util.List;
import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.poly.service.ProductTypeService;
import com.poly.service.SupplierService;
import com.poly.model.SanPham;
import com.poly.service.ProductService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/products")
public class RestProductController {
    @Autowired
    ProductService productService;

    @GetMapping
    public List<SanPham> getAll() {
        return productService.findAll();
    }

    @GetMapping("{id}")
    public SanPham getOne(@PathVariable("id") Long id) {
        return productService.findById(id);
    }

    @PostMapping
    public SanPham post(@RequestBody SanPham sanPham) {
        productService.create(sanPham);
        return sanPham;
    }

    @PutMapping("{id}")
    public SanPham put(@PathVariable("id") Integer id, @RequestBody SanPham sanPham) {
        return productService.update(sanPham);
    }

    // xử lí ảnh
    // Thêm phương thức POST mới để xử lý tải lên hình ảnh

}
