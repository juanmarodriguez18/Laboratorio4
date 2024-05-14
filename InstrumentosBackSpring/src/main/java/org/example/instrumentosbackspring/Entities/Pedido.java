package org.example.instrumentosbackspring.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Date fechaPedido;
    private double totalPedido;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<PedidoDetalle> detalles;

    public Pedido() {
    }

    // Constructor sin detalles
    public Pedido(Date fechaPedido, double totalPedido) {
        this.fechaPedido = fechaPedido;
        this.totalPedido = totalPedido;
    }

    public Pedido(long id, Date fechaPedido, double totalPedido, List<PedidoDetalle> detalles) {
        this.id = id;
        this.fechaPedido = fechaPedido;
        this.totalPedido = totalPedido;
        this.detalles = detalles;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getFechaPedido() {
        return fechaPedido;
    }

    public void setFechaPedido(Date fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public double getTotalPedido() {
        return totalPedido;
    }

    public void setTotalPedido(double totalPedido) {
        this.totalPedido = totalPedido;
    }

    public List<PedidoDetalle> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<PedidoDetalle> detalles) {
        this.detalles = detalles;
    }
}
