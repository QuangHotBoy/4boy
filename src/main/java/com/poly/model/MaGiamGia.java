package com.poly.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;



import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "id"))
public class MaGiamGia implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", length = 10)
    // @NotBlank(message = "Mã giảm giá không được để trống!")
    private String id;

    // @NotBlank(message = "Tên mã không được để trống!")
    @Column(name = "ten_ma", length = 150)
    private String tenMa;

    // @NotBlank(message = "Tên chương trình không được để trống!")  
    @Column(name = "thong_tin", columnDefinition = "NVARCHAR(MAX)")
    private String thongTin;

   
    // @NotNull(message = "Số tiền giảm không được để trống!")
    // @Digits(integer = 10, fraction = 2, message = "Số tiền giảm phải có định dạng số!")
    // @DecimalMin(value = "0.00", message = "Số tiền giảm phải là số dương!")
    @Column(name = "so_tien_giam", precision = 10, scale = 2)
    private BigDecimal soTienGiam;

    // @NotNull(message = "Ngày Bắt Đầu không được để trống")
    @Column(name = "ngay_bat_dau")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date ngayBatDau;
    
    // @NotNull(message = "Ngày Kết Thúc không được để trống")
    // @Future(message = "Ngày Kết Thúc phải sau Ngày Bắt Đầu")
    @Column(name = "ngay_ket_thuc")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date ngayKetThuc;

    @Column(name = "don_toi_thieu", precision = 10, scale = 2)
    private BigDecimal dieuKien;

    // @NotNull(message = "Số lượng không được để trống!")
    @Column(name = "so_luong")
    private Integer soLuong;

    @Column(name = "ket_thuc")
    private Boolean ketThuc;

    @ManyToOne
    @JoinColumn(name = "bo_sach_ap_dung")
    private BoSach maGiamGia_boSach;

    @ManyToOne
    @JoinColumn(name = "nha_xuat_ban_ap_dung")
    private NhaXuatBan maGiamGia_nxb;

    @OneToMany(mappedBy = "maGiamGia")
    private List<DonDatHang> maGiamGia;

}