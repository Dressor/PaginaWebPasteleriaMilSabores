package com.milsabores.ventas.config;

import com.milsabores.ventas.seguridad.JwtFiltro;
import com.milsabores.ventas.seguridad.JwtUtil;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FiltroConfig {
    private final JwtUtil jwtUtil;

    public FiltroConfig(JwtUtil jwtUtil) { this.jwtUtil = jwtUtil; }

    @Bean
    public FilterRegistrationBean<JwtFiltro> jwtFilter() {
        FilterRegistrationBean<JwtFiltro> fr = new FilterRegistrationBean<>();
        fr.setFilter(new JwtFiltro(jwtUtil));
        fr.addUrlPatterns("/api/v1/*");
        fr.setOrder(1);
        return fr;
    }
}
