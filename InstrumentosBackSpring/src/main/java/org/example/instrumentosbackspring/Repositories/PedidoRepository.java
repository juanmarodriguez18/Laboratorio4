package org.example.instrumentosbackspring.Repositories;

import org.example.instrumentosbackspring.Entities.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository  extends JpaRepository<Pedido, Long> {
}
