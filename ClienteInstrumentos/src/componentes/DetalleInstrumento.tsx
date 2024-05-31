import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Instrumento from '../entidades/Instrumento';
import { generarPdf, getInstrumentoByIdFetch } from '../servicios/FuncionesInstrumento';
import camionIcono from '../../img/camion.png';
import './css/DetalleInstrumento.css';
import { useCarrito } from '../hooks/useCarrito';

function DetalleInstrumento() {
  const { id } = useParams<{ id?: string }>();
  const [instrumento, setInstrumento] = useState<Instrumento | null>(null);
  const { addCarrito, updateCarrito } = useCarrito(); // Accede al contexto del carrito y a la función actualizar carrito
  const [cantidad, setCantidad] = useState(0);

  useEffect(() => {
    if (id) {
      const instrumentoId = parseInt(id, 10);
      if (!isNaN(instrumentoId)) {
        const fetchInstrumento = async () => {
          try {
            const instrumento = await getInstrumentoByIdFetch(instrumentoId);
            setInstrumento(instrumento);
          } catch (error) {
            console.error('Error al obtener el instrumento:', error);
          }
        };
        fetchInstrumento();
      } else {
        console.error('El ID del instrumento no es un número válido:', id);
      }
    } else {
      console.error('El ID del instrumento no está definido.');
    }
  }, [id]);

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

  const handleGenerarPDF = async () => {
    try {
      if (instrumento) {
        await generarPdf(instrumento);
      }
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };

  return (
    <div>
      {instrumento ? (
        <div className="detalle-instrumento">
          <div className="imagenydescripcion">
            <img src={instrumento.imagen} alt={instrumento.instrumento} />
            <p className="descripcion-instrumento">{instrumento?.descripcion}</p>
          </div>
          <div className="instrumento-info">
            <p className="cantidad-vendida">{instrumento.cantidadVendida} vendidos</p>
            <p className="titulo-instrumento">{instrumento.instrumento}</p>
            <p className="instrumento-precio">${instrumento.precio}</p>
            <p className="marca">Marca: {instrumento.marca} </p>
            <p className="modelo">Modelo: {instrumento.modelo}</p>
            <p>Costo Envio:</p>
            {instrumento.costoEnvio === "G" ? (
              <p className="envio-gratis">
                <img src={camionIcono} alt="Camión de envío" style={{width: '30px', height: '25px'}}/>Envío gratis a todo el país
              </p>
            ) : (
              <p className="costo-envio">Costo de Envío Interior de Argentina: ${instrumento.costoEnvio}</p>
            )}

            {cantidad === 0 ? (
              <button className="btn-agregar-carrito" onClick={handleAgregarAlCarrito}>Agregar al Carrito</button>
            ) : (
              <div className="cantidad-carrito">
                <button className="btn-decrementar" onClick={handleDecrementarCantidad}>-</button>
                <span>{cantidad}</span>
                <button className="btn-incrementar" onClick={handleIncrementarCantidad}>+</button>
              </div>
            )}

            <button className="btn-generar-pdf" onClick={handleGenerarPDF}>Generar PDF</button>

          </div>
        </div>
      ) : (
        <p>Cargando detalles del instrumento...</p>
      )}
    </div>
  );
}

export default DetalleInstrumento;
