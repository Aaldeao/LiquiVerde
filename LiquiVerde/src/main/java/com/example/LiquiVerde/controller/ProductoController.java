package com.example.LiquiVerde.controller;

import com.example.LiquiVerde.model.Producto;
import com.example.LiquiVerde.service.ProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/productos")
public class ProductoController {

    private final ProductoService productoService;
    
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    //Escáner de productos / Análisis de productos
    @GetMapping("/scan/{codigo}")
    public ResponseEntity<Producto> getProductoPorCodigo(@PathVariable String codigo) {
        try {
            Producto producto = productoService.getProductoEnriquecido(codigo);
            if (producto == null) {
                 return ResponseEntity.notFound().build(); // Devuelve 404 si no existe en la DB
            }
            return ResponseEntity.ok(producto); // Devuelve el producto con sus scores
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    // Sistema de Sustitución Inteligente (Bonus)
    @GetMapping("/alternatives/{codigo}")
    public ResponseEntity<List<Producto>> getAlternativas(@PathVariable String codigo) {
        try {
            List<Producto> alternativas = productoService.getAlternativasSostenibles(codigo);
            if (alternativas.isEmpty()) {
                return ResponseEntity.noContent().build(); // HTTP 204 si no hay alternativas
            }
            return ResponseEntity.ok(alternativas); 
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }
}