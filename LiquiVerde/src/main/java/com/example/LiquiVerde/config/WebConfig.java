package com.example.LiquiVerde.config; // Ajuste el paquete si es necesario

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Permite peticiones desde el puerto de desarrollo estándar de Vite/React (5173 o 3000)
        registry.addMapping("/api/v1/**") // Aplica la configuración a todos sus endpoints /api/v1
                .allowedOrigins("http://localhost:5173", "http://localhost:3000") // Permite estos orígenes
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
                .allowedHeaders("*") // Permite todos los encabezados
                .allowCredentials(true); // Permite credenciales (si las usara)
    }
}