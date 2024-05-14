import React from 'react';
import camionIcono from '../../img/camion.png';
import { Link } from 'react-router-dom';
import { useCarrito } from '../hooks/useCarrito';

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
  const { addCarrito } = useCarrito(); // Accede al contexto del carrito y a la función agregarAlCarrito

  const handleAgregarAlCarrito = () => {
    if (instrumento) {
      addCarrito(instrumento); // Agrega el instrumento al carrito usando la función del contexto
      alert('Instrumento agregado al carrito'); // Opcional: muestra una alerta o mensaje de confirmación
    }
  };
  
  return (
    <div className="instrumento">
      <img src={instrumento.imagen} alt={instrumento.instrumento}/>
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
        <Link to={`/instrumento/${instrumento.instrumento_id}`}>
          <button>Ver Detalle</button>
        </Link>
        <button className="btn-agregar-carrito" onClick={handleAgregarAlCarrito}>Agregar al Carrito</button>
      </div>
    </div>
  );
};

export default ItemInstrumento;



