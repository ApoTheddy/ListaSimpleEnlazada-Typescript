import { TNodo } from "./TiposUnicos";

export default class Nodo<T> {
  public siguiente: TNodo<T>;

  public dato: T;

  constructor(dato: T, siguiente?: TNodo<T>) {
    this.dato = dato;
    this.siguiente = siguiente == undefined ? null : siguiente;
  }
}
