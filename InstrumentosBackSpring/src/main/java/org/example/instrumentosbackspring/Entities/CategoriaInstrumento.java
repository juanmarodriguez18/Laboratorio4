package org.example.instrumentosbackspring.Entities;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CategoriaInstrumento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String denominacion;

    @JsonBackReference
    @OneToMany(mappedBy = "categoria", fetch = FetchType.LAZY)
    private List<Instrumento> instrumentos;

    public CategoriaInstrumento() {
    }

    public CategoriaInstrumento(Long id, String denominacion, List<Instrumento> instrumentos) {
        this.id = id;
        this.denominacion = denominacion;
        this.instrumentos = instrumentos;
    }

    public List<Instrumento> getInstrumentos() {
        return instrumentos;
    }

    public void setInstrumentos(List<Instrumento> instrumentos) {
        this.instrumentos = instrumentos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDenominacion() {
        return denominacion;
    }

    public void setDenominacion(String denominacion) {
        this.denominacion = denominacion;
    }
}
