package com.vmall.controller;

import com.vmall.dto.ApiResponse;
import com.vmall.dto.DtoMapper;
import com.vmall.dto.OrderDto;
import com.vmall.model.Order;
import com.vmall.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users/{userId}/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<ApiResponse<OrderDto>> createOrder(@PathVariable Long userId) {
        Order order = orderService.createOrder(userId);
        return ResponseEntity.ok(ApiResponse.<OrderDto>builder()
                .success(true)
                .message("Order created")
                .data(DtoMapper.toOrderDto(order))
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderDto>>> listOrders(@PathVariable Long userId) {
        List<Order> orders = orderService.listOrders(userId);
        List<OrderDto> dtoList = orders.stream().map(DtoMapper::toOrderDto).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.<List<OrderDto>>builder()
                .success(true)
                .message("ok")
                .data(dtoList)
                .build());
    }
}
