import React from 'react';
import camionIcono from '../../img/camion.png';
import { Link } from 'react-router-dom';

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
      </div>
    </div>
  );
};

export default ItemInstrumento;



