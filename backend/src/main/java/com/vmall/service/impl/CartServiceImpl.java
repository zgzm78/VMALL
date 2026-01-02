package com.vmall.service.impl;

import com.vmall.dto.CartItemRequest;
import com.vmall.model.CartItem;
import com.vmall.model.Product;
import com.vmall.model.User;
import com.vmall.repository.CartItemRepository;
import com.vmall.repository.ProductRepository;
import com.vmall.repository.UserRepository;
import com.vmall.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CartItem> getCartItems(Long userId) {
        assertUserExists(userId);
        return cartItemRepository.findByUserId(userId);
    }

    @Override
    @Transactional
    public CartItem addToCart(Long userId, CartItemRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        if (request.getQuantity() > product.getStock()) {
            throw new IllegalArgumentException("Insufficient stock");
        }

        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, request.getProductId())
                .map(item -> {
                    int newQuantity = item.getQuantity() + request.getQuantity();
                    if (newQuantity > product.getStock()) {
                        throw new IllegalArgumentException("Insufficient stock");
                    }
                    item.setQuantity(newQuantity);
                    return item;
                })
                .orElseGet(() -> CartItem.builder()
                        .user(user)
                        .product(product)
                        .quantity(request.getQuantity())
                        .build());

        return cartItemRepository.save(cartItem);
    }

    @Override
    @Transactional
    public CartItem updateQuantity(Long userId, Long itemId, Integer quantity) {
        if (quantity == null || quantity < 1) {
            throw new IllegalArgumentException("Quantity must be at least 1");
        }
        CartItem cartItem = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("Cart item not found"));
        if (!cartItem.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Not allowed to modify this cart");
        }
        if (quantity > cartItem.getProduct().getStock()) {
            throw new IllegalArgumentException("Insufficient stock");
        }
        cartItem.setQuantity(quantity);
        return cartItemRepository.save(cartItem);
    }

    @Override
    @Transactional
    public void removeItem(Long userId, Long itemId) {
        CartItem cartItem = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("Cart item not found"));
        if (!cartItem.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Not allowed to modify this cart");
        }
        cartItemRepository.delete(cartItem);
    }

    @Override
    @Transactional
    public void clearCart(Long userId) {
        assertUserExists(userId);
        cartItemRepository.deleteByUserId(userId);
    }

    private void assertUserExists(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}
