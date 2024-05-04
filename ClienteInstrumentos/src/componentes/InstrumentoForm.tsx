import { useState, useEffect } from 'react';
import Instrumento from '../entidades/Instrumento';
import { borrarInstrumento, getInstrumentoByIdFetch, getCategorias, crearInstrumento, actualizarInstrumento } from '../servicios/FuncionesInstrumento'; 
import { useParams, useNavigate } from 'react-router-dom';
import CategoriaInstrumento from '../entidades/CategoriaInstrumento';
import './css/InstrumentoForm.css'

function InstrumentoFormulario() {
    const navigate = useNavigate();
    const { instrumento_id } = useParams();

    const [instrumento, setInstrumento] = useState<Instrumento>(new Instrumento());
    const [categorias, setCategorias] = useState<CategoriaInstrumento[]>([]); // Estado para almacenar las categorías
    const [txtValidacion, setTxtValidacion] = useState<string>("");

    useEffect(() => {
        async function cargarInstrumento() {
            if (instrumento_id) {
                const instrumentoCargado = await getInstrumentoByIdFetch(parseInt(instrumento_id));
                setInstrumento(instrumentoCargado);
            } else {
                setInstrumento(new Instrumento());
            }
        }
        cargarInstrumento();
    }, [instrumento_id]);

    useEffect(() => {
        async function cargarCategorias() {
            try {
                const categorias = await getCategorias();
                setCategorias(categorias);
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
                setTxtValidacion("Error al obtener las categorías. Por favor, inténtelo de nuevo más tarde.");
            }
        }
        cargarCategorias();
    }, []);
    

    const guardarInstrumento = async () => {
        // Validación de campos
        if (!instrumento.instrumento || instrumento.instrumento.trim() === "") {
            setTxtValidacion("Ingrese el nombre del instrumento");
            return;
        }
        if (!instrumento.marca || instrumento.marca.trim() === "") {
            setTxtValidacion("Ingrese la marca del instrumento");
            return;
        }
        if (!instrumento.modelo || instrumento.modelo.trim() === "") {
            setTxtValidacion("Ingrese el modelo del instrumento");
            return;
        }
        if (!instrumento.imagen || instrumento.imagen.trim() === "") {
            setTxtValidacion("Ingrese la imagen del instrumento");
            return;
        }
        if (!instrumento.precio || instrumento.precio <= 0) {
            setTxtValidacion("Ingrese un precio válido");
            return;
        }
        if (!instrumento.costoEnvio || instrumento.costoEnvio.trim() === "") {
            setTxtValidacion("Ingrese el costo de envío del instrumento");
            return;
        }
        if (!instrumento.cantidadVendida && instrumento.cantidadVendida < 0) {
            setTxtValidacion("Ingrese una cantidad vendida válida");
            return;
        }
        if (!instrumento.descripcion || instrumento.descripcion.trim() === "") {
            setTxtValidacion("Ingrese la descripción del instrumento");
            return;
        }
        if (!instrumento.categoria || !instrumento.categoria.id) {
            setTxtValidacion("Seleccione una categoría para el instrumento");
            return;
        }

        try {
            if (instrumento && instrumento.instrumento_id) { 
                await actualizarInstrumento(instrumento); 
            } else {
                await crearInstrumento(instrumento); 
            }
            navigate('/grilla');
        } catch (error) {
            console.error("Error al guardar el instrumento:", error);
            setTxtValidacion("Error al guardar el instrumento. Por favor, inténtelo de nuevo más tarde.");
        }
    };


    const eliminarInstrumento = async () => {
        try {
            await borrarInstrumento(instrumento.instrumento_id);
            navigate('/grilla');
        } catch (error) {
            console.error("Error al eliminar el instrumento:", error);
            setTxtValidacion("Error al eliminar el instrumento. Por favor, inténtelo de nuevo más tarde.");
        }
    };

    return (
        <>
                <div className="center">
                    <div className="mb-3">
                        <label htmlFor="txtNombre" className="form-label">Nombre</label>
                        <input type="text" id='txtNombre' className="form-control" placeholder="Ingrese el nombre" value={instrumento.instrumento || ''} onChange={e => setInstrumento({ ...instrumento, instrumento: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtMarca" className="form-label">Marca</label>
                        <input type="text" id='txtMarca' className="form-control" placeholder="Ingrese la marca" value={instrumento.marca || ''} onChange={e => setInstrumento({ ...instrumento, marca: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtModelo" className="form-label">Modelo</label>
                        <input type="text" id='txtModelo' className="form-control" placeholder="Ingrese el modelo" value={instrumento.modelo || ''} onChange={e => setInstrumento({ ...instrumento, modelo: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtPrecio" className="form-label">Precio</label>
                        <input type="number" id='txtPrecio' className="form-control" placeholder="Ingrese el precio" value={instrumento.precio || 0} onChange={e => setInstrumento({ ...instrumento, precio: parseFloat(e.target.value) })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtImagen" className="form-label">Imagen</label>
                        <input type="text" id='txtImagen' className="form-control" placeholder="Ingrese la URL de la imagen" value={instrumento.imagen || ''} onChange={e => setInstrumento({ ...instrumento, imagen: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtCostoEnvio" className="form-label">Costo de Envío</label>
                        <input type="text" id='txtCostoEnvio' className="form-control" placeholder="Ingrese el costo de envío" value={instrumento.costoEnvio || ''} onChange={e => setInstrumento({ ...instrumento, costoEnvio: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtCantidadVendida" className="form-label">Cantidad Vendida</label>
                        <input type="number" id='txtCantidadVendida' className="form-control" placeholder="Ingrese la cantidad vendida" value={instrumento.cantidadVendida || 0} onChange={e => setInstrumento({ ...instrumento, cantidadVendida: parseFloat(e.target.value) })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtDescripcion" className="form-label">Descripción</label>
                        <textarea id='txtDescripcion' className="form-control" placeholder="Ingrese la descripción" value={instrumento.descripcion || ''} onChange={e => setInstrumento({ ...instrumento, descripcion: e.target.value })}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cmbCategoria" className="form-label">Categoría</label>
                        <select id="cmbCategoria" className="form-select" value={instrumento.categoria ? instrumento.categoria.id : ''} onChange={e => setInstrumento({ ...instrumento, categoria: { id: parseInt(e.target.value), denominacion: "" } })}>
                            <option value="">Seleccione una categoría</option>
                            {categorias.map(categoria => (
                                <option key={categoria.id} value={categoria.id}>{categoria.denominacion}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <p style={{ color: 'red', lineHeight: 5, padding: 5 }}>{txtValidacion}</p>
                    </div>
                    <div className="col">
                        <button onClick={guardarInstrumento} className="btn btn-success" type="button">
                            Guardar
                        </button>
                        <button onClick={eliminarInstrumento} className="btn btn-danger" type="button">
                            Eliminar
                        </button>
                        <a href={`/grilla`} style={{ marginLeft: 25 }}>
                            <button type="button" className="btn btn-warning">Volver</button>
                        </a>
                    </div>
                </div>
            
        </>
    );   
}

export default InstrumentoFormulario;


