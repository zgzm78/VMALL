package com.vmall.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String phone;
    private String address;
    private LocalDateTime createdAt;
}
