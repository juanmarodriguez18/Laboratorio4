package org.example.instrumentosbackspring.Controllers;

import org.example.instrumentosbackspring.Entities.Instrumento;

import java.util.List;

public class InstrumentosWrapper {
    private List<Instrumento> instrumentos;

    public InstrumentosWrapper(List<Instrumento> instrumentos) {
        if (instrumentos == null) {
            throw new IllegalArgumentException("La lista de instrumentos no puede ser nula");
        }
        this.instrumentos = instrumentos;
    }

    public InstrumentosWrapper() {
    }

    public List<Instrumento> getInstrumentos() {
        return instrumentos;
    }

    public void setInstrumentos(List<Instrumento> instrumentos) {
        if (instrumentos == null) {
            throw new IllegalArgumentException("La lista de instrumentos no puede ser nula");
        }
        this.instrumentos = instrumentos;
    }

    public void agregarInstrumento(Instrumento instrumento) {
        this.instrumentos.add(instrumento);
    }

    public void eliminarInstrumento(Instrumento instrumento) {
        this.instrumentos.remove(instrumento);
    }

    public void limpiarInstrumentos() {
        this.instrumentos.clear();
    }

    public int contarInstrumentos() {
        return this.instrumentos.size();
    }
}
