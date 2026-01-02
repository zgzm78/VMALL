package com.vmall.service.impl;

import com.vmall.dto.LoginRequest;
import com.vmall.dto.RegisterRequest;
import com.vmall.model.User;
import com.vmall.repository.UserRepository;
import com.vmall.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public User register(RegisterRequest request) {
        userRepository.findByUsername(request.getUsername()).ifPresent(user -> {
            throw new IllegalArgumentException("Username already exists");
        });
        if (request.getEmail() != null) {
            userRepository.findByEmail(request.getEmail()).ifPresent(user -> {
                throw new IllegalArgumentException("Email already exists");
            });
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(request.getPassword())
                .phone(request.getPhone())
                .address(request.getAddress())
                .build();
        return userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public User login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (!user.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }
        return user;
    }

    @Override
    @Transactional(readOnly = true)
    public User getById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}
