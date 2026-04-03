package com.placementmanagement.config;

import com.placementmanagement.security.JwtAuthenticationFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .cors(cors -> {})   // ✅ Enable CORS

            .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )


.authorizeHttpRequests(auth -> auth

    .requestMatchers("/api/auth/**").permitAll()
    .requestMatchers("/api/users").permitAll()

    .requestMatchers("/uploads/**").permitAll()

    .requestMatchers("/api/coordinators/reports/students")
.hasRole("PLACEMENT_COORDINATOR")



    // Add this line in your securityFilterChain method
.requestMatchers("/api/applications/**").hasAnyAuthority("ROLE_STUDENT", "ROLE_PLACEMENT_COORDINATOR")

    // STUDENT APIs (MUST COME FIRST)
    .requestMatchers("/api/student/**").hasAuthority("ROLE_STUDENT")
    .requestMatchers("/api/drives/public/**").permitAll()
    // COORDINATOR APIs
    .requestMatchers("/api/drive-status/**")
.hasAnyRole("DEPT_COORDINATOR", "PLACEMENT_COORDINATOR", "STUDENT")
    .requestMatchers("/api/department/**").hasAuthority("ROLE_DEPT_COORDINATOR")
    
    // ADMIN APIs
    .requestMatchers("/api/admin/**").hasAuthority("ROLE_PLACEMENT_COORDINATOR")
    .requestMatchers("/api/drives/**").hasAuthority("ROLE_PLACEMENT_COORDINATOR")
//     .requestMatchers("/api/drives/**")
// .hasAnyAuthority("ROLE_PLACEMENT_COORDINATOR", "ROLE_STUDENT")
    .requestMatchers("/api/coordinators/**").hasAuthority("ROLE_PLACEMENT_COORDINATOR")

    .anyRequest().authenticated()
)
            .addFilterBefore(jwtAuthenticationFilter,
                    UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {

        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    // ✅ CORS Configuration for React
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}