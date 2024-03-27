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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Data;

@SuppressWarnings("serial")
@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity

@Table(name = "PhanLoai")
public class PhanLoai implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ten_loai", unique = true)
    private String tenLoai;

    @Column(name = "mo_ta", columnDefinition = "NVARCHAR(MAX)")
    private String moTa;
    
    @OneToMany(mappedBy = "phanLoai")
    private List<SanPham> loaiSanPham;
}