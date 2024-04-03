package com.poly.model;


import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "PhuongThucThanhToan")
public class PhuongThucThanhToan implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "ten_phuong_thuc", length = 150)
    private String tenPhuongThuc;
    @JsonIgnore
    @OneToMany(mappedBy = "phuongThucThanhToan")
    private List<DonDatHang> phuongThucThanhToan;
}