package com.vmall.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

/**
 * Line item for an order, combining product info, quantity, and price snapshot.
 */
@Data
@Builder
public class OrderItemDto {
    private Long id;
    private ProductDto product;
    private Integer quantity;
    private BigDecimal price;
}
