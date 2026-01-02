package com.vmall.repository;

import com.vmall.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);

    List<Product> findByNameContainingIgnoreCase(String keyword);

    List<Product> findByCategoryIdAndNameContainingIgnoreCase(Long categoryId, String keyword);
}
