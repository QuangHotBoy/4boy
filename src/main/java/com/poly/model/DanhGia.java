package com.poly.model;

import java.io.Serializable;
import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "DanhGia")
public class DanhGia implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "ma_sach")
    private SanPham sanPham_danhGia;

    @ManyToOne
    @JoinColumn(name = "ma_tai_khoan")
    private TaiKhoan taiKhoan_danhGia;

    @Column(name = "ngay_danh_gia")
    private Timestamp ngayDanhGia;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "noi_dung")
    private String noiDung;
    
}
