package com.poly.service;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.poly.model.GioHang;

@Service
public interface CartService {
    
    GioHang create(JsonNode cartData);

    Map<Integer, ArrayList> findByUser(String user);
}
