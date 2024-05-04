package org.example.instrumentosbackspring.Repositories;

import org.example.instrumentosbackspring.Entities.Instrumento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstrumentoRepository extends JpaRepository<Instrumento, Long>{
}
