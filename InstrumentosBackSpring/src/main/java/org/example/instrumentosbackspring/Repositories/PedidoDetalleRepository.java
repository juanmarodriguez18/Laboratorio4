package org.example.instrumentosbackspring.Repositories;

import org.example.instrumentosbackspring.Entities.PedidoDetalle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoDetalleRepository extends JpaRepository<PedidoDetalle, Long> {
}
