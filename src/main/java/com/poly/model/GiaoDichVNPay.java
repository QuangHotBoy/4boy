package com.poly.model;

import java.io.Serializable;
import java.math.BigDecimal;
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
@Table(name = "giao_dich_vnpay")
public class GiaoDichVNPay implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "ma_giao_dich")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maGiaoDich;

    @ManyToOne
    @JoinColumn(name = "ma_don_hang")
    private DonDatHang donDatHang_VNPay;

    @Column(name = "ma_giao_dich_vnpay", length = 100)
    private String maGiaoDichVNPay;

    @Column(name = "ngay_thanh_toan")
    private Timestamp ngayThanhToan;

    @Column(name = "so_tien", precision = 10, scale = 0)
    private BigDecimal soTien;
}