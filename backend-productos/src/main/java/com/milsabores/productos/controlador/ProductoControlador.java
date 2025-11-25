package com.milsabores.productos.controlador;

import com.milsabores.productos.modelo.Producto;
import com.milsabores.productos.repositorio.ProductoRepositorio;
import com.milsabores.productos.seguridad.JwtFiltro;
import com.milsabores.productos.seguridad.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/productos")
public class ProductoControlador {
    private final ProductoRepositorio repo;

    public ProductoControlador(ProductoRepositorio repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Producto> listar() { return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtener(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Producto p, HttpServletRequest request) {
        // verificar rol admin en claims
        Claims claims = (Claims) request.getAttribute("claims");
        if (claims == null || !(claims.get("roles") instanceof java.util.List) || !((java.util.List<?>)claims.get("roles")).contains("ROLE_ADMIN")) {
            return ResponseEntity.status(403).body(Map.of("error","Requiere rol ADMIN"));
        }
        return ResponseEntity.ok(repo.save(p));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Producto p, HttpServletRequest request) {
        Claims claims = (Claims) request.getAttribute("claims");
        if (claims == null || !(claims.get("roles") instanceof java.util.List) || !((java.util.List<?>)claims.get("roles")).contains("ROLE_ADMIN")) {
            return ResponseEntity.status(403).body(Map.of("error","Requiere rol ADMIN"));
        }
        return repo.findById(id).map(existing -> {
            existing.setNombre(p.getNombre());
            existing.setDescripcion(p.getDescripcion());
            existing.setPrecio(p.getPrecio());
            existing.setStock(p.getStock());
            existing.setCodigo(p.getCodigo());
            existing.setArchivoImagenId(p.getArchivoImagenId());
            repo.save(existing);
            return ResponseEntity.ok(existing);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id, HttpServletRequest request) {
        Claims claims = (Claims) request.getAttribute("claims");
        if (claims == null || !(claims.get("roles") instanceof java.util.List) || !((java.util.List<?>)claims.get("roles")).contains("ROLE_ADMIN")) {
            return ResponseEntity.status(403).body(Map.of("error","Requiere rol ADMIN"));
        }
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
