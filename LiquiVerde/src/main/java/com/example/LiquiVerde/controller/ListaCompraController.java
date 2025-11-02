package com.example.LiquiVerde.controller;

import com.example.LiquiVerde.model.ListaCompra;
import com.example.LiquiVerde.repository.ListaCompraRepository;
import com.example.LiquiVerde.service.OptimizacionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/listas")
public class ListaCompraController {

    private final ListaCompraRepository listaCompraRepository;
    private final OptimizacionService optimizacionService;

    public ListaCompraController(ListaCompraRepository listaCompraRepository, OptimizacionService optimizacionService) {
        this.listaCompraRepository = listaCompraRepository;
        this.optimizacionService = optimizacionService;
    }

    // Guardar la lista original del usuario
    @PostMapping
    public ResponseEntity<ListaCompra> createLista(@RequestBody ListaCompra lista) {
        ListaCompra savedLista = listaCompraRepository.save(lista);
        return ResponseEntity.ok(savedLista);
    }

    // Generador de listas de compras optimizadas
    @PostMapping("/optimize")
    public ResponseEntity<ListaCompra> optimizeLista(@RequestBody ListaCompra lista) {
        // El Algoritmo de Mochila se ejecuta en el servicio
        ListaCompra listaOptimizada = optimizacionService.optimizarLista(lista);
        
        // Opcional: Guardar la lista optimizada para referencia futura
        listaCompraRepository.save(listaOptimizada); 
        
        return ResponseEntity.ok(listaOptimizada); // Devuelve la lista optimizada, lista para el dashboard
    }
}