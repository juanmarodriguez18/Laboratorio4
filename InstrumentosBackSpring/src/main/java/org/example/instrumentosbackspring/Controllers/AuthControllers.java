package org.example.instrumentosbackspring.Controllers;

import com.nimbusds.jwt.JWTClaimsSet;
import org.example.instrumentosbackspring.Entities.Usuario;
import org.example.instrumentosbackspring.Services.IAuthService;
import org.example.instrumentosbackspring.Services.IJWTUtilityService;
import org.example.instrumentosbackspring.dto.LoginDTO;
import org.example.instrumentosbackspring.dto.ResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.HashMap;

@RestController
@RequestMapping("/auth")
public class AuthControllers {

    private final IAuthService authService;
    private final IJWTUtilityService jwtUtilityService;

    @Autowired
    public AuthControllers(IAuthService authService, IJWTUtilityService jwtUtilityService) {
        this.authService = authService;
        this.jwtUtilityService = jwtUtilityService;
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> register(@RequestBody Usuario usuario) {
        try {
            ResponseDTO response = authService.register(usuario);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            ResponseDTO errorResponse = new ResponseDTO();
            errorResponse.setMessage("Error during registration: " + e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<HashMap<String, String>> login(@RequestBody LoginDTO loginRequest) {
        try {
            HashMap<String, String> loginResponse = authService.login(loginRequest);
            if (loginResponse != null && loginResponse.containsKey("jwt")) {
                return new ResponseEntity<>(loginResponse, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(loginResponse != null ? loginResponse : new HashMap<>(), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            HashMap<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error during login: " + e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/currentUser")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = authorizationHeader.replace("Bearer ", "");
            JWTClaimsSet claimsSet = jwtUtilityService.parseJWT(token);
            Long usuarioId = Long.parseLong(claimsSet.getSubject());

            Usuario usuario = authService.getUserById(usuarioId);
            if (usuario == null) {
                return ResponseEntity.status(404).body("Usuario no encontrado");
            }

            return ResponseEntity.ok(usuario);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al obtener el usuario: " + e.getMessage());
        }
    }
}
