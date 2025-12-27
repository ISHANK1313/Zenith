package com.example.Zenith.controller;

import com.example.Zenith.dto.AuthResponse;
import com.example.Zenith.dto.LoginDto;
import com.example.Zenith.dto.SignupDto;
import com.example.Zenith.repository.UserRepo;
import com.example.Zenith.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignupDto signupDto) {
        try {
            if (!userService.signUp(signupDto)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("User already exists");
            }

            return ResponseEntity.status(HttpStatus.CREATED).body("User created please login");

        }
        catch (RuntimeException r){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(r.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid email or password format");
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> logIn(@Valid @RequestBody LoginDto loginDto){
        try{
            AuthResponse authResponse= userService.logIn(loginDto);
            if(authResponse == null){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid credentials");
            }
            return ResponseEntity.ok(authResponse);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid email or password format");
        }
    }

}


