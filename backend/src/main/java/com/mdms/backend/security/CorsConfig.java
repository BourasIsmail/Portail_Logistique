package com.mdms.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://172.16.20.6:5173");
        config.addAllowedOrigin("http://172.16.20.6");
        config.addAllowedOrigin("https://172.16.20.6:5173");
        config.addAllowedOrigin("https://172.16.20.6");
        config.addAllowedOrigin("172.16.20.6:5173");
        config.addAllowedOrigin("http://localhost:5173");
        config.addAllowedOrigin("http://localhost");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/", config);
        return new CorsFilter(source);
    }
}