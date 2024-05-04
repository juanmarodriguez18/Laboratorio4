import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Instrumento from '../entidades/Instrumento';
import { getInstrumentoByIdFetch } from '../servicios/FuncionesInstrumento';
import camionIcono from '../../img/camion.png';
import './css/DetalleInstrumento.css';
import Encabezado from './Encabezado';

function DetalleInstrumento() {
  const { id } = useParams<{ id?: string }>();
  const [instrumento, setInstrumento] = useState<Instrumento | null>(null);

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

  return (
    <div>
      <Encabezado></Encabezado>
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
            
            <button className="btn-agregar-carrito">Agregar al Carrito</button>
          </div>
        </div>
      ) : (
        <p>Cargando detalles del instrumento...</p>
      )}
    </div>
  );
}

export default DetalleInstrumento;







