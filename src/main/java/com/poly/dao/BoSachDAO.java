package com.poly.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.poly.model.BoSach;

import java.util.List;



public interface BoSachDAO extends JpaRepository<BoSach, Long> {
    // Các phương thức tùy chỉnh nếu cần
    @Query("SELECT s FROM BoSach s JOIN SanPham p on s.id = p.boSach.id WHERE p.boSach.id = :id")
    BoSach findBySach(@Param("id") Long id);

    List<BoSach> findByTenBoSachContaining(String tenBoSach);

    boolean existsByTenBoSach(String tenBoSach);

   

}
