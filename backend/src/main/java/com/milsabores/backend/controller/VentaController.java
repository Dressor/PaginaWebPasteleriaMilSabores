package com.milsabores.backend.controller;

import com.milsabores.backend.model.Venta;
import com.milsabores.backend.repository.VentaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class VentaController {
    private final VentaRepository ventaRepository;

    public VentaController(VentaRepository ventaRepository) {
        this.ventaRepository = ventaRepository;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> create(@RequestBody Venta venta) {
        venta.setCreatedAt(LocalDateTime.now());
        venta.setEstado("CREADA");
        Venta saved = ventaRepository.save(venta);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Venta> listAll() {
        return ventaRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public ResponseEntity<?> get(@PathVariable Long id) {
        return ventaRepository.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
