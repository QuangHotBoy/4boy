package com.poly.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

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
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "SanPham")
public class SanPham implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long isbn;

    @ManyToOne
    @JoinColumn(name = "ma_loai")
    private PhanLoai phanLoai;

    @ManyToOne
    @JoinColumn(name = "nha_xuat_ban")
    private NhaXuatBan nhaXuatBan;

    @ManyToOne
    @JoinColumn(name = "ma_bo_sach")
    private BoSach boSach;

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

    private BigDecimal donGia;

    @Column(name = "ti_le_giam_gia")
    private Integer tiLeGiamGia;

    private BigDecimal giaGoc;

    @Column(name = "kieu_bia", length = 150)
    private String kieuBia;

    private Integer soLuong;

    @ManyToOne
    @JoinColumn(name = "tinh_trang")
    private TinhTrangSanPham tinhTrangSanPham;

    @OneToMany(mappedBy = "sanPham_yeuThich")
    private List<SachYeuThich> sanPhamYeuThich;

    @OneToMany(mappedBy = "sanPham_gioHang")
    private List<ChiTietGioHang> sanPhamGioHang;

    @OneToMany(mappedBy = "sanPham_donDatHang")
    private List<ChiTietDonDatHang> sanPhamDonDatHang;

    @OneToMany(mappedBy = "sanPham_danhGia")
    private List<DanhGia> sanPhamDanhGia;

    @Transient
    private List<PhanLoai> loaiSanPham;

    @Transient
    private List<NhaXuatBan> nhaXuatBans;

    @Transient
    private List<BoSach> boSachs;

    @Transient
    private List<TinhTrangSanPham> tinhtrangs;



    
}