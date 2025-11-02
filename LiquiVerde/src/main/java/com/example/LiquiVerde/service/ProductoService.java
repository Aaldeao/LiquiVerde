package com.example.LiquiVerde.service;

import com.example.LiquiVerde.model.Producto;
import com.example.LiquiVerde.repository.ProductoRepository;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    /*
    Requisito: Análisis de productos escaneados/buscados.
    Flujo: Busca directamente en la DB local (asumiendo datos enriquecidos).
     */
    public Producto getProductoEnriquecido(String codigo) {
        // Buscar directamente en DB local
        Optional<Producto> productoOpt = productoRepository.findByCodigo(codigo);
        
        if (productoOpt.isEmpty()) {
             return null; // El producto no existe en nuestra base de datos.
        }
        return productoOpt.get(); 
    }
    
    /*
    Algoritmo de Sustitución: Busca alternativas más sostenibles y/o económicas en la DB local.
     */
    public List<Producto> getAlternativasSostenibles(String codigo) {
        
        Producto productoOriginal = getProductoEnriquecido(codigo);
        if (productoOriginal == null || productoOriginal.getCategorias() == null) {
            return Collections.emptyList();
        }

        // Usamos la primera categoría para la búsqueda (ej. de "Lacteos, Yogurt" usamos "Lacteos")
        String categoriaPrincipal = productoOriginal.getCategorias().split(",")[0].trim();
        
        // Obtener todos los productos y filtrar en memoria (simple para el test)
        List<Producto> todosLosProductos = productoRepository.findAll();
        
        List<Producto> alternativas = todosLosProductos.stream()
            // Filtrar por la misma categoría
            .filter(p -> p.getCategorias() != null && p.getCategorias().contains(categoriaPrincipal))
            // Excluir el producto original
            .filter(p -> !p.getCodigo().equals(codigo))
            // Filtrar: Alternativas con mejor Score TOTAL O más baratas
            .filter(p -> 
                p.getScoreTotal() > productoOriginal.getScoreTotal() || 
                p.getPrecio() < productoOriginal.getPrecio())
            .sorted((p1, p2) -> Double.compare(p2.getScoreTotal(), p1.getScoreTotal())) // Ordenar por mejor score
            .limit(5) // Limitar a las 5 mejores opciones
            .collect(Collectors.toList());

        return alternativas;
    }
}