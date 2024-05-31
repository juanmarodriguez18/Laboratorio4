import React, { useState } from 'react';
import camionIcono from '../../img/camion.png';
import { Link } from 'react-router-dom';
import { useCarrito } from '../hooks/useCarrito';
import './css/DetalleInstrumento.css';


interface InstrumentoProps {
  instrumento: {
    instrumento_id: number;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: number;
    costoEnvio: string;
    cantidadVendida: number;
    descripcion: string;
  };
}


const ItemInstrumento: React.FC<InstrumentoProps> = ({ instrumento }) => {
  const { addCarrito, updateCarrito } = useCarrito(); // Accede al contexto del carrito y a la función agregarAlCarrito
  const [cantidad, setCantidad] = useState(0);

  const handleAgregarAlCarrito = () => {
    if (instrumento) {
      addCarrito(instrumento); // Agrega el instrumento al carrito usando la función del contexto
      setCantidad(1);
    }
  };

  const handleIncrementarCantidad = () => {
    setCantidad(cantidad + 1);
    if (instrumento) {
      updateCarrito(instrumento, cantidad + 1); // Actualiza la cantidad en el carrito
    }
  };

  const handleDecrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
      if (instrumento) {
        updateCarrito(instrumento, cantidad - 1); // Actualiza la cantidad en el carrito
      }
    } else {
      setCantidad(0);
      if (instrumento) {
        updateCarrito(instrumento, 0); // Elimina el instrumento del carrito si la cantidad llega a 0
      }
    }
  };
  
  return (
    <div className="instrumento">
      <img src={instrumento.imagen} alt={instrumento.instrumento} />
      <div className="instrumento-info">
        <p className="titulo-instrumento">{instrumento.instrumento}</p>
        <p className="instrumento-precio">${instrumento.precio}</p>
        {instrumento.costoEnvio === "G" ? (
          <p className="envio-gratis">
            <img src={camionIcono} alt="Camión de envío" style={{ width: '30px', height: '25px' }} />Envío gratis a todo el país
          </p>
        ) : (
          <p className="costo-envio">Costo de Envío Interior de Argentina: ${instrumento.costoEnvio}</p>
        )}
        <p>{instrumento.cantidadVendida} vendidos</p>
        <div className="btn-container">
          {cantidad === 0 ? (
            <button className="btn-agregar-carrito" onClick={handleAgregarAlCarrito}>Agregar al Carrito</button>
          ) : (
            <div className="cantidad-carrito">
              <button className="btn-decrementar" onClick={handleDecrementarCantidad}>-</button>
              <span>{cantidad}</span>
              <button className="btn-incrementar" onClick={handleIncrementarCantidad}>+</button>
            </div>
          )}
          <Link to={`/instrumento/${instrumento.instrumento_id}`}>
            <button className="btn-ver-detalle" >Ver Detalle</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemInstrumento;



