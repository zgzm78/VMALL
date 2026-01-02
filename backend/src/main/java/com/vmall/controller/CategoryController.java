package com.vmall.controller;

import com.vmall.dto.ApiResponse;
import com.vmall.model.Category;
import com.vmall.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Category>>> listCategories() {
        List<Category> categories = categoryService.listCategories();
        return ResponseEntity.ok(ApiResponse.<List<Category>>builder()
                .success(true)
                .message("ok")
                .data(categories)
                .build());
    }
}
