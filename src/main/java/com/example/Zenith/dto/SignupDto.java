package com.example.Zenith.dto;

import jakarta.validation.constraints.*;

public class SignupDto {
    @NotNull(message = "username required")
    @NotBlank(message = "username can not be blank")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Username can only contain letters, numbers, and underscores")
    private String userName;
    @NotBlank(message = "password can not be blank")
    @NotNull(message = "password need to have characters")
    @Size(min=6, message = "at least 6 characters needed")
    private String password;
    @NotNull(message = "email required")
    @NotBlank(message = "email can not be blank")
    @Email(message = "invalid email format")
    private String email;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
