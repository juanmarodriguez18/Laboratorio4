package org.example.instrumentosbackspring.Repositories;

import org.example.instrumentosbackspring.Entities.Pedido;
import org.example.instrumentosbackspring.dto.OrdersByInstrumentDTO;
import org.example.instrumentosbackspring.dto.OrdersByMonthDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface PedidoRepository  extends JpaRepository<Pedido, Long> {
    @Query("SELECT new org.example.instrumentosbackspring.dto.OrdersByMonthDTO(CONCAT(YEAR(p.fechaPedido), '-', MONTH(p.fechaPedido)), COUNT(p)) " +
            "FROM Pedido p GROUP BY YEAR(p.fechaPedido), MONTH(p.fechaPedido)")
    List<OrdersByMonthDTO> findOrdersGroupedByMonth();

    @Query("SELECT new org.example.instrumentosbackspring.dto.OrdersByInstrumentDTO(i.instrumento, COUNT(p)) " +
            "FROM PedidoDetalle pd JOIN pd.pedido p JOIN pd.instrumento i GROUP BY i.instrumento")
    List<OrdersByInstrumentDTO> findOrdersGroupedByInstrument();

    List<Pedido> findByFechaPedidoBetween(LocalDate fechaDesde, LocalDate fechaHasta);
}
