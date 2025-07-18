package com.mdms.backend.controller;

import com.mdms.backend.entity.Ticket;
import com.mdms.backend.request.AuthRequest;
import com.mdms.backend.respository.UserRepository;
import com.mdms.backend.security.jwt.JwtUtils;
import com.mdms.backend.security.service.UserDetailsImp;
import com.mdms.backend.security.service.UserDetailsServiceImp;
import com.mdms.backend.service.TicketService;
import com.mdms.backend.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TicketService ticketService;
    @Autowired
    private UserDetailsServiceImp userDetailsServiceImp;


    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest request, HttpServletResponse response) {
        Authentication authentication;
        try {
            authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (AuthenticationException exception) {
            Map<String, Object> map = new HashMap<>();
            map.put("message", "Bad credentials");
            map.put("status", false);
            return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImp userDetails = (UserDetailsImp) authentication.getPrincipal();

        String jwtToken = jwtUtils.generateToken(userDetails);
        ResponseCookie cookie = ResponseCookie.from("jwt", jwtToken)
                .path("/")
                .maxAge(Duration.ofDays(1))
                .sameSite("Lax")
                .build();

        String RefreshjwtToken = jwtUtils.generateToken(userDetails);
        ResponseCookie cookie2 = ResponseCookie.from("refreshToken", RefreshjwtToken)
                .path("/")
                .maxAge(7*24*60*60)
                .sameSite("Lax")
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        response.setHeader(HttpHeaders.SET_COOKIE, cookie2.toString());

        Map<String, Object> res = new HashMap<>();
        res.put("username", userDetails.getUsername());
        res.put("email", userDetails.getEmail());
        res.put("role", userDetails.getAuthorities().stream().toList().get(0).getAuthority());


        return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.SET_COOKIE, cookie.toString()).body(res);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@CookieValue("refreshToken") String refreshToken, HttpServletResponse response) {
        try {
            if (refreshToken != null && jwtUtils.validateJwtToken(refreshToken)) {

                String username = jwtUtils.getUserNameFromJwtToken(refreshToken);
                UserDetailsImp userDetails = (UserDetailsImp) userDetailsServiceImp.loadUserByUsername(username);

                String jwt = jwtUtils.generateToken(userDetails);
                ResponseCookie cookie = ResponseCookie.from("jwt", jwt)
                        .path("/")
                        .maxAge(Duration.ofDays(1))
                        .sameSite("Lax")
                        .build();

                return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.SET_COOKIE, cookie.toString()).body(Map.of("refreshToken", jwt));
            } else {
                throw new ExpiredJwtException(null, null, "refresh token expired");
            }
        } catch (ExpiredJwtException e) {
            ResponseCookie deleteCookie = ResponseCookie.from("jwt", "")
                    .path("/")
                    .maxAge(0)
                    .build();
            ResponseCookie deleteRefreshCookie = ResponseCookie.from("refreshToken", "")
                    .path("/")
                    .maxAge(0)
                    .build();

            response.setHeader(HttpHeaders.SET_COOKIE, deleteCookie.toString());
            response.setHeader(HttpHeaders.SET_COOKIE, deleteRefreshCookie.toString());

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserDetails(@AuthenticationPrincipal UserDetailsImp userDetails) {
        if(userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Map<String, Object> response = new HashMap<>();
        response.put("username", userDetails.getUsername());
        response.put("email", userDetails.getUsername());
        response.put("role", userDetails.getAuthorities().stream().toList().get(0).getAuthority());

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }



}
