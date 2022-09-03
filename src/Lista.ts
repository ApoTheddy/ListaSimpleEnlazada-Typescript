import Nodo from "./Nodo";
import { TNodo } from "./TiposUnicos";

export default class Lista<T> {
  private inicio: TNodo<T>;
  private fin: TNodo<T>;
  private totalNodos: number;

  constructor() {
    this.totalNodos = 0;
    this.inicio = null;
    this.fin = null;
  }

  // Metodo para verificar si nuestra lista se encuentra vacia
  public estaVacia(): boolean {
    return this.inicio == null;
  }

  // Metodo para agregar un nodo al inicio de la lista
  public agregarAlInicio(dato: T): void {
    this.inicio = new Nodo(dato, this.inicio);
    if (this.fin == null) this.fin = this.inicio;
    ++this.totalNodos;
  }

  // Metodo para agregar un nodo al final de la lista
  public agregarAlFinal(dato: T): void {
    if (!this.estaVacia()) {
      this.fin!.siguiente = new Nodo(dato);
      this.fin = this.fin!.siguiente;
      ++this.totalNodos;
    } else {
      this.inicio = this.fin = null;
    }
  }

  // Metodo para obtener el primer dato de nuestra lista de nodos
  public obtenerPrimerDato(): T | null {
    let dato: T | null = null;
    if (!this.estaVacia()) dato = this.inicio!.dato;
    return dato;
  }

  // Metodo para obtener el ultimo dato de nuestra lista de nodos
  public obtenerUltimoDato(): T | null {
    let dato: T | null = null;
    if (!this.estaVacia()) dato = this.fin!.dato;
    return dato;
  }

  // Metodo para obtener el ultimo nodo
  public obtenerUltimoNodo(): TNodo<T> {
    return this.fin;
  }

  // Metodo para obtener el primer nodo
  public obtenerPrimerNodo(): TNodo<T> {
    return this.inicio;
  }

  // Metodo para eliminar el nodo del inicio
  public eliminarAlInicio(): void {
    if (!this.estaVacia()) {
      this.inicio = this.inicio!.siguiente;
      --this.totalNodos;
    } else this.inicio = this.fin = null;
  }

  // Metodo para eliminar el nodo del final
  public eliminarAlFinal(): void {
    if (!this.estaVacia()) {
      let recorrer: TNodo<T> | null = this.inicio!.siguiente;
      let aux: TNodo<T> | null = this.inicio;

      while (recorrer!.siguiente != null) {
        recorrer = recorrer!.siguiente;
        aux = aux!.siguiente;
      }

      if (aux != null) {
        this.fin = aux;
        this.fin.siguiente = null;
        --this.totalNodos;
      }
    } else this.inicio = this.fin = null;
  }

  // Metodo para obtener el numero total de nodos de nuestra lista
  public obtenerTotalNodos(): number {
    return this.totalNodos;
  }

  public obtenerDatoEspecifico(posicion: number): T | null {
    let dato: T | null = null;

    if (posicion < this.obtenerTotalNodos()) {
      if (!this.estaVacia()) {
        if (this.inicio == this.fin) {
          dato = this.inicio!.dato;
        } else {
          let recorrer: TNodo<T> | null = this.inicio;
          let index: number = 0;

          while (index < posicion) {
            recorrer = recorrer!.siguiente;
            ++index;
          }
          dato = recorrer!.dato;
        }
      } else this.inicio = this.fin = null;
    }
    return dato;
  }

  // Metodo para eliminar un nodo
  public eliminarNodoPorDato(dato: T): {
    encontrado: boolean;
    valorElimnado: T | number;
  } | null {
    let nodoEliminado: {
      encontrado: boolean;
      valorElimnado: T | number;
    } | null = null;

    if (!this.estaVacia()) {
      if (this.inicio == this.fin) this.inicio = this.fin = null;
      else if (this.inicio!.dato == dato) {
        nodoEliminado = { encontrado: true, valorElimnado: this.inicio!.dato };
        this.inicio = this.inicio!.siguiente;
      } else {
        let recorrer: TNodo<T> | null = this.inicio!.siguiente;
        let aux: TNodo<T> | null = this.inicio;

        while (recorrer != null && recorrer.dato != dato) {
          recorrer = recorrer.siguiente;
          aux = aux!.siguiente;
        }

        if (aux != null) {
          aux.siguiente = recorrer!.siguiente;
          nodoEliminado = { encontrado: true, valorElimnado: recorrer!.dato };
        }
      }
    } else {
      nodoEliminado = { encontrado: false, valorElimnado: -1 };
      this.inicio = this.fin = null;
    }
    return nodoEliminado;
  }

  // Metodo para eliminar un nodo por su posicion
  public eliminarNodoEspecifico(
    posicion: number
  ): { encontrado: boolean; valorEliminado: T | number } | null {
    let mensaje: { encontrado: boolean; valorEliminado: T | number } | null =
      null;

    if (posicion >= this.obtenerTotalNodos()) {
      mensaje = { encontrado: false, valorEliminado: -1 };
    } else {
      if (!this.estaVacia()) {
        if (this.inicio == this.fin) {
          this.inicio = this.fin = null;
          mensaje = { encontrado: true, valorEliminado: this.inicio!.dato };
        } else if (posicion == 0) this.inicio = this.inicio!.siguiente;
        else {
          let recorrer: TNodo<T> | null = this.inicio!.siguiente;
          let aux: TNodo<T> | null = this.inicio;
          let index = 1;

          while (index < posicion) {
            recorrer = recorrer!.siguiente;
            aux = aux!.siguiente;
            ++index;
          }

          if (aux != null) {
            mensaje = { encontrado: true, valorEliminado: recorrer!.dato };
            aux.siguiente = recorrer!.siguiente;
          }
        }
      } else {
        mensaje = { encontrado: false, valorEliminado: -1 };
        this.inicio = this.fin = null;
      }
    }
    return mensaje;
  }

  // Metodo para mostrar los nodos de la lista
  public mostrarLista() {
    if (!this.estaVacia()) {
      let recorrer: TNodo<T> | null = this.inicio;
      let cadena: string = "";
      while (recorrer != null) {
        cadena += `[${recorrer.dato}]->`;
        recorrer = recorrer.siguiente;
      }
      console.log(cadena);
    } else {
      this.inicio = this.fin = null;
      console.log("La lista se encuentra vacia");
    }
  }
}
