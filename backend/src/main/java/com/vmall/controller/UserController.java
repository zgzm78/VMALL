package com.vmall.controller;

import com.vmall.dto.ApiResponse;
import com.vmall.dto.DtoMapper;
import com.vmall.dto.LoginRequest;
import com.vmall.dto.RegisterRequest;
import com.vmall.dto.UserDto;
import com.vmall.model.User;
import com.vmall.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Validated
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserDto>> register(@RequestBody @Validated RegisterRequest request) {
        User user = userService.register(request);
        return ResponseEntity.ok(ApiResponse.<UserDto>builder()
                .success(true)
                .message("Registered")
                .data(DtoMapper.toUserDto(user))
                .build());
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserDto>> login(@RequestBody @Validated LoginRequest request) {
        User user = userService.login(request);
        return ResponseEntity.ok(ApiResponse.<UserDto>builder()
                .success(true)
                .message("Logged in")
                .data(DtoMapper.toUserDto(user))
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDto>> getUser(@PathVariable Long id) {
        User user = userService.getById(id);
        return ResponseEntity.ok(ApiResponse.<UserDto>builder()
                .success(true)
                .message("ok")
                .data(DtoMapper.toUserDto(user))
                .build());
    }
}
