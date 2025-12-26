package com.example.Zenith.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class ScoreSubmitDto {
    @NotNull(message = "Score is required")
    @Min(value = 0, message = "Score must be positive")
    @Max(value = 1000000, message = "Score cannot exceed 1,000,000")
    private Long score;

    public Long getScore() {
        return score;
    }

    public void setScore(Long score) {
        this.score = score;
    }
}
