package com.vmall.service;

import com.vmall.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> listProducts(Long categoryId, String keyword);

    Product getProduct(Long id);
}
