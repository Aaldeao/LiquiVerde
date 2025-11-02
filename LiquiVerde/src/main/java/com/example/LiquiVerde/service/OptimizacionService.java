package com.example.LiquiVerde.service;

import com.example.LiquiVerde.model.Producto;
import com.example.LiquiVerde.model.ListaCompra;
import com.example.LiquiVerde.repository.ProductoRepository;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class OptimizacionService {

    private final ProductoRepository productoRepository;

    public OptimizacionService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    /**
     * Implementación del Algoritmo de Mochila Multi-objetivo
     * Criterios: 1) Maximizar Score Total (Sostenibilidad), 2) Restricción de Presupuesto.
     */
    public ListaCompra optimizarLista(ListaCompra lista) {
        // 1. Obtener los productos reales de la DB
        List<Producto> productos = productoRepository.findByCodigoIn(lista.getCodigosOriginales());
        
        if (productos.isEmpty() || lista.getPresupuestoMaximo() == null) {
            return lista; 
        }

        // 2. Implementación simplificada del Algoritmo de Mochila
        double presupuestoMaximo = lista.getPresupuestoMaximo();
        List<Producto> productosOptimizados = new ArrayList<>();
        double costoActual = 0.0;
        double impactoActual = 0.0; // Suma de ScoreTotal
        
        // Criterio Greedy: Priorizar el ratio (Valor/Peso): ScoreTotal / Precio
        productos.sort((p1, p2) -> {
            double ratio1 = p1.getScoreTotal() / p1.getPrecio();
            double ratio2 = p2.getScoreTotal() / p2.getPrecio();
            return Double.compare(ratio2, ratio1); // Orden descendente (mejor ratio primero)
        });

        // Seleccionar productos hasta agotar presupuesto
        for (Producto p : productos) {
            if (costoActual + p.getPrecio() <= presupuestoMaximo) {
                productosOptimizados.add(p);
                costoActual += p.getPrecio();
                impactoActual += p.getScoreTotal();
            }
        }
        
        // 3. Actualizar la ListaCompra con los resultados de la optimización
        lista.setCodigosOptimizados(productosOptimizados.stream().map(Producto::getCodigo).toList());
        lista.setCostoTotalOptimizado(costoActual);
        
        // Calcular impacto promedio optimizado
        double impactoOptimizadoPromedio = productosOptimizados.isEmpty() ? 0.0 : impactoActual / productosOptimizados.size();
        lista.setImpactoTotalOptimizado(impactoOptimizadoPromedio); 
        
        // Calcular impacto original (solo para fines de comparación en el frontend)
        double costoOriginal = productos.stream().mapToDouble(Producto::getPrecio).sum();
        double impactoOriginalPromedio = productos.stream().mapToDouble(Producto::getScoreTotal).average().orElse(0.0);
        
        lista.setCostoTotalOriginal(costoOriginal);
        lista.setImpactoTotalOriginal(impactoOriginalPromedio);
        
        return lista; 
    }
}