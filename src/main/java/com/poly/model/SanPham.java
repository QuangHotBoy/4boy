package com.poly.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

@Table(name = "Sach")
public class SanPham implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long isbn;

    // @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "ma_loai")
    private PhanLoai phanLoai;

    // @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "nha_xuat_ban")
    private NhaXuatBan nhaXuatBan;

    @Column(name = "hinh_anh", columnDefinition = "VARCHAR(MAX)")
    private String hinhAnh;

    @Column(name = "ten_sach", length = 250)
    private String tenSach;

    @Column(name = "tac_gia", length = 150)
    private String tacGia;

    @Column(name = "nam_xuat_ban")
    private String namXuatBan;

    @Column(name = "mo_ta", columnDefinition = "NVARCHAR(MAX)")
    private String moTa;

    @Column(name = "gia_giam")
    private BigDecimal giaGiam;

    @Column(name = "ti_le_giam_gia")
    private Integer tiLeGiamGia;

    @Column(name = "gia_ban")
    private BigDecimal giaBan;

    @Column(name = "kieu_bia", length = 150)
    private String kieuBia;
    @Column(name = "so_luong")
    private Integer soLuong;

   
    @ManyToOne
    @JoinColumn(name = "trang_thai") // Đổi tên trường để phù hợp với cấu trúc cơ sở dữ liệu
    private TrangThaiSach tinhTrangSanPham;

    @JsonIgnore
    @OneToMany(mappedBy = "sanPham_yeuThich")
    private List<SachYeuThich> sanPhamYeuThich;

    @JsonIgnore
    @OneToMany(mappedBy = "sanPham_gioHang")
    private List<ChiTietGioHang> sanPhamGioHang;
    
    @JsonIgnore
    @OneToMany(mappedBy = "sanPham_donDatHang")
    private List<ChiTietDonDatHang> sanPhamDonDatHang;
    
    @JsonIgnore
    @OneToMany(mappedBy = "sanPham_danhGia")
    private List<DanhGia> sanPhamDanhGia;

    @Transient
    private List<PhanLoai> loaiSanPham;

    @Transient
    private List<NhaXuatBan> nhaXuatBans;

    @Transient
    private List<TrangThaiSach> tinhtrangs;



}
