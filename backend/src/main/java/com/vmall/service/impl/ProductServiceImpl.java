package com.vmall.service.impl;

import com.vmall.model.Product;
import com.vmall.repository.ProductRepository;
import com.vmall.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Product> listProducts(Long categoryId, String keyword) {
        boolean hasCategory = categoryId != null;
        boolean hasKeyword = StringUtils.hasText(keyword);

        if (hasCategory && hasKeyword) {
            return productRepository.findByCategoryIdAndNameContainingIgnoreCase(categoryId, keyword);
        }
        if (hasCategory) {
            return productRepository.findByCategoryId(categoryId);
        }
        if (hasKeyword) {
            return productRepository.findByNameContainingIgnoreCase(keyword);
        }
        return productRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Product getProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
    }
}
