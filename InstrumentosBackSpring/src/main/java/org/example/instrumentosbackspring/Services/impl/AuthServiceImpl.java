package org.example.instrumentosbackspring.Services.impl;

import org.example.instrumentosbackspring.Entities.Usuario;
import org.example.instrumentosbackspring.Repositories.UsuarioRepository;
import org.example.instrumentosbackspring.Services.IAuthService;
import org.example.instrumentosbackspring.Services.IJWTUtilityService;
import org.example.instrumentosbackspring.dto.LoginDTO;
import org.example.instrumentosbackspring.dto.ResponseDTO;
import org.example.instrumentosbackspring.validations.UserValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class AuthServiceImpl implements IAuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private IJWTUtilityService jwtUtilityService;

    @Autowired
    private UserValidation userValidation;

    @Override
    public HashMap<String, String> login(LoginDTO login) throws Exception {
        HashMap<String, String> jwt = new HashMap<>();
        try {
            Optional<Usuario> usuario = usuarioRepository.findByNombreUsuario(login.getNombreUsuario());

            if (usuario.isEmpty()) {
                jwt.put("error", "Usuario no encontrado");
                return jwt;
            }

            if (verifyPassword(login.getClave(), usuario.get().getClave())) {
                jwt.put("jwt", jwtUtilityService.generateJWT(usuario.get().getId()));
            } else {
                jwt.put("error", "Authentication failed");
            }

            return jwt;
        } catch (Exception e) {
            jwt.put("error", "Error during login: " + e.getMessage());
            return jwt;
        }
    }

    @Override
    public ResponseDTO register(Usuario usuario) throws Exception {
        try {
            ResponseDTO response = userValidation.validate(usuario);

            if (response.getNumOfErrors() > 0) {
                return response;
            }

            Optional<Usuario> existingUsuario = usuarioRepository.findByNombreUsuario(usuario.getNombreUsuario());

            if (existingUsuario.isPresent()) {
                response.setNumOfErrors(1);
                response.setMessage("Usuario ya registrado");
                return response;
            }

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
            usuario.setClave(encoder.encode(usuario.getClave()));
            usuarioRepository.save(usuario);
            response.setMessage("Usuario registrado exitosamente");

            return response;

        } catch (Exception e) {
            throw new Exception(e.toString());
        }
    }

    private boolean verifyPassword(String enteredPassword, String storedPassword) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.matches(enteredPassword, storedPassword);
    }

    @Override
    public Usuario getUserById(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }
}

