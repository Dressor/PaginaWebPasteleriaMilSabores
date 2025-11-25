package com.milsabores.ventas.repositorio;

import com.milsabores.ventas.modelo.Venta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VentaRepositorio extends JpaRepository<Venta, Long> {
}
