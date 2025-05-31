package Candidate.demo.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable()
                .headers(headers -> headers
                        .frameOptions(frameOptions -> frameOptions.disable()) // ❗️Disable X-Frame-Options
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/trail-request/**",
                                "/api/trail-request/accepted",
                                "/api/trail-request/signup-with-approvals",
                                "/api/payments",
                                "/api/payments/**",
                                "api/results/upload",
                                "api/results/**"
                        ).permitAll()
                        .requestMatchers("/api/users/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .httpBasic();

        return http.build();
    }
}
