package org.example.instrumentosbackspring.Services;

import org.example.instrumentosbackspring.Entities.Usuario;
import org.example.instrumentosbackspring.dto.LoginDTO;
import org.example.instrumentosbackspring.dto.ResponseDTO;

import java.util.HashMap;

public interface IAuthService {
    public HashMap<String, String> login(LoginDTO login) throws Exception;
    public ResponseDTO register(Usuario usuario) throws Exception;
    Usuario getUserById(Long id);
}
