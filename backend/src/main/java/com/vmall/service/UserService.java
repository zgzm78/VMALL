package com.vmall.service;

import com.vmall.dto.LoginRequest;
import com.vmall.dto.RegisterRequest;
import com.vmall.model.User;

public interface UserService {
    User register(RegisterRequest request);

    User login(LoginRequest request);

    User getById(Long id);
}
