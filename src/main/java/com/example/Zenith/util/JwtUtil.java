package com.example.Zenith.util;

import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;
    private Key getSigningKey(){
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String createToken(Map<String,Object> mp, String email){
        return Jwts.builder()
                .setClaims(mp)
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+86400000))
                .signWith(getSigningKey())
                .compact();
    }

    public boolean isTokenValid(String token){
        if(token==null|| token.trim().isEmpty()){
            return false;
        }
        try{
            Jwts.parserBuilder().setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    public String extractEmailFromToken(String token){
        return Jwts.parserBuilder().setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody().getSubject();
    }

}
