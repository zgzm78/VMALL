package com.vmall.service.impl;

import com.vmall.model.CartItem;
import com.vmall.model.Order;
import com.vmall.model.OrderItem;
import com.vmall.model.OrderStatus;
import com.vmall.model.Product;
import com.vmall.model.User;
import com.vmall.repository.CartItemRepository;
import com.vmall.repository.OrderItemRepository;
import com.vmall.repository.OrderRepository;
import com.vmall.repository.ProductRepository;
import com.vmall.repository.UserRepository;
import com.vmall.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public Order createOrder(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        if (cartItems.isEmpty()) {
            throw new IllegalArgumentException("Cart is empty");
        }

        // Validate stock and calculate total
        BigDecimal total = BigDecimal.ZERO;
        for (CartItem item : cartItems) {
            Product product = item.getProduct();
            if (product.getStock() < item.getQuantity()) {
                throw new IllegalArgumentException("Insufficient stock for product: " + product.getName());
            }
            total = total.add(product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        Order order = Order.builder()
                .user(user)
                .status(OrderStatus.PENDING)
                .totalAmount(total)
                .build();

        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            Product product = cartItem.getProduct();
            product.setStock(product.getStock() - cartItem.getQuantity());
            productRepository.save(product);

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(cartItem.getQuantity())
                    .price(product.getPrice())
                    .build();
            orderItems.add(orderItem);
        }

        order.setItems(orderItems);
        Order savedOrder = orderRepository.save(order);
        orderItemRepository.saveAll(orderItems);

        cartItemRepository.deleteByUserId(userId);

        return savedOrder;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Order> listOrders(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
}
