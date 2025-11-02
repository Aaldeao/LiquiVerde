package com.example.LiquiVerde.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "productos")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder

public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre; // Nombre del producto
    private String marca; // Marca del producto
    private String codigo; // Código de barras
    
    @Column(columnDefinition = "text")
    private String categorias; // Categorías del producto
    @Column(columnDefinition = "text")
    private String etiquetas; // Etiquetas del producto

    private String origen; // Origen del producto
    private Double precio; // Precio del producto

    // Scores de sostenibilidad
    private Double scoreEconomico;
    private Double scoreAmbiental;
    private Double scoreSocial; 
    private Double scoreTotal; // Score total del producto

    private String envase; // Tipo de envase

}