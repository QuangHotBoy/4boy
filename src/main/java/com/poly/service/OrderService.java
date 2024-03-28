package com.poly.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.poly.model.DonDatHang;

public interface OrderService {
    public DonDatHang create(JsonNode orderData) ;

}
