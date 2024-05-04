package org.example.instrumentosbackspring.Entities;

import jakarta.persistence.*;


@Entity
public class Instrumento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long instrumento_id;
    private String instrumento;
    private String marca;
    private String modelo;
    private String imagen;
    private double precio;
    private String costoEnvio;
    private int cantidadVendida;
    private String descripcion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id")
    private CategoriaInstrumento categoria;


    public Instrumento() {
    }

    public Instrumento(Long instrumento_id, String instrumento, String marca, String modelo, String imagen, double precio,
                       String costoEnvio, String descripcion, int cantidadVendida, CategoriaInstrumento categoria) {
        this.instrumento_id = instrumento_id;
        this.instrumento = instrumento;
        this.marca = marca;
        this.modelo = modelo;
        this.imagen = imagen;
        this.precio = precio;
        this.costoEnvio = costoEnvio;
        this.descripcion = descripcion;
        this.cantidadVendida = cantidadVendida;
        this.categoria = categoria;
    }

    public CategoriaInstrumento getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaInstrumento categoria) {
        this.categoria = categoria;
    }

    public Long getInstrumento_id() {
        return instrumento_id;
    }

    public void setInstrumento_id(Long instrumento_id) {
        this.instrumento_id = instrumento_id;
    }

    public String getInstrumento() {
        return instrumento;
    }

    public void setInstrumento(String instrumento) {
        this.instrumento = instrumento;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getCostoEnvio() {
        return costoEnvio;
    }

    public void setCostoEnvio(String costoEnvio) {
        this.costoEnvio = costoEnvio;
    }

    public int getCantidadVendida() {
        return cantidadVendida;
    }

    public void setCantidadVendida(int cantidadVendida) {
        this.cantidadVendida = cantidadVendida;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
