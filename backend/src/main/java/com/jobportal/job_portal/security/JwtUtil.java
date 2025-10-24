package com.jobportal.job_portal.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    private static final String jwtSecret = "SuperSecretKeyForJWTGeneration1234567890";
    private static final long jwtExpirationMs = 24*60*60*1000;

    private final Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

    //Generating Token Here
    public String generateToken(String username){
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+jwtExpirationMs))
                .signWith(key,SignatureAlgorithm.HS256)
                .compact();
    }


//    Extract Username
    public String extractUsername(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }


    //Token Expiration
    public boolean isTokenExpired(String token){
        Date expiration = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());

    }


    //Validating Token
    public boolean validateToken(String token, String username){
        return username.equals(extractUsername(token)) && !isTokenExpired(token);
    }


}
