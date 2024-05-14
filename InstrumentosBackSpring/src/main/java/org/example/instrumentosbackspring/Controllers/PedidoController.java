package org.example.instrumentosbackspring.Controllers;

import org.example.instrumentosbackspring.Entities.Instrumento;
import org.example.instrumentosbackspring.Entities.Pedido;
import org.example.instrumentosbackspring.Entities.PedidoDetalle;
import org.example.instrumentosbackspring.Repositories.InstrumentoRepository;
import org.example.instrumentosbackspring.Repositories.PedidoDetalleRepository;
import org.example.instrumentosbackspring.Repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private PedidoDetalleRepository pedidoDetalleRepository;

    @Autowired
    private InstrumentoRepository instrumentoRepository;

    @GetMapping("/pedidos")
    public List<Pedido> getAllPedidos(){
        return pedidoRepository.findAll();
    }

    @GetMapping("/pedidos/{id}")
    public ResponseEntity<Pedido> getPedidoById(@PathVariable Long id) {
        try {
            Pedido pedido = pedidoRepository.findById(id).orElse(null);
            if (pedido == null) {
                return ResponseEntity.notFound().build();
            }

            // Cargar los detalles del pedido
            pedido.getDetalles().size(); // Carga los detalles del pedido

            return ResponseEntity.ok().body(pedido);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/pedidos/ultimo")
    public Pedido getUltimoPedido() {
        List<Pedido> pedidos = pedidoRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        if (!pedidos.isEmpty()) {
            return pedidos.get(0); // Devuelve el primer (último) pedido de la lista ordenada
        } else {
            throw new NoSuchElementException("No se encontraron pedidos");
        }
    }


    @PostMapping("/pedidos")
    public ResponseEntity<Pedido> createPedido(@RequestBody Pedido pedido) {
        try {
            Pedido nuevoPedido = pedidoRepository.save(pedido);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoPedido);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/guardar-pedido")
    public ResponseEntity<String> guardarPedido(@RequestBody List<PedidoDetalle> detallesPedido) {
        try {
            Pedido pedido = new Pedido();
            pedido.setFechaPedido(new Date());

            double totalPedido = 0.0;

            // Guardar el pedido primero para obtener un ID válido
            Pedido pedidoGuardado = pedidoRepository.save(pedido);

            for (PedidoDetalle detalle : detallesPedido) {
                // Recuperar el instrumento asociado al detalle desde el frontend
                Instrumento instrumento = detalle.getInstrumento();
                if (instrumento != null) {
                    // Asignar el pedido al detalle
                    detalle.setPedido(pedidoGuardado);
                    pedidoDetalleRepository.save(detalle);
                    totalPedido += instrumento.getPrecio() * detalle.getCantidad(); // Multiplicar el precio por la cantidad
                }
            }

            // Actualizar el total del pedido
            pedidoGuardado.setTotalPedido(totalPedido);
            pedidoRepository.save(pedidoGuardado);

            return ResponseEntity.ok("El pedido con id " + pedidoGuardado.getId() + " se guardó correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar el pedido: " + e.getMessage());
        }
    }



    @DeleteMapping("/pedidos/{id}")
    public ResponseEntity<String> deletePedido(@PathVariable Long id) {
        try {
            pedidoRepository.deleteById(id);
            return ResponseEntity.ok().body("Pedido eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el pedido: " + e.getMessage());
        }
    }

    @PutMapping("/pedidos/{id}")
    public ResponseEntity<Pedido> actualizarPedido(@PathVariable Long id, @RequestBody Pedido pedidoActualizado) {
        try {
            Pedido pedido = pedidoRepository.findById(id).orElse(null);
            if (pedido == null) {
                return ResponseEntity.notFound().build();
            }
            // Actualizar detalles del pedido si es necesario

            // Actualizar otros campos del pedido
            pedido.setFechaPedido(pedidoActualizado.getFechaPedido());
            pedido.setTotalPedido(pedidoActualizado.getTotalPedido());

            // Guardar el pedido actualizado
            Pedido pedidoActualizadoEnBD = pedidoRepository.save(pedido);
            return ResponseEntity.ok().body(pedidoActualizadoEnBD);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}
