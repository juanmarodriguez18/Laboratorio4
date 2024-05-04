import { useState, useEffect } from 'react';
import Instrumento from '../entidades/Instrumento';
import './css/ListaInstrumentos.css'; // Importa los estilos
import { getInstrumentosJSONFetch } from '../servicios/FuncionesInstrumento'; // Importa la función
import ItemInstrumento from './ItemInstrumento';
import Encabezado from './Encabezado';

function ListaInstrumentos() {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  const cargarInstrumentos = async () => {
    try {
      const data: Instrumento[] = await getInstrumentosJSONFetch();
      setInstrumentos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarInstrumentos();
  }, []);

  return (
    <div className="lista-instrumentos">
      <Encabezado></Encabezado>
      {instrumentos.map((instrumento) => (
        <div key={instrumento.instrumento_id}>
          <ItemInstrumento
            instrumento={{
              instrumento_id: instrumento.instrumento_id,
              instrumento: instrumento.instrumento,
              marca: instrumento.marca,
              modelo: instrumento.modelo,
              imagen: instrumento.imagen,
              precio: instrumento.precio,
              costoEnvio: instrumento.costoEnvio,
              cantidadVendida: instrumento.cantidadVendida,
              descripcion: instrumento.descripcion
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ListaInstrumentos;








