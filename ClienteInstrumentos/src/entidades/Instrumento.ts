import CategoriaInstrumento from "./CategoriaInstrumento";

export default class Instrumento {
    instrumento_id: number = 0;
    instrumento: string = "";
    marca: string = "";
    modelo: string = "";
    imagen: string = "";
    precio: number = 0;
    costoEnvio: string = "";
    cantidadVendida: number = 0;
    descripcion: string = "";
    categoria?: CategoriaInstrumento;
  }
  