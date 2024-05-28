package org.example.instrumentosbackspring.Repositories;

import org.example.instrumentosbackspring.Entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository  extends JpaRepository<Usuario, Long> {
    @Query(value = "SELECT * FROM usuario WHERE nombre_usuario = :nombreUsuario", nativeQuery = true)
    Optional<Usuario> findByNombreUsuario(String nombreUsuario);
}
