import { useState, useEffect } from 'react';
import Instrumento from '../entidades/Instrumento';
import { getInstrumentosJSONFetch, borrarInstrumento } from '../servicios/FuncionesInstrumento';
import './css/GrillaInstrumentos.css'

function GrillaInstrumentos() {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    const [categorias, setCategorias] = useState<string[]>([]);
    const [filtroCategoria, setFiltroCategoria] = useState<string>('');

    useEffect(() => {
        async function fetchData() {
            const instrumentosData: Instrumento[] = await getInstrumentosJSONFetch();
            const categoriasData: string[] = obtenerCategorias(instrumentosData);
            setInstrumentos(instrumentosData);
            setCategorias(categoriasData);
        }
        fetchData();
    }, []);

    const obtenerCategorias = (instrumentos: Instrumento[]): string[] => {
        const categoriasUnicas = new Set<string>();
        instrumentos.forEach(instrumento => {
            if (instrumento.categoria) { // Verificación para asegurar que categoría no sea undefined
                categoriasUnicas.add(instrumento.categoria.denominacion);
            }
        });
        return Array.from(categoriasUnicas);
    };

    const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFiltroCategoria(e.target.value);
    };

    const eliminarInstrumento = async (idInstrumento: number) => {
        try {
            await borrarInstrumento(idInstrumento);
            setInstrumentos(instrumentos.filter(instrumento => instrumento.instrumento_id !== idInstrumento));
        } catch (error) {
            console.error("Error al eliminar el instrumento:", error);
        }
    };

    const instrumentosFiltrados = filtroCategoria
        ? instrumentos.filter(instrumento => instrumento.categoria && instrumento.categoria.denominacion === filtroCategoria)
        : instrumentos;
    return (
        <>
            <div className="container text-center">
                <br />
                <a className="btn btn-primary" href={`/formulario/0`}>Nuevo</a>
                <div className="filtro-categoria">
                    <select value={filtroCategoria} onChange={handleCategoriaChange}>
                        <option value="">Todas las categorías</option>
                        {categorias.map((categoria, index) => (
                            <option key={index} value={categoria}>{categoria}</option>
                        ))}
                    </select>
                </div>
                <div className="row">
                    <div className="col">
                        <b>ID</b>
                    </div>
                    <div className="col">
                        <b>Imágen</b>
                    </div>
                    <div className="col">
                        <b>Instrumento</b>
                    </div>
                    <div className="col">
                        <b>Marca</b>
                    </div>
                    <div className="col">
                        <b>Modelo</b>
                    </div>
                    <div className="col">
                        <b>Precio</b>
                    </div>
                    <div className="col">
                        <b>Costo Envío</b>
                    </div>
                    <div className="col">
                        <b>Vendidos</b>
                    </div>
                    <div className="col">
                        <b>Modificar</b>
                    </div>
                    <div className="col">
                        <b>Eliminar</b>
                    </div>
                </div>
                {instrumentosFiltrados.map((instrumento: Instrumento, index) =>
                    <div className="row" key={index}>
                        <div className="col">
                            {instrumento.instrumento_id}
                        </div>
                        <div className="col">
                        <img className = "img" src={instrumento.imagen} alt={instrumento.instrumento} />
                        </div>
                        <div className="col">
                            {instrumento.instrumento}
                        </div>
                        <div className="col">
                            {instrumento.marca}
                        </div>
                        <div className="col">
                            {instrumento.modelo}
                        </div>
                        <div className="col">
                            {instrumento.precio}
                        </div>
                        <div className="col">
                            {instrumento.costoEnvio}
                        </div>
                        <div className="col">
                            {instrumento.cantidadVendida}
                        </div>
                        <div className="col">
                            <a className="btn btn-info" style={{ marginBottom: 10 }} href={`/formulario/${instrumento.instrumento_id}`}>Modificar</a>
                        </div>
                        <div className="col">
                            <button className="btn btn-danger" style={{ marginBottom: 10 }} onClick={() => eliminarInstrumento(instrumento.instrumento_id)}>Eliminar</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default GrillaInstrumentos;
