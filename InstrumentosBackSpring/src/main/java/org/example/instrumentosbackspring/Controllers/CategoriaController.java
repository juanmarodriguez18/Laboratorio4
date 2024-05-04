package org.example.instrumentosbackspring.Controllers;

import org.example.instrumentosbackspring.Entities.CategoriaInstrumento;
import org.example.instrumentosbackspring.Repositories.CategoriaInstrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoriaController {
    @Autowired
    private CategoriaInstrumentoRepository categoriaRepository;

    @GetMapping("/categorias")
    public List<CategoriaInstrumento> obtenerCategorias() {
        return categoriaRepository.findAll();
    }
}
