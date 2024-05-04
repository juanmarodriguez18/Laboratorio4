import Instrumento from "./Instrumento";

export default class CategoriaInstrumento {
    id: number = 0;
    denominacion: string = "";
    instrumentos?: Instrumento[] = [];
  }