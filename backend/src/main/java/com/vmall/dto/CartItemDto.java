package com.vmall.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemDto {
    private Long id;
    private Integer quantity;
    private ProductDto product;
}
