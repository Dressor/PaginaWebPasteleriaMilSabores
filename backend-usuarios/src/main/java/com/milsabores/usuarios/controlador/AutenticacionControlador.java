package com.milsabores.usuarios.controlador;

import com.milsabores.usuarios.modelo.Rol;
import com.milsabores.usuarios.modelo.Usuario;
import com.milsabores.usuarios.repositorio.UsuarioRepositorio;
import com.milsabores.usuarios.seguridad.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/auth")
public class AutenticacionControlador {
    private final UsuarioRepositorio repo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AutenticacionControlador(UsuarioRepositorio repo, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    record RegistroDTO(String nombre, String email, String password, String rut, String fechaNacimiento, String celular, String direccion) {}

    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody @Valid RegistroDTO dto) {
        if (repo.existsByEmail(dto.email())) return ResponseEntity.badRequest().body(Map.of("error", "Email ya registrado"));
        Usuario u = new Usuario();
        u.setNombre(dto.nombre());
        u.setEmail(dto.email());
        u.setPassword(passwordEncoder.encode(dto.password()));
        u.setRut(dto.rut());
        if (dto.fechaNacimiento() != null && !dto.fechaNacimiento().isBlank()) u.setFechaNacimiento(LocalDate.parse(dto.fechaNacimiento()));
        u.setCelular(dto.celular());
        u.setDireccion(dto.direccion());
        u.setRoles(Set.of(Rol.ROLE_USER));
        repo.save(u);
        return ResponseEntity.ok(Map.of("message","Usuario registrado"));
    }

    record LoginDTO(String email, String password) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.email(), dto.password()));
            Usuario u = repo.findByEmail(dto.email()).orElseThrow();
            Set<String> roles = u.getRoles().stream().map(Enum::name).collect(java.util.stream.Collectors.toSet());
            String token = jwtUtil.generarToken(u.getEmail(), roles);
            return ResponseEntity.ok(Map.of("accessToken", token));
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(401).body(Map.of("error","Credenciales inválidas"));
        }
    }
}
