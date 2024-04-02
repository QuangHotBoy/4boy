package com.poly.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.poly.model.Quyen_TaiKhoan;

public interface Quyen_TaiKhoanDAO extends JpaRepository<Quyen_TaiKhoan, Long> {
    // Các phương thức tùy chỉnh nếu cần
    @Query("SELECT a FROM Quyen_TaiKhoan a where a.taiKhoan_quyen.tenDangNhap = :un")
    Quyen_TaiKhoan findbyTenDangNhap(@Param("un") String tenDangNhap);

    @Query("SELECT a FROM Quyen_TaiKhoan a where a.quyen.id LIKE 'STAF'")
    List<Quyen_TaiKhoan> findbyStaff();

    @Query("SELECT a FROM Quyen_TaiKhoan a where a.quyen.id LIKE 'CUST'")
    List<Quyen_TaiKhoan> findbyMember();

    @Query("SELECT a FROM Quyen_TaiKhoan a where a.quyen.id LIKE 'MANA'")
    List<Quyen_TaiKhoan> findbyMana();
    
    

}
