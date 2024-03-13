package com.poly.model;

import java.io.Serializable;
import java.util.Date;

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
@Table(name = "giao_dich_cod")
public class GiaoDichCOD implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "ma_giao_dich")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maGiaoDich;

    @ManyToOne
    @JoinColumn(name = "ma_don_hang")
    private DonDatHang donDatHang_COD;

    @Column(name = "dia_chi_giao_hang", columnDefinition = "NVARCHAR(MAX)")
    private String diaChiGiaoHang;

    @Column(name = "ngay_giao_hang")
    private Date ngayGiaoHang;
}