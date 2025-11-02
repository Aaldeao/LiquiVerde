package com.example.LiquiVerde.repository;

import com.example.LiquiVerde.model.Producto;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    Optional<Producto> findByCodigo(String codigo); //Para buscar productos

    List<Producto> findByCodigoIn(List<String> codigos); //Lista de productos por sus códigos
    List<Producto> findByNombreContainingIgnoreCase(String nombre); //Buscar productos por nombre
}
