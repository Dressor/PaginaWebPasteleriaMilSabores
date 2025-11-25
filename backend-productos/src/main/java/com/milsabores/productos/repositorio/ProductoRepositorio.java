package com.milsabores.productos.repositorio;

import com.milsabores.productos.modelo.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProductoRepositorio extends JpaRepository<Producto, Long> {
    Optional<Producto> findByCodigo(String codigo);
}
