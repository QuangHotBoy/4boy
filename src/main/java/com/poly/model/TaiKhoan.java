package com.poly.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

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
@Table(name = "TaiKhoan")
public class TaiKhoan implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "ten_dang_nhap")
	private String tenDangNhap;
	
	@Column(name = "ho_ten")
	private String hoTen;
	
	@Column(name = "mat_khau")
	private String matKhau;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "so_dien_thoai")
	private String sdt;
	
	@Column(name = "ngay_sinh")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date ngaySinh;
	
	@Column(name = "hoat_dong")
	private Boolean active;
	
	@OneToMany(mappedBy = "taiKhoan_quyen")
    private List<Quyen_TaiKhoan> quyenTaiKhoan;
    
    @OneToMany(mappedBy = "taiKhoan_diaChi")
    private List<DiaChi_TaiKhoan> diaChiTaiKhoan;
    
    @OneToMany(mappedBy = "taiKhoan_gioHang")
    private List<GioHang> taiKhoan_gioHang;
    
    @OneToMany(mappedBy = "taiKhoan_yeuThich")
    private List<SachYeuThich> taiKhoanYeuThich;
    
    @OneToMany(mappedBy = "taiKhoan_donHang")
    private List<DonDatHang> taiKhoan_donHang;

	@OneToMany(mappedBy = "taiKhoan_danhGia")
    private List<DanhGia> taiKhoan_danhGia;
    
}
