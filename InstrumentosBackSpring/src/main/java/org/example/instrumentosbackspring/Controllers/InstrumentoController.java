package org.example.instrumentosbackspring.Controllers;

import org.example.instrumentosbackspring.Entities.CategoriaInstrumento;
import org.example.instrumentosbackspring.Entities.Instrumento;
import org.example.instrumentosbackspring.Repositories.InstrumentoRepository;
import org.example.instrumentosbackspring.Repositories.CategoriaInstrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class InstrumentoController {
    @Autowired
    private InstrumentoRepository instrumentoRepository;
    @Autowired
    private CategoriaInstrumentoRepository categoriaRepository;


    @GetMapping("/instrumentos")
    public List<Instrumento> getAllInstrumentos(){
        List<Instrumento> instrumentos = instrumentoRepository.findAll();
        instrumentos.forEach(instrumento -> {
            CategoriaInstrumento categoria = categoriaRepository.findById(instrumento.getCategoria().getId()).orElse(null);
            instrumento.setCategoria(categoria);
        });
        return instrumentos;
    }

    @GetMapping("/instrumentos/{instrumento_id}")
    public Instrumento getInstrumentoById(@PathVariable long instrumento_id){
        return instrumentoRepository.findById(instrumento_id).orElse(null);
    }

    @PostMapping("/instrumentos")
    public ResponseEntity<String> createInstrumento(@RequestBody Instrumento instrumento) {
        try {
            CategoriaInstrumento categoria = categoriaRepository.findById(instrumento.getCategoria().getId()).orElse(null);
            if (categoria == null) {
                return new ResponseEntity<>("La categoría de instrumento especificada no existe", HttpStatus.BAD_REQUEST);
            }

            instrumento.setCategoria(categoria);
            instrumentoRepository.save(instrumento);

            return new ResponseEntity<>("Instrumento creado exitosamente", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al crear el instrumento: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/instrumentos/{id}")
    public ResponseEntity<String> updateInstrumento(@PathVariable Long id, @RequestBody Instrumento instrumentoActualizar) {
        // Verificar si el instrumento existe en la base de datos
        Optional<Instrumento> existingInstrumentoOptional = instrumentoRepository.findById(id);

        if (existingInstrumentoOptional.isPresent()) {
            Instrumento existingInstrumento = existingInstrumentoOptional.get();

            // Actualizar los campos del instrumento existente con los nuevos valores
            existingInstrumento.setInstrumento(instrumentoActualizar.getInstrumento());
            existingInstrumento.setImagen(instrumentoActualizar.getImagen());
            existingInstrumento.setDescripcion(instrumentoActualizar.getDescripcion());
            existingInstrumento.setCantidadVendida(instrumentoActualizar.getCantidadVendida());
            existingInstrumento.setMarca(instrumentoActualizar.getMarca());
            existingInstrumento.setCostoEnvio(instrumentoActualizar.getCostoEnvio());
            existingInstrumento.setModelo(instrumentoActualizar.getModelo());
            existingInstrumento.setPrecio(instrumentoActualizar.getPrecio());

            // Actualizar la categoría del instrumento si se proporciona en el objeto JSON
            if (instrumentoActualizar.getCategoria() != null) {
                CategoriaInstrumento categoria = categoriaRepository.findById(instrumentoActualizar.getCategoria().getId()).orElse(null);
                if (categoria == null) {
                    return new ResponseEntity<>("La categoría de instrumento especificada no existe", HttpStatus.BAD_REQUEST);
                }
                existingInstrumento.setCategoria(categoria);
            }

            // Guardar los cambios en la base de datos
            instrumentoRepository.save(existingInstrumento);

            return new ResponseEntity<>("Instrumento actualizado exitosamente", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("El instrumento no existe en la base de datos", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/instrumentos/{instrumento_id}")
    public ResponseEntity<String> deleteInstrumento(@PathVariable long instrumento_id) {
        // Verificar si el instrumento existe en la base de datos
        Optional<Instrumento> instrumentoOptional = instrumentoRepository.findById(instrumento_id);

        if (instrumentoOptional.isPresent()) {
            // Si el instrumento existe, eliminarlo de la base de datos
            instrumentoRepository.deleteById(instrumento_id);
            return new ResponseEntity<>("Instrumento eliminado exitosamente", HttpStatus.OK);
        } else {
            // Si el instrumento no existe, devolver un mensaje de error
            return new ResponseEntity<>("El instrumento especificado no existe", HttpStatus.NOT_FOUND);
        }
    }


}
