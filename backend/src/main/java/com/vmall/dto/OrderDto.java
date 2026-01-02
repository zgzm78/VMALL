package com.vmall.dto;

import com.vmall.model.OrderStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Aggregate order payload sent to clients with status, timestamps, and line items.
 */
@Data
@Builder
public class OrderDto {
    private Long id;
    private BigDecimal totalAmount;
    private OrderStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<OrderItemDto> items;
}
