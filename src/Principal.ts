import Lista from "./Lista";

class Principal {
  static main(): void {
    let log = console.log;
    let lista: Lista<number> = new Lista();

    lista.agregarAlInicio(1);
    lista.agregarAlInicio(2);
    lista.agregarAlInicio(3);

    // log(lista.eliminarNodoEspecifico(2));
    // log(lista.obtenerDatoEspecifico(0));
    log(lista.eliminarNodoPorDato(3));
    lista.mostrarLista();
  }
}

Principal.main();
