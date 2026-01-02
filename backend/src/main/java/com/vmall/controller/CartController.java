package com.vmall.controller;

import com.vmall.dto.ApiResponse;
import com.vmall.dto.CartItemDto;
import com.vmall.dto.CartItemRequest;
import com.vmall.dto.DtoMapper;
import com.vmall.dto.UpdateCartQuantityRequest;
import com.vmall.model.CartItem;
import com.vmall.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users/{userId}/cart")
@RequiredArgsConstructor
@Validated
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CartItemDto>>> listCart(@PathVariable Long userId) {
        List<CartItem> items = cartService.getCartItems(userId);
        List<CartItemDto> dtoList = items.stream().map(DtoMapper::toCartItemDto).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.<List<CartItemDto>>builder()
                .success(true)
                .message("ok")
                .data(dtoList)
                .build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CartItemDto>> addToCart(@PathVariable Long userId,
                                                              @RequestBody @Validated CartItemRequest request) {
        CartItem item = cartService.addToCart(userId, request);
        return ResponseEntity.ok(ApiResponse.<CartItemDto>builder()
                .success(true)
                .message("Added to cart")
                .data(DtoMapper.toCartItemDto(item))
                .build());
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<ApiResponse<CartItemDto>> updateQuantity(@PathVariable Long userId,
                                                                   @PathVariable Long itemId,
                                                                   @RequestBody @Validated UpdateCartQuantityRequest request) {
        CartItem item = cartService.updateQuantity(userId, itemId, request.getQuantity());
        return ResponseEntity.ok(ApiResponse.<CartItemDto>builder()
                .success(true)
                .message("Quantity updated")
                .data(DtoMapper.toCartItemDto(item))
                .build());
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<ApiResponse<Void>> removeItem(@PathVariable Long userId, @PathVariable Long itemId) {
        cartService.removeItem(userId, itemId);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .success(true)
                .message("Removed")
                .build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .success(true)
                .message("Cart cleared")
                .build());
    }
}
