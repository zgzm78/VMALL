package com.vmall.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank
    @Size(min = 3, max = 32)
    private String username;

    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 64)
    private String password;

    private String phone;

    private String address;
}
