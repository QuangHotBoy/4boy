package com.poly.model;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@Table(name = "TrangThaiDonDatHang")
public class TinhTrangDonDatHang implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "ten_trang_thai")
    private String tenTrangThai;

    @OneToMany(mappedBy = "trangThai_donDatHang")
    List<DonDatHang> trangThaiDonDatHang;
    
    
}
