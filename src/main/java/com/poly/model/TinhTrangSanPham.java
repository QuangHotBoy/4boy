package com.poly.model;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "TinhTrangSanPham")
public class TinhTrangSanPham implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", length = 4)
    private Integer id;

    @Column(name = "ten_tinh_trang", length = 150)
    private String tenTinhTrang;
    
    @OneToMany(mappedBy = "tinhTrangSanPham")
    private List<SanPham> tinhTrang_sanPham;

    
}
