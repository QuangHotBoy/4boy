package com.poly.model;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@Table(name = "bo_sach")
public class BoSach implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ten_bo_sach", length = 150)
    private String tenBoSach;

    @Column(name = "mo_ta", columnDefinition = "NVARCHAR(MAX)")
    private String moTa;

    @Column(name = "hinh_anh", columnDefinition = "VARCHAR(MAX)")
    private String hinhAnh;
    
    @OneToMany(mappedBy = "boSach")
    private List<SanPham> boSach_sanPham; 

    @OneToMany(mappedBy = "maGiamGia_boSach")
    private List<MaGiamGia> maGiamGia_boSach;
}