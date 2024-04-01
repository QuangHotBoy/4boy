package com.poly.model;


import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "DonDatHang")
public class DonDatHang implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maDonHang;

    @ManyToOne
    @JoinColumn(name = "tai_khoan_id")
    private TaiKhoan taiKhoan_donHang;

    @Column(name = "ho_ten")
    private String hoTen;

    @ManyToOne
    @JoinColumn(name = "dia_chi")
    private DiaChi_TaiKhoan diaChiNhanHang;

    @Column(name = "so_dien_thoai")
    private String soDienThoai;

    @Column(name = "email")
    private String mail;

    @Column(name = "ngay_dat_hang")
    private Timestamp ngayDatHang;

    @Column(name = "tong_tien", precision = 10, scale = 0)
    private BigDecimal tongTien;

    @ManyToOne
    @JoinColumn(name = "ma_giam_gia")
    private MaGiamGia maGiamGia;

    @ManyToOne
    @JoinColumn(name = "tinh_trang")
    @Enumerated(EnumType.STRING)
    private TinhTrangDonDatHang trangThai_donDatHang;

    @Column(name = "ghi_chu")
    private String ghiChu;

    @ManyToOne
    @JoinColumn(name = "phuong_thuc_thanh_toan_id")
    private PhuongThucThanhToan phuongThucThanhToan;
    
    @OneToMany(mappedBy = "donDatHang")
    private List<ChiTietDonDatHang> chiTietDonDatHang;

    @Transient
    private List<TinhTrangDonDatHang> tinhtrangdhds;
   

}