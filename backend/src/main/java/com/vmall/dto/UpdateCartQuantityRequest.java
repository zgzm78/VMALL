package com.vmall.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateCartQuantityRequest {
    @NotNull
    @Min(1)
    private Integer quantity;
}
