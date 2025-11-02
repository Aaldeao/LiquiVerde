package com.example.LiquiVerde.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "listas_compra")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ListaCompra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre; // Nombre de la lista de compra
    private Double presupuestoMaximo; // Capacidad de la "Mochila" económica

    @ElementCollection // Permite guardar una lista de IDs de productos
    private List<String> codigosOriginales = new ArrayList<>(); 
    
    @ElementCollection // Lista de códigos optimizados por el Algoritmo de Mochila
    private List<String> codigosOptimizados = new ArrayList<>(); 
    
    private Double costoTotalOriginal; // Costo total de la lista original
    private Double costoTotalOptimizado; // Costo total de la lista optimizada
    
    private Double impactoTotalOriginal; // Score Sostenibilidad promedio
    private Double impactoTotalOptimizado; // Score Sostenibilidad promedio
}
