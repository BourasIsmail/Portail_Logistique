package com.mdms.backend.security.jwt;


import com.mdms.backend.security.service.UserDetailsImp;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${spring.app.jwtSecret}")
    private String secretKey;

    @Value("${spring.app.jwtExpirationMs}")
    private int jwtEprirationMs;

    public String generateToken(UserDetailsImp userDetails) {
        String username = userDetails.getUsername();
        String email = userDetails.getEmail();
        String role = userDetails.getAuthorities().stream().toList().get(0).getAuthority();

        return Jwts.builder()
                .subject(email)
                .claim("username", username)
                .claim("email", email)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtEprirationMs))
                .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey)))
                .compact();
    }


    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey)))
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public String getJwtFromHeader(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        logger.debug("Authorization Header: {}", bearerToken);
        if (bearerToken != null && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7); // Remove Bearer prefix
        }
        return null;
    }

    public boolean validateJwtToken(String authToken) {
        try {
//            System.out.println("Token Validated in JwtUtils" + authToken);
            Jwts.parser().verifyWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey)))
                    .build().parseSignedClaims(authToken);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
            throw new ExpiredJwtException(e.getHeader(), e.getClaims(), e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}
