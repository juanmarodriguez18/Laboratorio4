package org.example.instrumentosbackspring.validations;

import org.example.instrumentosbackspring.Entities.Usuario;
import org.example.instrumentosbackspring.dto.ResponseDTO;

public class UserValidation {

    public ResponseDTO validate (Usuario usuario){
        ResponseDTO response = new ResponseDTO();

        response.setNumOfErrors(0);

        if (usuario.getNombreUsuario() == null ||
                usuario.getNombreUsuario().length() < 3 ||
                usuario.getNombreUsuario().length() > 20
        ){
            response.setNumOfErrors(response.getNumOfErrors() + 1);
            response.setMessage("El campo nombre de usuario no puede ser nulo y debe tener entre 3 y 20 caracteres");
        }

        if (usuario.getClave() == null || !usuario.getClave().matches("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$")){
            response.setNumOfErrors(response.getNumOfErrors() + 1);
            response.setMessage("La contraseña debe tener entre 8 y 16 caracteres, al menos 1 numero, una minúscula y una mayúscula.");
        }

        return response;
    }
}
