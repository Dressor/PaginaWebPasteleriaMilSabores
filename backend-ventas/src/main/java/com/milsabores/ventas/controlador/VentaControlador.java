package com.milsabores.ventas.controlador;

import com.milsabores.ventas.modelo.Venta;
import com.milsabores.ventas.repositorio.VentaRepositorio;
import io.jsonwebtoken.Claims;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/ventas")
public class VentaControlador {
    private final VentaRepositorio repo;

    public VentaControlador(VentaRepositorio repo) { this.repo = repo; }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Venta venta, HttpServletRequest request) {
        // Cualquier usuario autenticado puede crear (se espera token válido)
        Claims claims = (Claims) request.getAttribute("claims");
        if (claims == null) return ResponseEntity.status(401).body("Token inválido");
        venta.setCreatedAt(LocalDateTime.now());
        venta.setEstado("CREADA");
        Venta saved = repo.save(venta);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public List<Venta> listar(HttpServletRequest request) {
        // Solo admins listan todas las ventas
        Claims claims = (Claims) request.getAttribute("claims");
        if (claims == null) throw new RuntimeException("Token inválido");
        Object rolesObj = claims.get("roles");
        if (rolesObj instanceof java.util.List && ((java.util.List<?>)rolesObj).contains("ROLE_ADMIN")) {
            return repo.findAll();
        }
        throw new RuntimeException("Acceso denegado");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtener(@PathVariable Long id, HttpServletRequest request) {
        Claims claims = (Claims) request.getAttribute("claims");
        if (claims == null) return ResponseEntity.status(401).build();
        return repo.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
