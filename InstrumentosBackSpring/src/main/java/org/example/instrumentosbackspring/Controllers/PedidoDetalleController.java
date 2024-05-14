package org.example.instrumentosbackspring.Controllers;

import org.example.instrumentosbackspring.Entities.Pedido;
import org.example.instrumentosbackspring.Entities.PedidoDetalle;
import org.example.instrumentosbackspring.Repositories.PedidoDetalleRepository;
import org.example.instrumentosbackspring.Repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedidos/{pedidoId}/detalles")
public class PedidoDetalleController {
    @Autowired
    private PedidoDetalleRepository pedidoDetalleRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @PostMapping
    public ResponseEntity<PedidoDetalle> agregarDetallePedido(@PathVariable Long pedidoId, @RequestBody PedidoDetalle pedidoDetalle) {
        try {
            // Verificar si el pedido existe
            Pedido pedido = pedidoRepository.findById(pedidoId).orElse(null);
            if (pedido == null) {
                return ResponseEntity.notFound().build();
            }

            // Asignar el pedido al detalle de pedido
            pedidoDetalle.setPedido(pedido);

            // Guardar el detalle de pedido
            PedidoDetalle detalleGuardado = pedidoDetalleRepository.save(pedidoDetalle);
            return ResponseEntity.status(HttpStatus.CREATED).body(detalleGuardado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    private PedidoDetalle buscarPedidoDetallePorId(Long pedidoId, Long detalleId) {
        Pedido pedido = pedidoRepository.findById(pedidoId).orElse(null);
        if (pedido == null) {
            return null;
        }

        return pedidoDetalleRepository.findById(detalleId).orElse(null);
    }

    @PutMapping("/{detalleId}")
    public ResponseEntity<PedidoDetalle> actualizarDetallePedido(@PathVariable Long pedidoId, @PathVariable Long detalleId, @RequestBody PedidoDetalle pedidoDetalleActualizado) {
        try {
            PedidoDetalle pedidoDetalle = buscarPedidoDetallePorId(pedidoId, detalleId);
            if (pedidoDetalle == null) {
                return ResponseEntity.notFound().build();
            }

            // Actualizar los campos del detalle de pedido
            pedidoDetalle.setCantidad(pedidoDetalleActualizado.getCantidad());

            // Guardar el detalle de pedido actualizado
            PedidoDetalle detalleActualizado = pedidoDetalleRepository.save(pedidoDetalle);
            return ResponseEntity.ok().body(detalleActualizado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{detalleId}")
    public ResponseEntity<String> eliminarDetallePedido(@PathVariable Long pedidoId, @PathVariable Long detalleId) {
        try {
            PedidoDetalle pedidoDetalle = buscarPedidoDetallePorId(pedidoId, detalleId);
            if (pedidoDetalle == null) {
                return ResponseEntity.notFound().build();
            }

            // Eliminar el detalle de pedido
            pedidoDetalleRepository.delete(pedidoDetalle);
            return ResponseEntity.ok().body("Detalle de pedido eliminado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
