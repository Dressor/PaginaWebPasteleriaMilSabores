package com.milsabores.usuarios.seguridad;

import com.milsabores.usuarios.modelo.Usuario;
import com.milsabores.usuarios.repositorio.UsuarioRepositorio;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class UsuarioDetailsServiceImpl implements UserDetailsService {
    private final UsuarioRepositorio repo;

    public UsuarioDetailsServiceImpl(UsuarioRepositorio repo) { this.repo = repo; }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario u = repo.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        return org.springframework.security.core.userdetails.User
                .withUsername(u.getEmail())
                .password(u.getPassword())
                .authorities(u.getRoles().stream().map(r -> new SimpleGrantedAuthority(r.name())).collect(Collectors.toList()))
                .build();
    }
}
