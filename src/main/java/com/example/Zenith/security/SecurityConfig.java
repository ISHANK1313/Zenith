package com.example.Zenith.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig  {
    @Bean
    public PasswordEncoder passwordEncoder(){
     return new BCryptPasswordEncoder();
    }
    @Bean
public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
   SecurityFilterChain security= httpSecurity.authorizeHttpRequests(http->http
            .requestMatchers("/auth").permitAll().anyRequest().authenticated())
            .csrf(csrf->csrf.disable())
            .build();
    return security;
}

}
