package com.poly.model;

import java.io.Serializable;
import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "ChiTietDonDatHang")
public class ChiTietDonDatHang implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "ma_chi_tiet")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maChiTiet;

    @ManyToOne
    @JoinColumn(name = "ma_don_hang")
    private DonDatHang donDatHang;

    @ManyToOne
    @JoinColumn(name = "ma_san_pham")
    private SanPham sanPham_donDatHang;

    @Column(name = "so_luong")
    private Integer soLuong;

    @Column(name = "don_gia", precision = 10, scale = 0)
    private BigDecimal donGia;

}