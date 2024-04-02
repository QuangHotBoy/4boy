package com.poly.model;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Quyen implements Serializable{
    @Id
    @Column(name = "id")
    private String id;
    
    @Column(name = "ten")
    private String ten;

    @JsonIgnore
    @OneToMany(mappedBy = "quyen", cascade = CascadeType.ALL)
    private List<Quyen_TaiKhoan> quyenTaiKhoan;
}
