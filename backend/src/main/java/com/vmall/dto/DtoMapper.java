package com.vmall.dto;

import com.vmall.model.CartItem;
import com.vmall.model.Order;
import com.vmall.model.OrderItem;
import com.vmall.model.Product;
import com.vmall.model.ProductImage;
import com.vmall.model.User;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Utility helpers to translate domain models into DTOs with null-safe builders.
 */
public final class DtoMapper {

    private DtoMapper() {
    }

    /**
     * Maps a {@link User} to {@link UserDto}, returning {@code null} when the input is {@code null}.
     */
    public static UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                .createdAt(user.getCreatedAt())
                .build();
    }

    /**
     * Maps a {@link Product} to {@link ProductDto}, including category and image metadata when present.
     */
    public static ProductDto toProductDto(Product product) {
        if (product == null) {
            return null;
        }
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stock(product.getStock())
                .imageUrl(product.getImageUrl())
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .detailImages(product.getImages() == null ? Collections.emptyList() :
                        product.getImages().stream().map(ProductImage::getImageUrl).collect(Collectors.toList()))
                .build();
    }

    /**
     * Maps a cart item entity to its DTO, preserving quantity and nested product details.
     */
    public static CartItemDto toCartItemDto(CartItem item) {
        if (item == null) {
            return null;
        }
        return CartItemDto.builder()
                .id(item.getId())
                .quantity(item.getQuantity())
                .product(toProductDto(item.getProduct()))
                .build();
    }

    /**
     * Maps an order item entity to its DTO, keeping quantity and captured price information.
     */
    public static OrderItemDto toOrderItemDto(OrderItem item) {
        if (item == null) {
            return null;
        }
        return OrderItemDto.builder()
                .id(item.getId())
                .product(toProductDto(item.getProduct()))
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .build();
    }

    /**
     * Maps an order aggregate to {@link OrderDto}, composing item DTOs and preserving timestamps.
     */
    public static OrderDto toOrderDto(Order order) {
        if (order == null) {
            return null;
        }
        List<OrderItemDto> itemDtos = order.getItems() == null ? Collections.emptyList()
                : order.getItems().stream()
                .filter(Objects::nonNull)
                .map(DtoMapper::toOrderItemDto)
                .collect(Collectors.toList());

        return OrderDto.builder()
                .id(order.getId())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .items(itemDtos)
                .build();
    }
}
