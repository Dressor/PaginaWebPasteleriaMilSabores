package com.milsabores.backend.repository;

import com.milsabores.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByCodigo(String codigo);
}
