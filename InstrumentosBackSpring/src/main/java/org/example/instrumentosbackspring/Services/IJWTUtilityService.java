package org.example.instrumentosbackspring.Services;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.JWTClaimsSet;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.text.ParseException;


public interface IJWTUtilityService {
    public String generateJWT(Long usuarioId) throws IOException, NoSuchAlgorithmException, InvalidKeySpecException, JOSEException;
    public JWTClaimsSet parseJWT(String jwt) throws IOException, NoSuchAlgorithmException, InvalidKeySpecException, ParseException, JOSEException;
}
