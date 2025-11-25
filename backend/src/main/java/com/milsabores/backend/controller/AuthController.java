package com.milsabores.backend.controller;

import com.milsabores.backend.model.Role;
import com.milsabores.backend.model.User;
import com.milsabores.backend.repository.UserRepository;
import com.milsabores.backend.security.JwtUtil;
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
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    record RegisterRequest(String nombre, String email, String password, String rut, String fechaNacimiento, String celular, String direccion) {}

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email ya registrado"));
        }
        User u = new User();
        u.setNombre(req.nombre());
        u.setEmail(req.email());
        u.setPassword(passwordEncoder.encode(req.password()));
        u.setRut(req.rut());
        if (req.fechaNacimiento() != null && !req.fechaNacimiento().isBlank()) u.setFechaNacimiento(LocalDate.parse(req.fechaNacimiento()));
        u.setCelular(req.celular());
        u.setDireccion(req.direccion());
        u.setRoles(Set.of(Role.ROLE_USER));
        userRepository.save(u);
        return ResponseEntity.ok(Map.of("message", "Usuario registrado"));
    }

    record LoginRequest(String email, String password) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.email(), req.password()));
            String token = jwtUtil.generateToken(req.email());
            return ResponseEntity.ok(Map.of("accessToken", token));
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(401).body(Map.of("error", "Credenciales inválidas"));
        }
    }
}
