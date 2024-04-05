package com.poly.controller.rest;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.service.ThongKeService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/topByTinhTrang")
public class RestThongKeController {
    @Autowired
    private ThongKeService thongKeService;

    @GetMapping("/topByTinhTrang")
    public List<Object[]> getTopSachByTinhTrang() {
        return thongKeService.getTopSachByTinhTrang();
    }
}
