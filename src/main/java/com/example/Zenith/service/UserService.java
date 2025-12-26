package com.example.Zenith.service;

import com.example.Zenith.dto.AuthResponse;
import com.example.Zenith.dto.LoginDto;
import com.example.Zenith.dto.SignupDto;
import com.example.Zenith.entity.Users;
import com.example.Zenith.repository.UserRepo;
import com.example.Zenith.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Transactional
    public boolean signUp(SignupDto signupDto){
        if(isEmailExists(signupDto.getEmail())){
            throw new RuntimeException("Email already exists");
        }


        if(isUserNameExists(signupDto.getUserName())){
            throw new RuntimeException("Username already taken");
        }
        Users users= new Users();
        users.setEmail(signupDto.getEmail());
        users.setPassword(passwordEncoder.encode(signupDto.getPassword()));
        users.setUsername(signupDto.getUserName());
        userRepo.save(users);

        return true;

    }
    public boolean isUserNameExists(String userName){
        return userRepo.existsByUsername(userName);
    }
    public boolean isEmailExists(String email){
        return userRepo.existsByEmail(email);
    }

    public AuthResponse logIn(LoginDto loginDto){
        Optional<Users> usersOptional =null;
        if(loginDto.getIdentifier().contains("@")){
            usersOptional=userRepo.findByEmail(loginDto.getIdentifier());
        }
        else{
            usersOptional= userRepo.findByUsername(loginDto.getIdentifier());
        }
        if(usersOptional.isEmpty()){
            return null;
        }
        Users users= usersOptional.get();
        if(!passwordEncoder.matches(loginDto.getPassword(),users.getPassword())){
            return null;
        }
        AuthResponse authResponse= new AuthResponse();
        Map<String,Object> mp=new HashMap<>();
        authResponse.setToken(jwtUtil.createToken( mp, users.getEmail()));
        return authResponse;

    }
}
