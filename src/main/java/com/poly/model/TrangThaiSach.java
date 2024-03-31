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
@Table(name = "TrangThaiSach")
public class TrangThaiSach implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "ten_trang_thai", length = 150)
    private String tenTinhTrang;

    @JsonIgnore
    @OneToMany(mappedBy = "tinhTrangSanPham")
     List<SanPham> sanPhams; // Đổi tên trường để phù hợp với cấu trúc cơ sở dữ liệu
}
