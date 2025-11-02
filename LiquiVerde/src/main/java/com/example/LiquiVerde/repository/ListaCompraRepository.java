package com.example.LiquiVerde.repository;

import com.example.LiquiVerde.model.ListaCompra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListaCompraRepository extends JpaRepository<ListaCompra, Long> {
}