package com.vmall.service;

import com.vmall.model.Order;

import java.util.List;

public interface OrderService {
    Order createOrder(Long userId);

    List<Order> listOrders(Long userId);
}
