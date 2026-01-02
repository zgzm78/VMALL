package com.vmall.controller;

import com.vmall.dto.ApiResponse;
import com.vmall.dto.DtoMapper;
import com.vmall.dto.ProductDto;
import com.vmall.model.Product;
import com.vmall.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductDto>>> listProducts(
            @RequestParam(name = "categoryId", required = false) Long categoryId,
            @RequestParam(name = "keyword", required = false) String keyword) {
        List<Product> products = productService.listProducts(categoryId, keyword);
        List<ProductDto> dtoList = products.stream()
                .map(DtoMapper::toProductDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.<List<ProductDto>>builder()
                .success(true)
                .message("ok")
                .data(dtoList)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDto>> getProduct(@PathVariable Long id) {
        Product product = productService.getProduct(id);
        return ResponseEntity.ok(ApiResponse.<ProductDto>builder()
                .success(true)
                .message("ok")
                .data(DtoMapper.toProductDto(product))
                .build());
    }
}
