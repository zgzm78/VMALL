package com.vmall.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * Product data returned to clients, including category metadata and any detail image URLs.
 */
@Data
@Builder
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private String imageUrl;
    private Long categoryId;
    private String categoryName;
    private List<String> detailImages;
}
