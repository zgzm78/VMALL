package com.vmall.service;

import com.vmall.dto.CartItemRequest;
import com.vmall.model.CartItem;

import java.util.List;

public interface CartService {
    List<CartItem> getCartItems(Long userId);

    CartItem addToCart(Long userId, CartItemRequest request);

    CartItem updateQuantity(Long userId, Long itemId, Integer quantity);

    void removeItem(Long userId, Long itemId);

    void clearCart(Long userId);
}
